import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "casaco-moodboard-pins-v1";

function readFromStorage() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
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
