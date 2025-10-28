from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from app.athena_client import AthenaClient
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API Consultas Analíticas")

# --- Configuración CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # o pon tu dominio específico: ["http://52.73.193.181"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

AWS_REGION = os.getenv("AWS_REGION", "us-east-1")
S3_OUTPUT = os.getenv("S3_OUTPUT", "s3://bucket-foodflow-2/athena-results/")
DEFAULT_DB = os.getenv("ATHENA_DEFAULT_DB", "foodflowdb")
WORKGROUP = os.getenv("ATHENA_WORKGROUP")

athena = AthenaClient(region_name=AWS_REGION, output_location=S3_OUTPUT, workgroup=WORKGROUP)

class QueryRequest(BaseModel):
    sql: str
    database: Optional[str] = None
    async_query: Optional[bool] = False

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/analytics/query")
def run_query(q: QueryRequest):
    db = q.database or DEFAULT_DB
    try:
        execution_id = athena.start_query(q.sql, database=db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    if q.async_query:
        return {"execution_id": execution_id}

    status = athena.wait_query(execution_id, timeout_seconds=60)
    if status != "SUCCEEDED":
        raise HTTPException(status_code=500, detail=f"Query status: {status}")
    rows = athena.get_results(execution_id)
    return {"execution_id": execution_id, "rows": rows}

@app.get("/analytics/query/{execution_id}")
def get_query_status(execution_id: str):
    status = athena.get_status(execution_id)
    if status == "SUCCEEDED":
        rows = athena.get_results(execution_id)
        return {"execution_id": execution_id, "status": status, "rows": rows}
    return {"execution_id": execution_id, "status": status}
