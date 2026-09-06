export type ProfileTone = "warm" | "soft" | "sand";

export interface Profile {
  id: number;
  initials: string;
  name: string;
  age: number;
  city: string;
  profession: string;
  education: string;
  compatibility: number;
  tone: ProfileTone;
  about: string;
  interests: string[];
  verified: boolean;
}