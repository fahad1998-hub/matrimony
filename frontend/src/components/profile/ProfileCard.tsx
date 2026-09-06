import { ArrowUpRight, Heart, MapPin, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import type { Profile } from "../../types/profile";

interface Props {
  profile: Profile;
}

export default function ProfileCard({ profile }: Props) {
  return (
    <article className="profile-card">
      <div className={`profile-card-photo photo-${profile.tone}`}>
        <span className="photo-initials">{profile.initials}</span>
        <div className="photo-topline">
          {profile.verified ? (
            <span className="verified-tag"><ShieldCheck size={11} /> Verified</span>
          ) : <span />}
          <button className="heart-button" type="button" aria-label={`Shortlist ${profile.name}`}>
            <Heart size={18} />
          </button>
        </div>
        <div className="photo-bottomline">
          <span className="match-badge">{profile.compatibility}% match</span>
        </div>
      </div>

      <div className="profile-card-body">
        <div>
          <h3>{profile.name}, {profile.age}</h3>
          <p className="profile-location"><MapPin size={12} /> {profile.city}</p>
          <p className="profile-work">{profile.profession} · {profile.education}</p>
        </div>
        <Link className="card-arrow" to={`/profile/${profile.id}`} aria-label={`View ${profile.name}`}>
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}