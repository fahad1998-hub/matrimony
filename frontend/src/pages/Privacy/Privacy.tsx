import { ArrowLeft, Check, Eye, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Privacy() {
  const [profileVisible, setProfileVisible] = useState(true);
  const [showAge, setShowAge] = useState(true);
  const [notifications, setNotifications] = useState(true);
  return <main className="privacy-page">
    <header className="subpage-header"><Link to="/profile" className="back-link"><ArrowLeft size={15}/> Profile</Link><span className="section-kicker">Privacy & visibility</span></header>
    <section className="privacy-intro"><span className="section-kicker">Your comfort comes first</span><h1>Choose what<br/><em>feels right.</em></h1><p>We keep personal contact information private while giving you control over how your profile is presented.</p></section>
    <section className="privacy-status"><div className="privacy-status-icon"><ShieldCheck size={18}/></div><div><span className="section-kicker">Protected</span><strong>Your contact details are hidden.</strong><p>Phone and email are never shown to other members.</p></div></section>
    <section className="privacy-settings">
      <Setting icon={<Eye size={17}/>} title="Profile visibility" description="Let your profile appear in Discover." enabled={profileVisible} onToggle={() => setProfileVisible(!profileVisible)}/>
      <Setting icon={<Check size={17}/>} title="Show age" description="Display your age beside your name." enabled={showAge} onToggle={() => setShowAge(!showAge)}/>
      <Setting icon={<LockKeyhole size={17}/>} title="Interest notifications" description="Receive updates when an interest changes." enabled={notifications} onToggle={() => setNotifications(!notifications)}/>
    </section>
    <div className="privacy-footer-note"><LockKeyhole size={15}/><p>You can change these choices anytime. Milan will always keep private contact information protected.</p></div>
  </main>;
}
function Setting({ icon, title, description, enabled, onToggle }: { icon: React.ReactNode; title: string; description: string; enabled: boolean; onToggle: () => void }) { return <div className="privacy-setting"><span className="setting-icon">{icon}</span><div><strong>{title}</strong><p>{description}</p></div><button type="button" className={`toggle ${enabled ? "on" : ""}`} onClick={onToggle} aria-label={`${title}: ${enabled ? "on" : "off"}`}><span/></button></div>; }
