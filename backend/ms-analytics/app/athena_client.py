import boto3
import time

class AthenaClient:
    def __init__(self, region_name, output_location, workgroup=None):
        self.client = boto3.client("athena", region_name=region_name)
        self.output_location = output_location
        self.workgroup = workgroup

    def start_query(self, sql, database=None):
        params = {
            "QueryString": sql,
            "ResultConfiguration": {"OutputLocation": self.output_location}
        }
        if database:
            params["QueryExecutionContext"] = {"Database": database}
        if self.workgroup:
            params["WorkGroup"] = self.workgroup

        resp = self.client.start_query_execution(**params)
        return resp["QueryExecutionId"]

    def get_status(self, execution_id):
        resp = self.client.get_query_execution(QueryExecutionId=execution_id)
        return resp["QueryExecution"]["Status"]["State"]

    def wait_query(self, execution_id, timeout_seconds=300, poll_interval=2):
        waited = 0
        while True:
            status = self.get_status(execution_id)
            if status in ("SUCCEEDED", "FAILED", "CANCELLED"):
                return status
            time.sleep(poll_interval)
            waited += poll_interval
            if waited >= timeout_seconds:
                return "TIMEOUT"

    def get_results(self, execution_id, max_results=1000):
        paginator = self.client.get_paginator('get_query_results')
        rows_out = []
        for page in paginator.paginate(QueryExecutionId=execution_id, PaginationConfig={'PageSize': 1000}):
            rows = page.get("ResultSet", {}).get("Rows", [])
            for r in rows:
                values = [c.get("VarCharValue", None) for c in r.get("Data", [])]
                rows_out.append(values)
        return rows_out
