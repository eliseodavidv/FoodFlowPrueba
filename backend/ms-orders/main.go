// @title Orders API
// @version 1.0
// @description Documentación Swagger para ms-orders
// @host localhost:8002
// @BasePath /

package main

import (
    "log"
    "os"

    "ms-orders/database"
    "ms-orders/handlers"
    _ "ms-orders/docs"    
    "github.com/gin-gonic/gin"
    "github.com/swaggo/gin-swagger"
    "github.com/swaggo/files"
)   

func main() {
    database.Connect()

    r := gin.Default()
    r.Use(handlers.CorsMiddleware()
    r.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
    r.POST("/pedidos", handlers.CrearPedido)
    r.GET("/pedidos", handlers.ListarPedidos)
    r.GET("/pedidos/customers/:id", handlers.ListarPedidosPorCustomer)
    
    port := os.Getenv("PORT")
    if port == "" {
        port = "8002"
    }
    log.Fatal(r.Run(":" + port))
}
