# 🍴 FoodFlow - Sistema de Gestión de Restaurante

## 📌 Resumen del Proyecto

**FoodFlow** es un MVP (Minimum Viable Product) que busca modernizar la operación de un restaurante mediante una arquitectura distribuida basada en **microservicios en la nube**.  
Este sistema permitirá gestionar clientes, pedidos, reservas y menú, además de contar con un módulo de analítica para apoyar la toma de decisiones.

---

## 🎯 Objetivos

- Desarrollar una arquitectura **escalable** basada en microservicios  
- Implementar procesos de **ingesta y análisis de datos** en la nube  
- Construir una **aplicación web interactiva** que consuma todos los servicios  
- Desplegar la infraestructura con **Docker, Load Balancer y CI/CD**  

---

## ✅ Checklist de Cumplimiento

### 🔹 Backend
- [ ] 5 microservicios dockerizados  
- [ ] 3 MS con DB (3 lenguajes, 2 SQL + 1 NoSQL)  
- [ ] 1 MS sin DB que consuma otros (agregador)  
- [ ] 1 MS analítico (mock local + consultas en la nube)  

### 🔹 Frontend
- [ ] Consume los 5 MS  
- [ ] Al menos 2 endpoints por cada MS  

### 🔹 Data Science / Ingesta
- [ ] 3 contenedores de ingesta de datos → bucket de almacenamiento  
- [ ] Catálogo de datos documentado (Glue o similar)  
- [ ] ≥4 consultas SQL + ≥2 vistas analíticas  

### 🔹 Infraestructura
- [ ] Documentación de APIs con Swagger/OpenAPI  
- [ ] Orquestación con Docker Compose  
- [ ] Load Balancer configurado  
- [ ] Evidencia para informe y demo  

---

## 👥 Roles del Equipo

- **Backend Dev 1** – *ms-customers* y *ms-history*  
- **Backend Dev 2** – *ms-orders* y *ms-menu*  
- **Data & Analytics** – Ingesta de datos y *ms-analytics*  
- **Frontend Dev** – Desarrollo del portal web  
- **DevOps** – Infraestructura, CI/CD y despliegue  

---

## 🏗️ Arquitectura de Microservicios

### Backend
1. **ms-customers** – Clientes y reservas (SQL)  
2. **ms-orders** – Pedidos y facturas (SQL)  
3. **ms-menu** – Menú digital (NoSQL, platos, precios, categorías)  
4. **ms-history** – Historial de consumo (agregador sin BD)  
5. **ms-analytics** – Servicio de reportes y estadísticas  

### Base de Datos
- **SQL 1**: Clientes + Reservas  
- **SQL 2**: Pedidos + Facturas  
- **NoSQL**: Menú (colecciones JSON)  

---

## 🌐 Frontend

- **FoodFlow WebApp**: SPA que ofrece:  
  - Reservar mesa  
  - Explorar menú interactivo  
  - Hacer pedidos en línea  
  - Consultar facturas  
  - Visualizar estadísticas del restaurante  

---

## 📊 Data Ingestion & Analytics

- **Contenedores de ingesta**: Exportan datos desde los 3 microservicios con BD hacia un bucket en la nube  
- **Catálogo de datos**: Creado en AWS Glue (o equivalente)  
- **Consultas en Athena**: Reportes de ventas, platos más pedidos, clientes frecuentes  

---

## ⚙️ Ejecución Local

### Prerequisitos
- Docker & Docker Compose  
- Git  

### Pasos
```bash
# 1. Configurar variables de entorno
cp infra/.env.example infra/.env
# Editar .env con credenciales locales

# 2. Construir y levantar servicios
cd infra
docker compose up -d --build
```

---

## 🌍 Endpoints Locales

- **ms-customers** → http://localhost:8001/docs  
- **ms-orders** → http://localhost:8002/docs  
- **ms-menu** → http://localhost:8003/docs  
- **ms-history** → http://localhost:8004/docs  
- **ms-analytics** → http://localhost:8010/docs  

- **Load Balancer** → http://localhost:8088/  
- **Frontend** → puerto según framework elegido (ej. 5173)  

---

## 📂 Estructura del Proyecto

foodflow/
├── README.md
├── docs/
│ ├── arquitectura.drawio
│ ├── er-diagrams/
│ │ ├── customers_reservations.er.md
│ │ └── orders_invoices.er.md
│ └── analytics/
│ ├── catalog_design.md
│ └── queries_and_views.sql
├── infra/
│ ├── docker-compose.yml
│ ├── .env.example
│ └── lb/default.conf
├── frontend/
│ └── web-portal/
├── backend/
│ ├── ms-customers/
│ ├── ms-orders/
│ ├── ms-menu/
│ ├── ms-history/
│ └── ms-analytics/
├── data-ingestion/
│ ├── ingest_sql_db1/
│ ├── ingest_sql_db2/
│ └── ingest_nosql/
└── .github/
├── workflows/
├── PULL_REQUEST_TEMPLATE.md
└── ISSUE_TEMPLATE/

---

## 🚦 Definition of Done

- **Microservicios**: OpenAPI + endpoints activos + BD con seed  
- **Frontend**: Consume ≥2 endpoints por MS  
- **Ingesta**: Scripts ejecutables, data en bucket y logging  
- **Analítica**: Consultas + vistas en SQL documentadas  
- **CI/CD**: Linting + build + tests básicos  

---

## 🛠️ Tecnologías Propuestas

### Backend
- **Lenguajes**: Node.js, Python, Java  
- **Frameworks**: Express, FastAPI, Spring Boot  
- **Bases de Datos**: MySQL, PostgreSQL, MongoDB  

### Frontend
- **Framework**: React o Vue  
- **Gestión de estado**: Context API / Redux  

### Cloud
- **AWS**: S3, Glue, Athena  
- **Alternativas**: GCP BigQuery o Azure Synapse  

---

## 📄 Licencia

[Especificar licencia aquí]  
