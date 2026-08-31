import { $, type QRL, useOnWindow, useStore } from "@builder.io/qwik";

export function useLocalStorage(key: string, initialState: any): [any, QRL<(value: any) => void>]  {
  const store = useStore({ value: initialState });

  useOnWindow('load', $(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        window.localStorage.setItem(key, JSON.stringify(initialState));
      }
      store.value = item ? JSON.parse(item) : initialState;
    } catch (error) {
      console.warn(`Could not read "${key}" from local storage`, error);
      store.value = initialState;
    }
  }));

  /*
   * Keep other tabs in sync. Without this, two open tabs each held their own
   * snapshot and whichever wrote last silently discarded the other's ticks.
   */
  useOnWindow('storage', $((event) => {
    const storageEvent = event as StorageEvent;
    if (storageEvent.key !== key) return;
    try {
      store.value = storageEvent.newValue ? JSON.parse(storageEvent.newValue) : initialState;
    } catch (error) {
      console.warn(`Could not sync "${key}" from another tab`, error);
    }
  }));

  const setValue$ = $((value: any) => {
    try {
      store.value = value;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn(`Could not write "${key}" to local storage`, error);
    }
  });

  return [store, setValue$];
}
