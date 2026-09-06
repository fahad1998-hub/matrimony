from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.database import get_db

router = APIRouter()




@router.get("/db")
def database_health_check(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))

        return {
            "status": "ok",
            "service": "postgresql",
            "database": "connected",
        }

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={
                "status": "error",
                "service": "postgresql",
                "database": "unavailable",
            },
        )