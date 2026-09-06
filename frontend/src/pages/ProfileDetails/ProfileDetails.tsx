import { ArrowLeft, Heart, MapPin, ShieldCheck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { profiles } from "../../data/profiles";

export default function ProfileDetails() {
  const { id } = useParams();
  const profile = profiles.find((item) => item.id === Number(id));

  if (!profile) return <main className="empty-page"><span className="section-kicker">Profile</span><h1>Profile not found.</h1><Link className="button button-primary" to="/discover"><ArrowLeft size={15} /> Back to discover</Link></main>;

  return (
    <main className="profile-details-page">
      <Link className="back-link" to="/discover"><ArrowLeft size={15} /> Discover</Link>

      <section className="details-hero">
        <div className={`details-photo photo-${profile.tone}`}><span>{profile.initials}</span><div className="photo-bottomline"><span className="match-badge">{profile.compatibility}% match</span></div></div>
        <div className="details-title"><div className="verified-line">{profile.verified && <><ShieldCheck size={13} /> Verified profile</>}</div><h1>{profile.name}, {profile.age}</h1><p><MapPin size={13} /> {profile.city}</p><span>{profile.profession} · {profile.education}</span></div>
      </section>

      <div className="details-actions"><button className="button button-primary"><Heart size={15} /> Express interest</button><button className="button button-secondary">Shortlist</button></div>

      <section className="detail-section"><span className="section-kicker">About {profile.name}</span><h2>A little more about them.</h2><p className="detail-copy">{profile.about}</p></section>

      <section className="detail-section"><span className="section-kicker">Interests</span><h2>Things they enjoy.</h2><div className="interest-chips">{profile.interests.map((interest) => <span key={interest}>{interest}</span>)}</div></section>

      <section className="detail-note"><ShieldCheck size={17} /><div><strong>Privacy first</strong><p>Contact details stay private. Express interest when you're ready.</p></div></section>
    </main>
  );
}