from sqlalchemy.orm import Session

from app.models.profiles import Profile
from app.schemas.profiles import ProfileCreate


def create_profile(
    db: Session,
    profile_data: ProfileCreate,
) -> Profile:

    profile = Profile(
        **profile_data.model_dump()
    )

    db.add(profile)
    db.commit()
    db.refresh(profile)

    return profile


def get_profiles(
    db: Session,
) -> list[Profile]:
    return db.query(Profile).all()

