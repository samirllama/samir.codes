// lib/typing-logic.ts

interface TypingState {
    items: string[];
    currentItemIndex: number;
    displayedText: string;
    isDeleting: boolean;
}

interface TypingConfig {
    typingSpeed: number;
    deletingSpeed: number;
    pauseDuration: number;
}

interface NextTypingStep {
    nextText: string;
    nextIsDeleting: boolean; // Indicates the state *after* the delay
    delay: number;
}

export function calculateNextTypingStep(
    state: TypingState,
    config: TypingConfig
): NextTypingStep {
    const { items, currentItemIndex, displayedText, isDeleting } = state;
    const { typingSpeed, deletingSpeed, pauseDuration } = config;

    // Ensure items array is valid
    if (!items || items.length === 0) {
        return { nextText: "", nextIsDeleting: false, delay: Infinity }; // Or handle error
    }

    const currentTargetText = items[currentItemIndex % items.length]; // Use modulo for safety
    const currentLength = displayedText.length;

    let nextText = displayedText;
    let nextIsDeleting = isDeleting;
    let delay = typingSpeed;

    if (isDeleting) {
        // Deleting Phase ---
        if (currentLength > 0) {
            nextText = currentTargetText.substring(0, currentLength - 1);
            delay = deletingSpeed;
            nextIsDeleting = true; // Still deleting
        } else {
            // Finished deleting, prepare to type next word
            nextIsDeleting = false; // Switch state
            // Text remains empty, index increment happens in component
            delay = typingSpeed; // Delay before starting to type next word
        }
    } else {
        // Typing Phase ---
        if (currentLength < currentTargetText.length) {
            nextText = currentTargetText.substring(0, currentLength + 1);
            delay = typingSpeed;
            nextIsDeleting = false; // Still typing
        } else {
            // Finished typing, prepare to pause then delete
            delay = pauseDuration;
            nextIsDeleting = true; // Switch state after pause
            nextText = currentTargetText; // Keep full text during pause
        }
    }

    return { nextText, nextIsDeleting, delay };
}
