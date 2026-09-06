import { ArrowLeft, Check, ChevronDown, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserProfile, saveUserProfile, type UserProfileData } from "../../services/userProfileService";

const options = {
  education: ["B.Tech", "M.Tech", "MBA", "CA", "M.A.", "Graduate"],
  profession: ["Software Engineer", "Product Manager", "Consultant", "Business Owner", "Marketing Manager", "Other"],
};

export default function EditProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfileData>(getUserProfile);
  const [saved, setSaved] = useState(false);

  const update = (key: keyof UserProfileData, value: string | number) => setProfile((current) => ({ ...current, [key]: value }));
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    saveUserProfile(profile);
    setSaved(true);
    window.setTimeout(() => navigate("/profile"), 650);
  };

  return (
    <main className="edit-profile-page">
      <header className="subpage-header">
        <Link to="/profile" className="back-link"><ArrowLeft size={15} /> Profile</Link>
        <span className="section-kicker">Edit profile</span>
      </header>
      <section className="edit-intro">
        <span className="section-kicker">A little more about you</span>
        <h1>Let your profile<br/><em>speak for you.</em></h1>
        <p>Keep your details genuine and simple. You can update them anytime.</p>
      </section>
      <form className="edit-form" onSubmit={submit}>
        <section className="form-panel">
          <div className="panel-heading"><span className="section-kicker">Basics</span><span>01</span></div>
          <div className="form-row">
            <Field label="Your name"><input value={profile.name} onChange={(e) => update("name", e.target.value)} /></Field>
            <Field label="Age"><input type="number" min="18" max="100" value={profile.age} onChange={(e) => update("age", Number(e.target.value))} /></Field>
          </div>
          <Field label="City"><input value={profile.city} onChange={(e) => update("city", e.target.value)} /></Field>
        </section>
        <section className="form-panel">
          <div className="panel-heading"><span className="section-kicker">Work & education</span><span>02</span></div>
          <SelectField label="Education" value={profile.education} options={options.education} onChange={(value) => update("education", value)} />
          <SelectField label="Profession" value={profile.profession} options={options.profession} onChange={(value) => update("profession", value)} />
        </section>
        <section className="form-panel">
          <div className="panel-heading"><span className="section-kicker">About you</span><span>03</span></div>
          <Field label="A short introduction"><textarea maxLength={260} value={profile.about} onChange={(e) => update("about", e.target.value)} /></Field>
          <div className="character-count">{profile.about.length}/260</div>
        </section>
        <div className="edit-trust"><ShieldCheck size={16}/><p><strong>Your contact details stay private.</strong> Only the information you choose to share appears on your profile.</p></div>
        <button className="button button-primary button-full save-profile-button" type="submit">{saved ? <>Saved <Check size={15}/></> : "Save changes"}</button>
      </form>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="field"><span>{label}</span>{children}</label>;
}
function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="field select-field"><span>{label}</span><select value={value} onChange={(e) => onChange(e.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={14}/></label>;
}
