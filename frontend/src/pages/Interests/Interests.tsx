import { ArrowUpRight, Check, Heart, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { profiles } from "../../data/profiles";
import { getReceivedInterests, getSentInterests, getShortlistedProfiles } from "../../services/connectionService";
import { useState } from "react";

export default function Interests() {
  const [tab, setTab] = useState<"received" | "sent" | "shortlisted">("received");
  const received = getReceivedInterests().map((id) => profiles.find((p) => p.id === id)).filter(Boolean);
  const sent = getSentInterests().map((item) => profiles.find((p) => p.id === item.profileId)).filter(Boolean);
  const shortlisted = getShortlistedProfiles().map((item) => profiles.find((p) => p.id === item.profileId)).filter(Boolean);
  const active = tab === "received" ? received : tab === "sent" ? sent : shortlisted;

  return <main className="interests-page">
    <section className="discover-top"><div><span className="section-kicker">Your connections</span><h1>Interests.</h1><p>A quieter way to explore a promising connection.</p></div></section>
    <div className="connection-tabs">
      <button className={tab === "received" ? "active" : ""} onClick={() => setTab("received")} type="button">Received <span>{received.length}</span></button>
      <button className={tab === "sent" ? "active" : ""} onClick={() => setTab("sent")} type="button">Sent <span>{sent.length}</span></button>
      <button className={tab === "shortlisted" ? "active" : ""} onClick={() => setTab("shortlisted")} type="button">Saved <span>{shortlisted.length}</span></button>
    </div>

    {active.length ? <section className="connection-list">{active.map((profile) => profile && <article className="connection-card" key={profile.id}>
      <div className={`connection-avatar photo-${profile.tone}`}><span>{profile.initials}</span>{profile.verified && <Check size={12}/>}</div>
      <div className="connection-copy"><span className="section-kicker">{tab === "received" ? "Would like to know you" : tab === "sent" ? "Interest sent" : "Shortlisted"}</span><h2>{profile.name}, {profile.age}</h2><p>{profile.city} · {profile.profession}</p><span>{profile.compatibility}% compatibility</span></div>
      <Link to={`/profile/${profile.id}`} className="connection-arrow" aria-label={`View ${profile.name}`}><ArrowUpRight size={17}/></Link>
    </article>)}</section> : <section className="interest-empty-card compact-empty">
      <div className="interest-empty-icon">{tab === "shortlisted" ? <Star size={21}/> : <Heart size={21}/>}</div>
      <span className="section-kicker">{tab === "received" ? "A thoughtful gesture" : tab === "sent" ? "Your first step" : "Keep a few close"}</span>
      <h2>{tab === "received" ? "No new interests." : tab === "sent" ? "Nothing sent yet." : "No saved profiles yet."}</h2>
      <p>{tab === "received" ? "When someone expresses interest, you'll see it here." : tab === "sent" ? "When a profile feels right, send an interest from their profile." : "Save profiles you would like to revisit later."}</p>
      <Link className="button button-primary" to="/discover">Explore profiles <ArrowUpRight size={15}/></Link>
    </section>}

    <section className="interest-tip"><Sparkles size={17}/><div><strong>Take your time</strong><p>A meaningful connection starts with a little curiosity, not a quick decision.</p></div></section>
  </main>;
}
