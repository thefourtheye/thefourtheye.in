# thefourtheye.in

Hugo-based blog for thefourtheye.in

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run clean` | Remove the `public/` directory (Hugo output) |
| `npm run clean-deploy` | Remove all visible files/dirs in `../thefourtheye.github.io/` (preserves `.git`, `.gitignore`, etc.) |
| `npm run build` | Run Hugo to generate the site |
| `npm run test` | Clean and start Hugo dev server |
| `npm run copy` | Copy built files from `public/` to `../thefourtheye.github.io/` |
| `npm run deploy` | Full deploy: clean, build, clean-deploy, copy |

### clean-deploy notes
Uses `find . -maxdepth 1 ! -name '.' ! -name '..' ! -name '.*'` to explicitly exclude hidden files (those starting with `.`), ensuring `.git`, `.gitignore`, and other hidden files/directories are preserved.