// scripts/check-exports.js
const fs = require("fs");
const path = require("path");

const components = [
  { name: "Gif", path: path.join("components", "mdx", "Gif.tsx") },
  { name: "NonceScript", path: path.join("components", "nonce-script.tsx") },
  { name: "NonceStyle", path: path.join("components", "nonce-style.tsx") },
];

function read(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null;
}

function findImportsInApp(name) {
  const appDir = path.join(process.cwd(), "app");
  const files = [];
  function walk(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((d) => {
      const p = path.join(dir, d.name);
      if (d.isDirectory()) walk(p);
      else if (/\.tsx?$|\.jsx?$|\.mdx$/.test(d.name)) files.push(p);
    });
  }
  walk(appDir);
  return files.filter((f) => {
    const src = read(f) || "";
    const importRegex = new RegExp(
      `import\\s+([\\s\\S]*?)\\s+from\\s+['"\`]([\\s\\S]*?)['"\`]`,
      "g"
    );
    let m;
    while ((m = importRegex.exec(src)) !== null) {
      if (
        m[0].includes(name) ||
        m[2].endsWith(name) ||
        m[2].endsWith(name.replace(/[A-Z]/g, "-$&").toLowerCase())
      )
        return true;
    }
    return false;
  });
}

console.log("Checking components and imports...\n");

components.forEach((c) => {
  const p = path.join(process.cwd(), c.path);
  const src = read(p);
  console.log(`Component: ${c.name} -> ${c.path}`);
  if (!src) {
    console.log("  ❌ file not found");
    return;
  }
  const hasDefault = /export\s+default\s+/m.test(src);
  const named = [];
  const namedRegex =
    /export\s+(?:const|function|class|let|var)\s+([A-Za-z0-9_]+)/g;
  let mm;
  while ((mm = namedRegex.exec(src)) !== null) named.push(mm[1]);
  const namedReExports = (src.match(/export\s*{([^}]+)}/m) || [
    null,
    "",
  ])[1].trim();
  console.log(`  default export: ${hasDefault ? "yes" : "no"}`);
  console.log(
    `  named exports found: ${
      named.length ? named.join(", ") : namedReExports ? namedReExports : "none"
    }`
  );
  const imports = findImportsInApp(c.name);
  if (imports.length)
    console.log("  imported from pages:", imports.slice(0, 10).join(", "));
  else console.log("  not imported anywhere in app/ (or not matched)");
  console.log("");
});
