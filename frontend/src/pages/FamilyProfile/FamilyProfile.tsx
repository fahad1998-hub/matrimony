import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getFamilyProfile, saveFamilyProfile, type FamilyProfileData } from "../../services/familyProfileService";

const options = {
  familyType: ["Close-knit", "Moderate", "Independent"],
  fatherOccupation: ["Business", "Service", "Professional", "Retired", "Other"],
  motherOccupation: ["Homemaker", "Service", "Business", "Retired", "Other"],
  siblings: ["No siblings", "One sibling", "Two siblings", "Three or more"],
};

export default function FamilyProfile() {
  const navigate = useNavigate();
  const [family, setFamily] = useState<FamilyProfileData>(getFamilyProfile);
  const [saved, setSaved] = useState(false);
  const update = (key: keyof FamilyProfileData, value: string) => setFamily((current) => ({ ...current, [key]: value }));
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    saveFamilyProfile(family);
    setSaved(true);
    window.setTimeout(() => navigate("/profile"), 650);
  };

  return (
    <main className="family-page">
      <header className="subpage-header">
        <Link to="/profile" className="back-link"><ArrowLeft size={15} /> Profile</Link>
        <span className="section-kicker">Family details</span>
      </header>
      <section className="family-intro">
        <span className="section-kicker">A part of your story</span>
        <h1>Help families<br/><em>know you better.</em></h1>
        <p>Family details are an important part of a matrimonial profile. Share only what feels comfortable.</p>
      </section>
      <form className="family-form" onSubmit={submit}>
        <section className="form-panel">
          <div className="panel-heading"><span className="section-kicker">Family</span><span>01</span></div>
          <SelectField label="Family type" value={family.familyType} options={options.familyType} onChange={(value) => update("familyType", value)} />
          <SelectField label="Siblings" value={family.siblings} options={options.siblings} onChange={(value) => update("siblings", value)} />
          <Field label="Hometown"><input value={family.hometown} onChange={(e) => update("hometown", e.target.value)} /></Field>
        </section>
        <section className="form-panel">
          <div className="panel-heading"><span className="section-kicker">Parents</span><span>02</span></div>
          <SelectField label="Father's occupation" value={family.fatherOccupation} options={options.fatherOccupation} onChange={(value) => update("fatherOccupation", value)} />
          <SelectField label="Mother's occupation" value={family.motherOccupation} options={options.motherOccupation} onChange={(value) => update("motherOccupation", value)} />
        </section>
        <section className="form-panel">
          <div className="panel-heading"><span className="section-kicker">Values</span><span>03</span></div>
          <Field label="A few words about your family"><textarea maxLength={220} value={family.familyValues} onChange={(e) => update("familyValues", e.target.value)} /></Field>
          <div className="character-count">{family.familyValues.length}/220</div>
        </section>
        <div className="edit-trust"><ShieldCheck size={16}/><p><strong>Share thoughtfully.</strong> You can change these details anytime, and contact information remains private.</p></div>
        <button className="button button-primary button-full save-profile-button" type="submit">{saved ? <>Saved <Check size={15}/></> : "Save family details"}</button>
      </form>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="field"><span>{label}</span>{children}</label>;
}
function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="field select-field"><span>{label}</span><select value={value} onChange={(e) => onChange(e.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}
