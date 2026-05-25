# Light Mode Improvements - TODO

## Plan summary (minimal changes)
- Update `src/index.css` ONLY Light variables:
  - `--bg`, `--text`, `--card`, `--border`, plus add `--muted` if needed.
- Keep `.dark` block untouched.
- Re-run `npm run build`.

## Steps
1. Update Light tokens in `src/index.css`.
2. Do NOT edit `.dark` tokens.
3. Ensure no other hardcoded Light colors were introduced.
4. Run `npm run build`.

