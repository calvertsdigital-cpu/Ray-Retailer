// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import path from "path";
import fs from "fs";

// Remove ghost directories that can't be deleted via normal means
const removeGhostDirs = () => {
  const ghostDirs = [
    "src/routes/u20x.",
    "src/routes/tea-coffee/articles.",
    "src/routes/tea-coffee/learn.",
  ];
  
  for (const dir of ghostDirs) {
    const fullPath = path.resolve(process.cwd(), dir);
    try {
      if (fs.existsSync(fullPath)) {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          // Attempt cleanup via child_process
          const { execSync } = require("child_process");
          try {
            if (process.platform === "win32") {
              execSync(`rmdir /s /q "${fullPath}"`, { stdio: "ignore" });
            } else {
              execSync(`rm -rf "${fullPath}"`, { stdio: "ignore" });
            }
          } catch (e) {
            // Silent fail - directory might still be accessible but not deletable
          }
        }
      }
    } catch (e) {
      // Ignore errors
    }
  }
};

removeGhostDirs();

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Exclude ghost directories from route generation
    routers: {
      exclude: ["**/*.\\*"],
    },
  },
});
