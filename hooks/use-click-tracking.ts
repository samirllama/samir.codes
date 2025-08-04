"use client"

import { trackLinkClick } from "./use-analytics"

export function useClickTracking() {
    const trackClick = (
        elementType: string,
        elementText: string,
        location: string,
        additionalData?: Record<string, unknown>,
    ) => {
        trackLinkClick(`#${elementType}`, elementText, location)

        // We can track additional custom events
        if (additionalData) {
            console.log("Additional tracking data:", additionalData)
        }
    }

    return { trackClick }
}
