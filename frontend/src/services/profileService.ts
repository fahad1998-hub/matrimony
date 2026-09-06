import { profiles } from "../data/profiles";
import type { Profile } from "../types/profile";

export async function getProfiles(): Promise<Profile[]> {
  return profiles;
}

export async function getProfileById(id: number): Promise<Profile | undefined> {
  return profiles.find((profile) => profile.id === id);
}