from fastapi import FastAPI
from app.core.database import DATABASE_URL
from app.api.v1.router import api_router
from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.core.database import check_database_connection
from app.core.database import Base, engine
from app.models.profiles import Profile

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Connecting to database...")

    try:
        check_database_connection()
        print("Database connected successfully")

        Base.metadata.create_all(bind=engine)
        print("Database tables created successfully")

    except Exception as e:
        print(f"Database initialization failed: {e}")
        raise

    yield

    # Runs when application shuts down
    print("Application shutting down...")

app = FastAPI(
    title="Matrimony API",
    version="1.0.0",
    lifespan=lifespan,
)

app.include_router(
    api_router,
    prefix="/api/v1",
)
