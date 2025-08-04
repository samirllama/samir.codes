
"use client";

import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = (
    options?: IntersectionObserverInit & { freezeOnceVisible?: boolean }
) => {
    const {
        threshold = 0,
        root = null,
        rootMargin = "0%",
    } = options || {};
    const freezeOnceVisible = options?.freezeOnceVisible || false;
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
    }, [threshold, root, rootMargin, freezeOnceVisible])

    return { entry, targetRef };
};
