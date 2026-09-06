from fastapi import APIRouter

from app.api.v1.endpoints import health, profiles

api_router = APIRouter()


api_router.include_router(
    profiles.router,
    prefix="/profiles",
    tags=["Profiles"],
)
api_router.include_router(
    health.router,
    prefix="/health",
    tags=["Health"],
)