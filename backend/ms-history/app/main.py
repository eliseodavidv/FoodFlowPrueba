from fastapi import FastAPI, HTTPException
import httpx, os

app = FastAPI(title="MS History")

CUSTOMERS_URL = os.getenv("CUSTOMERS_URL", "http://ms-customers:8001/customers")
RESERVATIONS_URL = os.getenv("RESERVATIONS_URL", "http://ms-customers:8001/reservations")
ORDERS_URL = os.getenv("ORDERS_URL", None)
MENU_URL = os.getenv("MENU_URL", None)


@app.get("/history/{customer_id}")
async def get_customer_history(customer_id: int):
    async with httpx.AsyncClient() as client:
        try:
            customer_resp = await client.get(f"{CUSTOMERS_URL}/{customer_id}")
            if customer_resp.status_code != 200:
                raise HTTPException(status_code=customer_resp.status_code, detail="Customer not found")
            customer_data = customer_resp.json()

            reservations_data = []
            try:
                res_resp = await client.get(f"{RESERVATIONS_URL}")
                if res_resp.status_code == 200:
                    all_reservations = res_resp.json()
                    reservations_data = [r for r in all_reservations if r["customer_id"] == customer_id]
            except:
                pass

            orders_data = []
            if ORDERS_URL:
                try:
                    orders_resp = await client.get(f"{ORDERS_URL}?customer_id={customer_id}")
                    if orders_resp.status_code == 200:
                        orders_data = orders_resp.json()
                except:
                    pass

            menu_data = []
            if MENU_URL:
                try:
                    menu_resp = await client.get(MENU_URL)
                    if menu_resp.status_code == 200:
                        menu_data = menu_resp.json()
                except:
                    pass

            return {
                "customer": customer_data,
                "reservations": reservations_data,
                "orders": orders_data,
                "menu": menu_data
            }

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching history: {str(e)}")
