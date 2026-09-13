import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "promaintenance-moodboard-pins-v1";
const LEGACY_STORAGE_KEY = "casaco-moodboard-pins-v1";

function readFromStorage() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    }
    // One-time migration from the older, misnamed storage key.
    const legacyRaw = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyRaw) {
      const parsed = JSON.parse(legacyRaw);
      return Array.isArray(parsed) ? parsed : [];
    }
    return [];
  } catch {
    return [];
  }
}

export function useMoodboard() {
  const [pinnedIds, setPinnedIds] = useState(() => readFromStorage());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pinnedIds));
    } catch {
      /* storage disabled — ignore */
    }
  }, [pinnedIds]);

  const isPinned = useCallback((id) => pinnedIds.includes(id), [pinnedIds]);

  const togglePin = useCallback((id) => {
    setPinnedIds((curr) =>
      curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id],
    );
  }, []);

  const clearAll = useCallback(() => setPinnedIds([]), []);

  return { pinnedIds, isPinned, togglePin, clearAll };
}
