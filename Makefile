.PHONY: help clean clean-deploy build test copy deploy

DEPLOY_DIR := ../thefourtheye.github.io

help:
	@echo "thefourtheye.in - Hugo site build commands"
	@echo ""
	@echo "Available targets:"
	@echo "  make clean        - Remove public/ directory (Hugo output)"
	@echo "  make clean-deploy - Remove visible files in deploy dir, preserve hidden files"
	@echo "  make build        - Build site with Hugo (compiles Resume.tex if changed)"
	@echo "  make test         - Clean and start Hugo dev server"
	@echo "  make copy         - Copy built files to deploy directory"
	@echo "  make deploy       - Full deploy: clean, build, clean-deploy, copy"

clean:
	rm -rf public

clean-deploy:
	cd $(DEPLOY_DIR) && find . -maxdepth 1 ! -name '.' ! -name '..' ! -name '.*' -exec rm -rf {} +

static/Resume.pdf: static/Resume.tex
	@cd static && pdflatex -interaction=nonstopmode Resume.tex
	@cd static && pdflatex -interaction=nonstopmode Resume.tex
	@cd static && rm -f Resume.aux Resume.log Resume.out

build: static/Resume.pdf
	hugo

test: clean
	hugo server

copy:
	cp -r public/* $(DEPLOY_DIR)/

deploy: clean build clean-deploy copy
	@echo "Deploy complete"