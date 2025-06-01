// hooks/useIntersectionObserver.ts
"use client";

import { useEffect, useRef, useState } from "react";

interface IntersectionObserverOptions extends IntersectionObserverInit {
    freezeOnceVisible?: boolean; // Option to stop observing once element is active
}

export const useIntersectionObserver = (
    options?: IntersectionObserverOptions
) => {
    const {
        threshold = 0,
        root = null,
        rootMargin = "0%",
        freezeOnceVisible = false,
    } = options || {};
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
    const targetRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const node = targetRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([currentEntry]) => {
                setEntry(currentEntry);
                if (freezeOnceVisible && currentEntry.isIntersecting) {
                    observer.unobserve(node);
                }
            },
            { threshold, root, rootMargin }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, [threshold, root, rootMargin, freezeOnceVisible]); // Re-run if options change

    return { entry, targetRef };
};
