import { ArrowLeft, Check, Heart, SlidersHorizontal } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { defaultPreferences, getPreferences, savePreferences, type PartnerPreferences } from "../../services/preferencesService";

const ageOptions = ["23–27", "25–30", "27–32", "30–35", "Open to all"];
const educationOptions = ["Any education", "Graduate or above", "Postgraduate or above"];
const lifestyleOptions = ["Family-oriented", "Balanced", "Open to all"];

export default function Preferences() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<PartnerPreferences>(getPreferences);
  const [saved, setSaved] = useState(false);
  const set = (key: keyof PartnerPreferences, value: string) => setPreferences((current) => ({ ...current, [key]: value }));
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    savePreferences(preferences);
    setSaved(true);
    window.setTimeout(() => navigate("/profile"), 650);
  };
  const reset = () => setPreferences(defaultPreferences);

  return <main className="preferences-page">
    <header className="subpage-header"><Link to="/profile" className="back-link"><ArrowLeft size={15}/> Profile</Link><span className="section-kicker">Partner preferences</span></header>
    <section className="preferences-intro"><div className="preference-icon"><Heart size={19}/></div><span className="section-kicker">What matters to you</span><h1>Set your<br/><em>preferences.</em></h1><p>These help Milan show you more relevant profiles. They are private and can be changed whenever you like.</p></section>
    <form onSubmit={submit} className="preferences-form">
      <PreferenceGroup label="Preferred age"><div className="choice-grid">{ageOptions.map((option) => <Choice key={option} selected={preferences.ageRange === option} onClick={() => set("ageRange", option)}>{option}</Choice>)}</div></PreferenceGroup>
      <PreferenceGroup label="Preferred cities"><input className="preference-input" value={preferences.cities} onChange={(e) => set("cities", e.target.value)} placeholder="e.g. Delhi NCR, Lucknow"/><small>Separate multiple cities with commas.</small></PreferenceGroup>
      <PreferenceGroup label="Education"><div className="choice-stack">{educationOptions.map((option) => <Choice key={option} selected={preferences.education === option} onClick={() => set("education", option)}>{option}</Choice>)}</div></PreferenceGroup>
      <PreferenceGroup label="Profession"><input className="preference-input" value={preferences.profession} onChange={(e) => set("profession", e.target.value)} /></PreferenceGroup>
      <PreferenceGroup label="Lifestyle"><div className="choice-stack">{lifestyleOptions.map((option) => <Choice key={option} selected={preferences.lifestyle === option} onClick={() => set("lifestyle", option)}>{option}</Choice>)}</div></PreferenceGroup>
      <div className="preference-summary"><SlidersHorizontal size={16}/><div><strong>Used thoughtfully</strong><p>Your preferences shape recommendations; they do not automatically reject anyone.</p></div></div>
      <button className="button button-primary button-full" type="submit">{saved ? <>Preferences saved <Check size={15}/></> : "Save preferences"}</button>
      <button className="plain-button preference-reset" type="button" onClick={reset}>Reset to suggested preferences</button>
    </form>
  </main>;
}
function PreferenceGroup({ label, children }: { label: string; children: React.ReactNode }) { return <section className="preference-group"><label>{label}</label>{children}</section>; }
function Choice({ selected, children, onClick }: { selected: boolean; children: React.ReactNode; onClick: () => void }) { return <button type="button" className={`preference-choice ${selected ? "selected" : ""}`} onClick={onClick}>{children}{selected && <Check size={13}/>}</button>; }
