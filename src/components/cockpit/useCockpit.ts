"use client";

import { useSyncExternalStore } from "react";
import { subscribe, getState, deriveAlerts } from "@/lib/store";

export function useCockpit() {
  const state = useSyncExternalStore(subscribe, getState, getState);
  return { state, alerts: deriveAlerts(state) };
}
