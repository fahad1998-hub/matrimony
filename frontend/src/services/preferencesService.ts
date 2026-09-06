export interface PartnerPreferences {
  ageRange: string;
  cities: string;
  education: string;
  profession: string;
  lifestyle: string;
}

const STORAGE_KEY = "milan-partner-preferences";

export const defaultPreferences: PartnerPreferences = {
  ageRange: "25–30",
  cities: "Delhi NCR, Lucknow",
  education: "Graduate or above",
  profession: "Open to all",
  lifestyle: "Family-oriented",
};

export function getPreferences(): PartnerPreferences {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
  } catch {
    return defaultPreferences;
  }
}

export function savePreferences(preferences: PartnerPreferences) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
}
