import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { FormEvent } from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/common/Logo";
import Input from "../../components/common/Input";

export default function SignUp() {
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <main className="auth-page signup-page">
      <div className="signup-head"><Link className="auth-back" to="/"><ArrowLeft size={15}/> Back</Link><Logo/></div>
      <div className="auth-intro signup-intro-single">
        <span className="section-kicker">Create your profile</span>
        <h1>A thoughtful<br/><em>beginning.</em></h1>
        <p>Start with a few genuine details. You can complete the rest of your matrimonial profile after joining Milan.</p>
      </div>
      <form className="auth-form" onSubmit={submit}>
        <div className="form-row"><Input id="first" label="First name" placeholder="First name"/><Input id="age" label="Age" type="number" placeholder="29" min="18"/></div>
        <div className="field"><label htmlFor="gender">Gender</label><select id="gender" defaultValue=""><option value="" disabled>Select</option><option>Male</option><option>Female</option></select></div>
        <Input id="city" label="Current city" placeholder="Where do you live?"/>
        <Input id="email" label="Email address" type="email" placeholder="you@example.com" autoComplete="email"/>
        <Input id="password" label="Create password" type="password" placeholder="At least 8 characters" hint="Use a mix of letters and numbers." autoComplete="new-password"/>
        <button className="button button-primary button-full" type="submit">Create my profile <ArrowRight size={16}/></button>
      </form>
      <div className="auth-trust"><ShieldCheck size={14}/> Your personal details are protected.</div>
    </main>
  );
}
