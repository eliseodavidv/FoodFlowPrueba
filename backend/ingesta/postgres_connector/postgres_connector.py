import os
import psycopg2
import pandas as pd
from datetime import datetime
from psycopg2 import OperationalError
from merge_s3 import merge_with_s3

def get_last_pull():
    last_pull = os.getenv("LAST_PULL")
    return datetime.fromisoformat(last_pull) if last_pull else datetime.min

def connect_postgres():
    try:
        conn = psycopg2.connect(
            host=os.getenv("PG_HOST"),
            port=os.getenv("PG_PORT"),
            user=os.getenv("PG_USER"),
            password=os.getenv("PG_PASSWORD"),
            database=os.getenv("PG_DB")
        )
        return conn
    except Exception as e:
        print("Error de conexión PostgreSQL:", e)
        return None


def export_all_tables():
    conn = connect_postgres()
    if not conn:
        return

    last_pull = get_last_pull()
    tables = []

    try:
        query = f"SELECT * FROM reservation WHERE updated_at > %s;"
        df = pd.read_sql(query, conn, params=[last_pull])
        if not df.empty:
            filename = f"postgres_reservation_{datetime.now().isoformat()}.csv"
            tables.append((filename, 'S3_KEY_POSTGRES_RESERVATION'))
            df.to_csv(filename, index=False)
            print(f"Tabla reservation exportada a {filename} ({len(df)} registros)")
        else:
            print(f"Tabla reservation no tiene registros nuevos.")
    except Exception as e:
        print(f"Error exportando tabla reservation: {e}")

    try:
        query = f"SELECT * FROM customer WHERE updated_at > %s;"
        df = pd.read_sql(query, conn, params=[last_pull])
        if not df.empty:
            filename = f"postgres_customer_{datetime.now().isoformat()}.csv"
            tables.append((filename, 'S3_KEY_POSTGRES_CUSTOMER'))
            df.to_csv(filename, index=False)
            print(f"Tabla customer exportada a {filename} ({len(df)} registros)")
        else:
            print(f"Tabla customer no tiene registros nuevos.")
    except Exception as e:
        print(f"Error exportando tabla customer: {e}")
    
    conn.close()
    print("Conexión PostgreSQL cerrada")

    return tables


if __name__ == "__main__":
    csv_paths = export_all_tables()  # modifica export_new_rows para que devuelva el path del CSV generado
    for csv_path in csv_paths:
        merge_with_s3(csv_path[0], os.getenv(csv_path[1]))

