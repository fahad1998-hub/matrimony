from fastapi import FastAPI
from datetime import datetime
from fastapi.responses import FileResponse
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI()


@app.get("/health", response_class=FileResponse)
async def health():
    try:
        return FileResponse(BASE_DIR / "templates" / "server_status.html")
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}

@app.get("/")
def root():
    return {"message": "Matrimony API is running", "status": "success", "version": "1.0.0", "statusCode": 200}



