# thefourtheye.in

Hugo-based blog for thefourtheye.in

## Prerequisites

- Hugo extended, version 0.138.0 or newer (tested with 0.168.0), with
  `postcss` on `PATH`; the theme's CSS is processed through PostCSS during
  the build.
- Install PostCSS globally: `npm i -g postcss postcss-cli`
- `pdflatex` for `make build` / `make deploy` (Resume compilation).

## Make Commands

| Command | Description |
|---------|-------------|
| `make clean` | Remove `public/` directory (Hugo output) |
| `make clean-deploy` | Remove all visible files/dirs in `../thefourtheye.github.io/` (preserves `.git`, `.gitignore`, etc.) |
| `make build` | Build site with Hugo (compiles Resume.tex if changed) |
| `make check` | Build in memory and fail on build errors |
| `make test` | Clean and start Hugo dev server |
| `make copy` | Copy built files from `public/` to `../thefourtheye.github.io/` |
| `make deploy` | Full deploy: clean, build, clean-deploy, copy |

### clean-deploy notes
Uses `find . -maxdepth 1 ! -name '.' ! -name '..' ! -name '.*'` to explicitly exclude hidden files (those starting with `.`), ensuring `.git`, `.gitignore`, and other hidden files/directories are preserved.

### Resume compilation
`make build` automatically compiles `static/Resume.tex` to PDF using pdflatex only if:
- `static/Resume.pdf` doesn't exist, OR
- `static/Resume.tex` is newer than `static/Resume.pdf`

This ensures pdflatex (heavy) runs minimally.

## Deployment

The site is deployed to GitHub Pages from the sibling
`../thefourtheye.github.io` repository. Old URLs are handled by Hugo
`aliases`, which generate small redirect pages in the output.
