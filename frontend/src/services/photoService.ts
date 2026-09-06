const PHOTO_KEY = "milan-profile-photo";

export function getProfilePhoto(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(PHOTO_KEY);
}

export function saveProfilePhoto(dataUrl: string) {
  window.localStorage.setItem(PHOTO_KEY, dataUrl);
}

export function removeProfilePhoto() {
  window.localStorage.removeItem(PHOTO_KEY);
}
