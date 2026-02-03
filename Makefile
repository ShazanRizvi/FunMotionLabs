.PHONY: help install dev build docker-build docker-up docker-down docker-dev docker-prod clean bootstrap

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install all dependencies using Lerna
	npm install
	npm run bootstrap

bootstrap: ## Bootstrap all packages
	npm run bootstrap

dev: ## Run all services locally (without Docker)
	npm run dev

build: ## Build all packages
	npm run build

docker-build: ## Build Docker images
	docker-compose build

docker-up: ## Start Docker containers
	docker-compose up

docker-down: ## Stop Docker containers
	docker-compose down

docker-dev: ## Build and start Docker containers for development
	docker-compose up --build

docker-prod: ## Build and start Docker containers for production
	docker-compose -f docker-compose.prod.yml up --build

clean: ## Clean all node_modules
	npm run clean
	docker-compose down -v
