import type { InputHTMLAttributes } from "react";
interface Props extends InputHTMLAttributes<HTMLInputElement>{label:string;hint?:string}
export default function Input({label,hint,id,...props}:Props){return <div className="field"><label htmlFor={id}>{label}</label><input id={id} {...props}/>{hint&&<span className="field-hint">{hint}</span>}</div>}