import { ArrowUpRight, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Interests() {
  return (
    <main className="interests-page">
      <section className="discover-top"><div><span className="section-kicker">Your connections</span><h1>Interests.</h1><p>People you've chosen to know a little better.</p></div></section>
      <section className="interest-empty-card">
        <div className="interest-empty-icon"><Heart size={21}/></div>
        <span className="section-kicker">A thoughtful gesture</span>
        <h2>No interests yet.</h2>
        <p>When a profile feels right, send an interest. It's a simple way to say hello without sharing private contact details.</p>
        <Link className="button button-primary" to="/discover">Explore profiles <ArrowUpRight size={15}/></Link>
      </section>
      <section className="interest-tip"><Sparkles size={17}/><div><strong>Take your time</strong><p>The best connections start with curiosity, not a quick decision.</p></div></section>
    </main>
  );
}