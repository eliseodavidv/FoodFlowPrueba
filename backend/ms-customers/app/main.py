from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models, database
from .routers import customers, reservations
from .populate_customers import populate_if_empty

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="MS Customers & Reservations")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todos los orígenes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    populate_if_empty()

app.include_router(customers.router)
app.include_router(reservations.router)