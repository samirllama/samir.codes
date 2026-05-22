"use client"

import { trackCustomEvent } from "./use-analytics"
import type { UIClickProperties } from "../types/analytics"

export function useClickTracking() {
  const trackClick = (
    elementType: string,
    elementText: string,
    location: string,
    additionalData?: Record<string, unknown>
  ) => {
    try {
      const properties: UIClickProperties = {
        elementType,
        elementText: elementText.substring(0, 100),
        location,
        additionalData,
      }

      // Track using a clean UI Click event structure and merge additionalData instead of discarding it
      trackCustomEvent("UI Click", properties)
    } catch (err) {
      console.error("Failed to track UI click event gracefully:", err)
    }
  }

  return { trackClick }
}
