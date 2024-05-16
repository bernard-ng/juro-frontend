.DEFAULT_GOAL := help

# -----------------------------------
# Variables
# -----------------------------------
is_docker := $(shell docker info > /dev/null 2>&1 && echo 1)
user := $(shell id -u)
group := $(shell id -g)

ifeq ($(is_docker), 1)
	dc := USER_ID=$(user) GROUP_ID=$(group) docker-compose
	de := docker-compose exec
	dr := $(dc) run --rm
	node := $(dr) --user="$(user)" node
else
	node := node
endif

# -----------------------------------
# Recipes
# -----------------------------------
.PHONY: help
help: ## show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: lint
lint: node_modules/time ## code style standard
	$(node) npm run lint

.PHONY: dev
dev: node_modules/time ## Start the development env
	$(dc) up

# -----------------------------------
# Dependencies
# -----------------------------------
node_modules/time: package-lock.json
	$(node) npm install --force
	touch node_modules/time
