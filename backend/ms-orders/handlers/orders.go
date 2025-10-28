package handlers

import (
    "encoding/json"
    "net/http"
    "fmt"
    "ms-orders/database"
    "ms-orders/models"
    "ms-orders/utils"

    "github.com/gin-gonic/gin"
)

// CrearPedido godoc
// @Summary Crea un nuevo pedido
// @Description Crea un pedido con los datos enviados
// @Tags pedidos
// @Accept json
// @Produce json
// @Param pedido body models.Pedido true "Datos del pedido"
// @Success 201 {object} models.Pedido
// @Failure 400 {object} models.ErrorResponse
// @Router /pedidos [post]
func CrearPedido(c *gin.Context) {
    var input struct {
        ClienteID int                 `json:"cliente_id"`
        Fecha     string              `json:"fecha"`
        Platos    []models.ItemPedido `json:"platos"`
        Notas     string              `json:"notas"` // opcional
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        fmt.Println("❌ Error en JSON:", err)
        c.JSON(http.StatusBadRequest, gin.H{"error": "Formato inválido"})
        return
    }

    if !utils.ValidateCliente(input.ClienteID) {
        fmt.Println("❌ Cliente no válido:", input.ClienteID)
        c.JSON(http.StatusBadRequest, gin.H{"error": "Cliente no válido"})
        return
    }

    precios, err := utils.ObtenerPreciosMenu()
    if err != nil {
        fmt.Println("❌ Error al obtener menú:", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo validar los platos"})
        return
    }

    var total float64
    for i := range input.Platos {
        precio, ok := precios[input.Platos[i].PlatoID]
        if !ok {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Plato no válido: " + input.Platos[i].PlatoID})
            return
        }
        input.Platos[i].Precio = precio
        total += precio * float64(input.Platos[i].Cantidad)
    }

    tx, err := database.DB.Begin()
    if err != nil {
        fmt.Println("❌ Error al iniciar transacción:", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al iniciar transacción"})
        return
    }

    res, err := tx.Exec("INSERT INTO pedidos (cliente_id, fecha, estado, notas) VALUES (?, ?, ?, ?)",
        input.ClienteID, input.Fecha, "pendiente", input.Notas)
    if err != nil {
        fmt.Println("❌ Error al guardar pedido:", err)
        tx.Rollback()
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al guardar pedido"})
        return
    }

    pedidoID, _ := res.LastInsertId()
    fmt.Println("✅ Pedido creado con ID:", pedidoID)

    for _, item := range input.Platos {
        _, err := tx.Exec("INSERT INTO items_pedido (pedido_id, plato_id, cantidad, precio) VALUES (?, ?, ?, ?)",
            pedidoID, item.PlatoID, item.Cantidad, item.Precio)
        if err != nil {
            fmt.Println("❌ Error al guardar ítem:", err)
            tx.Rollback()
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al guardar ítems"})
            return
        }
    }

    tx.Commit()
    c.JSON(http.StatusCreated, gin.H{
        "pedido_id": pedidoID,
        "total":     total,
    })
}

// ListarPedidos godoc
// @Summary Lista todos los pedidos
// @Description Devuelve todos los pedidos registrados con sus ítems
// @Tags pedidos
// @Produce json
// @Success 200 {array} models.Pedido
// @Failure 500 {object} map[string]string
// @Router /pedidos [get]
func ListarPedidos(c *gin.Context) {
    resp, err := http.Get("http://ms-menu:8003/api/v1/menu")
    if err != nil {
        fmt.Println("❌ Error consultando ms-menu:", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo obtener el menú"})
        return
    }
    defer resp.Body.Close()

    var menuResp struct {
        Success bool `json:"success"`
        Data    []struct {
            ID     string `json:"_id"`
            Nombre string `json:"nombre"`
        } `json:"data"`
    }

    if err := json.NewDecoder(resp.Body).Decode(&menuResp); err != nil {
        fmt.Println("❌ Error decodificando menú:", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Menú mal formateado"})
        return
    }

    menuLookup := make(map[string]string)
    for _, plato := range menuResp.Data {
        menuLookup[plato.ID] = plato.Nombre
    }

    rows, err := database.DB.Query("SELECT id, cliente_id, fecha, estado, notas FROM pedidos")
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al consultar pedidos"})
        return
    }
    defer rows.Close()

    var pedidos []models.Pedido

    for rows.Next() {
        var p models.Pedido
        rows.Scan(&p.ID, &p.ClienteID, &p.Fecha, &p.Estado, &p.Notas)

        itemRows, err := database.DB.Query("SELECT id, pedido_id, plato_id, cantidad, precio FROM items_pedido WHERE pedido_id = ?", p.ID)
        if err != nil {
            continue
        }

        var items []models.ItemPedido
        var total float64

        for itemRows.Next() {
            var item models.ItemPedido
            itemRows.Scan(&item.ID, &item.PedidoID, &item.PlatoID, &item.Cantidad, &item.Precio)

            if nombre, ok := menuLookup[item.PlatoID]; ok {
                item.Nombre = nombre
            }

            total += item.Precio * float64(item.Cantidad)
            items = append(items, item)
        }
        itemRows.Close()

        p.Items = items
        p.Total = total
        pedidos = append(pedidos, p)
    }
    
    c.JSON(http.StatusOK, pedidos)
}

// ListarPedidosPorCustomer godoc
// @Summary Lista pedidos por cliente
// @Description Devuelve los pedidos asociados a un cliente específico
// @Tags pedidos
// @Produce json
// @Param id path int true "ID del cliente"
// @Success 200 {array} models.Pedido
// @Failure 500 {object} map[string]string
// @Router /pedidos/customers/{id} [get]
func ListarPedidosPorCustomer(c *gin.Context) {
    customerID := c.Param("id")

    resp, err := http.Get("http://ms-menu:8003/api/v1/menu")
    if err != nil {
        fmt.Println("❌ Error consultando ms-menu:", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo obtener el menú"})
        return
    }
    defer resp.Body.Close()

    var menuResp struct {
        Success bool `json:"success"`
        Data    []struct {
            ID     string `json:"_id"`
            Nombre string `json:"nombre"`
        } `json:"data"`
    }

    if err := json.NewDecoder(resp.Body).Decode(&menuResp); err != nil {
        fmt.Println("❌ Error decodificando menú:", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Menú mal formateado"})
        return
    }

    menuLookup := make(map[string]string)
    for _, plato := range menuResp.Data {
        menuLookup[plato.ID] = plato.Nombre
    } 

    rows, err := database.DB.Query("SELECT id, cliente_id, fecha, estado, notas FROM pedidos WHERE cliente_id = ?", customerID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al consultar pedidos"})
        return
    }
    defer rows.Close()

    var pedidos []models.Pedido

    for rows.Next() {
        var p models.Pedido
        rows.Scan(&p.ID, &p.ClienteID, &p.Fecha, &p.Estado, &p.Notas)

        itemRows, err := database.DB.Query("SELECT id, pedido_id, plato_id, cantidad, precio FROM items_pedido WHERE pedido_id = ?", p.ID)
        if err != nil {
            continue
        }

        var items []models.ItemPedido
        var total float64

        for itemRows.Next() {
            var item models.ItemPedido
            itemRows.Scan(&item.ID, &item.PedidoID, &item.PlatoID, &item.Cantidad, &item.Precio)

            if nombre, ok := menuLookup[item.PlatoID]; ok {
                item.Nombre = nombre
            }
            total += item.Precio * float64(item.Cantidad)
            items = append(items, item)
        }
        itemRows.Close()

        p.Items = items
        p.Total = total
        pedidos = append(pedidos, p)
    }

    c.JSON(http.StatusOK, pedidos)

}
func CorsMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        origin := c.Request.Header.Get("Origin")
        c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
        if origin == "" {
            c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        }
        c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, Origin, User-Agent, Cache-Control, Keep-Alive, X-Requested-With")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH")
        c.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Length, Content-Type")
        c.Writer.Header().Set("Access-Control-Max-Age", "86400")

        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }

        c.Next()
    }
}

