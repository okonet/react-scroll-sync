# TypeScript Types Migration

## Important: Remove Community `@types` Package

Starting from version 1.0.0, `react-scroll-sync` provides its own TypeScript type definitions built-in.  
**You must uninstall the community `@types/react-scroll-sync` package to avoid type conflicts and ensure you are using the latest, official types.**

### Migration Steps

1. **Uninstall the community types:**

   ```sh
   npm uninstall @types/react-scroll-sync
   # or, if you use yarn:
   yarn remove @types/react-scroll-sync
   ```

2. **Update your imports (if needed):**

   You can now use `react-scroll-sync` directly in your TypeScript code without any additional type packages.

   ```ts
   import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
   ```

3. **Check your code:**

   The official types are included automatically. If you encounter any type errors, ensure the old `@types/react-scroll-sync` package is fully removed from your `node_modules` and `package.json`.

---
