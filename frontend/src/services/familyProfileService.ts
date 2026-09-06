export interface FamilyProfileData {
  familyType: string;
  fatherOccupation: string;
  motherOccupation: string;
  siblings: string;
  hometown: string;
  familyValues: string;
}

const STORAGE_KEY = "milan-family-profile";

export const defaultFamilyProfile: FamilyProfileData = {
  familyType: "Close-knit",
  fatherOccupation: "Business",
  motherOccupation: "Homemaker",
  siblings: "One sibling",
  hometown: "New Delhi",
  familyValues: "We value respect, education and staying connected with family.",
};

export function getFamilyProfile(): FamilyProfileData {
  if (typeof window === "undefined") return defaultFamilyProfile;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultFamilyProfile, ...JSON.parse(stored) } : defaultFamilyProfile;
  } catch {
    return defaultFamilyProfile;
  }
}

export function saveFamilyProfile(profile: FamilyProfileData) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}
