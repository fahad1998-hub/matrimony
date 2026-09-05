from fastapi import FastAPI
from datetime import datetime

app = FastAPI()


@app.get("/health")
def health():
    try:
        return {"status": "healthy", "time": datetime.now().isoformat()}
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}

@app.get("/")
def root():
    return {"message": "Matrimony API is running", "status": "success", "version": "1.0.0", "statusCode": 200}



