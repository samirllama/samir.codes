(function () {
  try {
    const themes = ["light", "dark"];
    const storageKey = "theme";
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const saved = localStorage.getItem(storageKey);
    const resolved =
      saved === "system"
        ? systemPrefersDark
          ? "dark"
          : "light"
        : saved || "dark";

    const root = document.documentElement;
    root.classList.remove(...themes);
    root.classList.add(resolved);
    root.style.colorScheme = resolved;
  } catch (e) {
    console.error("Theme initialization failed", e);
  }
})();
