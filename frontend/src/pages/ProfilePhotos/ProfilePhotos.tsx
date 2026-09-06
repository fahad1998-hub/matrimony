import { ArrowLeft, Camera, Check, ImagePlus, ShieldCheck, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { getUserProfile } from "../../services/userProfileService";
import { getProfilePhoto, removeProfilePhoto, saveProfilePhoto } from "../../services/photoService";

export default function ProfilePhotos() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const user = getUserProfile();
  const [photo, setPhoto] = useState<string | null>(getProfilePhoto);
  const [saved, setSaved] = useState(false);
  const choosePhoto = () => inputRef.current?.click();
  const onPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => { const result = typeof reader.result === "string" ? reader.result : null; if (!result) return; saveProfilePhoto(result); setPhoto(result); setSaved(true); window.setTimeout(() => setSaved(false), 1300); };
    reader.readAsDataURL(file);
  };
  const remove = () => { removeProfilePhoto(); setPhoto(null); };
  return <main className="photos-page">
    <header className="subpage-header"><Link to="/profile" className="back-link"><ArrowLeft size={15} /> Profile</Link><span className="section-kicker">Profile photo</span></header>
    <section className="photos-intro"><span className="section-kicker">A warm first impression</span><h1>Let people see<br/><em>the real you.</em></h1><p>A clear, natural photo helps families and individuals feel more comfortable beginning a conversation.</p></section>
    <section className="photo-manager"><div className="photo-preview">{photo ? <img src={photo} alt={`${user.name}'s profile`} /> : <span>{user.name.charAt(0).toUpperCase()}</span>}<button type="button" onClick={choosePhoto} aria-label="Change profile photo"><Camera size={16}/></button></div><div className="photo-copy"><span className="section-kicker">Main profile photo</span><h2>{photo ? "Your photo is ready." : "Add a profile photo."}</h2><p>Use a recent, well-lit photo where your face is clearly visible.</p></div></section>
    <input ref={inputRef} className="visually-hidden" type="file" accept="image/jpeg,image/png,image/webp" onChange={onPhotoChange}/>
    <div className="photo-actions"><button className="button button-primary button-full" type="button" onClick={choosePhoto}>{saved ? <><Check size={15}/> Photo saved</> : <><ImagePlus size={15}/> {photo ? "Choose another photo" : "Add photo"}</>}</button>{photo && <button className="photo-remove" type="button" onClick={remove}><Trash2 size={14}/> Remove photo</button>}</div>
    <section className="photo-guidance"><div className="guidance-row"><ShieldCheck size={17}/><div><strong>Privacy first</strong><p>Your photo is stored locally in this prototype. Photo visibility controls will be connected to the backend in a later phase.</p></div></div><div className="guidance-row"><Camera size={17}/><div><strong>Keep it natural</strong><p>A simple portrait works best. Avoid heavy filters, group photos or photos where your face is difficult to recognise.</p></div></div></section>
    <button className="text-back" type="button" onClick={() => navigate("/profile")}>Back to my profile</button>
  </main>;
}
