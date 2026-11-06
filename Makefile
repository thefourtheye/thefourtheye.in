.PHONY: help clean clean-deploy build check test copy deploy spas-export

DEPLOY_DIR := ../thefourtheye.github.io

help:
	@echo "thefourtheye.in - Hugo site build commands"
	@echo ""
	@echo "Available targets:"
	@echo "  make clean        - Remove public/ directory (Hugo output)"
	@echo "  make clean-deploy - Remove visible files in deploy dir, preserve hidden files"
	@echo "  make build        - Build site with Hugo (compiles Resume.tex if changed)"
	@echo "  make check        - Build in memory and fail on build errors"
	@echo "  make test         - Clean and start Hugo dev server"
	@echo "  make copy         - Copy built files to deploy directory"
	@echo "  make deploy       - Full deploy: clean, build, clean-deploy, copy"

clean:
	rm -rf public

clean-deploy:
	test -d $(DEPLOY_DIR)/.git || { echo "$(DEPLOY_DIR) is not a git repo"; exit 1; }
	cd $(DEPLOY_DIR) && find . -maxdepth 1 ! -name '.' ! -name '..' ! -name '.*' -exec rm -rf {} +

static/Resume.pdf: static/Resume.tex
	@cd static && pdflatex -interaction=nonstopmode Resume.tex && pdflatex -interaction=nonstopmode Resume.tex && rm -f Resume.aux Resume.log Resume.out

build: static/Resume.pdf
	hugo

check:
	hugo --renderToMemory

test: clean
	hugo server

copy:
	cp -r public/* $(DEPLOY_DIR)/

deploy: clean build clean-deploy copy
	@echo "Deploy complete"
# SPAs export target
spas-export:
	cd ../spas && npm run export-and-inject
