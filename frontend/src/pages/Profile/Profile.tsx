import { ArrowRight, Camera, ChevronRight, Heart, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../services/userProfileService";
import { getProfilePhoto } from "../../services/photoService";
import { getPreferences } from "../../services/preferencesService";

export default function Profile() {
  const user = getUserProfile();
  const photo = getProfilePhoto();
  const preferences = getPreferences();
  const details = [
    ["Location", user.city],
    ["Education", user.education],
    ["Profession", user.profession],
    ["Looking for", "Marriage"],
  ];
  return (
    <main className="profile-page">
      <section className="profile-heading">
        <div>
          <span className="section-kicker">My profile</span>
          <h1>Make it feel like you.</h1>
        </div>
        <Link className="edit-button" to="/profile/edit">
          Edit
        </Link>
      </section>
      <section className="my-profile-card">
        <div className="my-photo">
          {photo ? <img src={photo} alt={`${user.name} profile`} /> : <span>{user.name.charAt(0).toUpperCase()}</span>}
          <Link to="/profile/photos" aria-label="Manage profile photo">
            <Camera size={16} />
          </Link>
        </div>
        <div className="my-profile-copy">
          <div className="verified-line">
            <ShieldCheck size={13} /> Profile started
          </div>
          <h2>{user.name}</h2>
          <p>{user.city} · {user.age}</p>
        </div>
      </section>
      <section className="profile-completion">
        <div>
          <strong>72%</strong>
          <span>profile complete</span>
        </div>
        <div className="completion-bar">
          <span />
        </div>
        <p>A complete profile gets more thoughtful responses.</p>
      </section>
      <section className="profile-section">
        <div className="section-title-row">
          <div>
            <span className="section-kicker">About you</span>
            <h2>Your details</h2>
          </div>
          <ChevronRight size={16} />
        </div>
        <div className="details-list">
          {details.map(([l, v]) => (
            <div key={l}>
              <span>{l}</span>
              <strong>{v}</strong>
            </div>
          ))}
        </div>
      </section>
      <section className="profile-menu">
        <Link to="/profile/family">
          <span className="menu-icon">⌂</span>
          <div>
            <strong>Family & background</strong>
            <span>Share the details that matter</span>
          </div>
          <ChevronRight size={16} />
        </Link>
        <Link to="/profile/preferences">
          <Heart size={17} />
          <div>
            <strong>Partner preferences</strong>
            <span>{preferences.ageRange} · {preferences.cities}</span>
          </div>
          <ChevronRight size={16} />
        </Link>
        <Link to="/profile/privacy">
          <ShieldCheck size={17} />
          <div>
            <strong>Privacy & visibility</strong>
            <span>Control what others can see</span>
          </div>
          <ChevronRight size={16} />
        </Link>
        <Link to="/sign-in">
          <div className="menu-dot">↗</div>
          <div>
            <strong>Account</strong>
            <span>Sign in and account settings</span>
          </div>
          <ChevronRight size={16} />
        </Link>
      </section>
      <div className="profile-cta">
        <p>Ready to meet someone meaningful?</p>
        <Link to="/discover">
          Explore profiles <ArrowRight size={14} />
        </Link>
      </div>
    </main>
  );
}