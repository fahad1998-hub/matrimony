import { profiles } from "../data/profiles";

export type ConnectionStatus = "interested" | "shortlisted";
export interface ConnectionItem { profileId: number; status: ConnectionStatus; createdAt: string; }

const STORAGE_KEY = "milan-connections";
const SEEDED_RECEIVED_KEY = "milan-received-interests";

function readConnections(): ConnectionItem[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

function writeConnections(items: ConnectionItem[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getConnections(): ConnectionItem[] { return readConnections(); }

export function isConnected(profileId: number, status: ConnectionStatus) {
  return readConnections().some((item) => item.profileId === profileId && item.status === status);
}

export function toggleConnection(profileId: number, status: ConnectionStatus) {
  const current = readConnections();
  const exists = current.some((item) => item.profileId === profileId && item.status === status);
  const next = exists
    ? current.filter((item) => !(item.profileId === profileId && item.status === status))
    : [...current, { profileId, status, createdAt: new Date().toISOString() }];
  writeConnections(next);
  return !exists;
}

export function getSentInterests() {
  return readConnections().filter((item) => item.status === "interested");
}

export function getShortlistedProfiles() {
  return readConnections().filter((item) => item.status === "shortlisted");
}

export function getReceivedInterests(): number[] {
  try {
    const stored = window.localStorage.getItem(SEEDED_RECEIVED_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* use seed */ }
  const seeded = profiles.find((profile) => profile.id === 2)?.id;
  const value = seeded ? [seeded] : [];
  window.localStorage.setItem(SEEDED_RECEIVED_KEY, JSON.stringify(value));
  return value;
}
