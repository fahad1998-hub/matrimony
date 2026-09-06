export interface UserProfileData {
  name: string;
  age: number;
  city: string;
  education: string;
  profession: string;
  about: string;
  phone: string;
}

const STORAGE_KEY = "milan-user-profile";

export const defaultUserProfile: UserProfileData = {
  name: "Fahad",
  age: 29,
  city: "New Delhi",
  education: "B.Tech",
  profession: "Software Engineer",
  about: "I value a calm life, close family bonds and a meaningful career. Looking forward to meeting someone with a similar outlook.",
  phone: "••••••••••",
};

export function getUserProfile(): UserProfileData {
  if (typeof window === "undefined") return defaultUserProfile;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultUserProfile, ...JSON.parse(stored) } : defaultUserProfile;
  } catch {
    return defaultUserProfile;
  }
}

export function saveUserProfile(profile: UserProfileData) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}
