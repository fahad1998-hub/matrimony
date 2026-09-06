from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.profiles import (
    ProfileCreate,
    ProfileResponse,
    ProfileListResponse,
)
from app.services.profiles import create_profile, get_profiles


router = APIRouter(
    prefix="",
    tags=["Profiles"],
)


@router.post(
    "",
    response_model=ProfileResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_new_profile(
    profile_data: ProfileCreate,
    db: Session = Depends(get_db),
):
    return create_profile(
        db,
        profile_data,
    )


@router.get(
    "",
    response_model=ProfileListResponse,
    status_code=status.HTTP_200_OK,
)
def get_all_profiles(
    db: Session = Depends(get_db),
):
    profiles = get_profiles(db)

    return ProfileListResponse(
        data=profiles,
        count=len(profiles),
        status="success",
    )

