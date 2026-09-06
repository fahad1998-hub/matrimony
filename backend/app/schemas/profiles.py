from datetime import date
from uuid import UUID

from pydantic import BaseModel, Field


class ProfileCreate(BaseModel):
    first_name: str = Field(
        min_length=2,
        max_length=100,
    )

    last_name: str | None = Field(
        default=None,
        max_length=100,
    )

    date_of_birth: date

    gender: str = Field(
        min_length=1,
        max_length=20,
    )

    marital_status: str = Field(
        min_length=1,
        max_length=30,
    )

    height: str | None = Field(
        default=None,
        max_length=20,
    )

    religion: str | None = Field(
        default=None,
        max_length=50,
    )

    mother_tongue: str | None = Field(
        default=None,
        max_length=50,
    )

    city: str | None = Field(
        default=None,
        max_length=100,
    )

    state: str | None = Field(
        default=None,
        max_length=100,
    )

    country: str = Field(
        default="India",
        max_length=100,
    )

    about: str | None = None


class ProfileResponse(ProfileCreate):
    id: UUID

    class Config:
        from_attributes = True


class ProfileListResponse(BaseModel):
    data: list[ProfileResponse]
    count: int
    status: str

