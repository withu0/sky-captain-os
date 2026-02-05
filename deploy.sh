#!/usr/bin/env bash
set -euo pipefail

# Deploy script for sky-captain-os (Laravel + Inertia)
# Run this on the server after git pull, or from CI.
# Usage: ./deploy.sh [--no-migrate] [--no-build]

DEPLOY_PATH="${DEPLOY_PATH:-$(pwd)}"
NO_MIGRATE=false
NO_BUILD=false

for arg in "$@"; do
  case $arg in
    --no-migrate) NO_MIGRATE=true ;;
    --no-build)   NO_BUILD=true ;;
  esac
done

cd "$DEPLOY_PATH"
echo "Deploying from: $DEPLOY_PATH"

# PHP dependencies
echo "> composer install --no-dev --optimize-autoloader"
composer install --no-dev --optimize-autoloader

# Frontend build (skip if --no-build, e.g. when build is done in CI)
if [ "$NO_BUILD" = false ]; then
  if command -v npm &>/dev/null; then
    echo "> npm ci && npm run build"
    npm ci
    npm run build
  else
    echo "Warning: npm not found. Skip frontend build. Ensure public/build/ exists."
  fi
fi

# Migrations (skip if --no-migrate)
if [ "$NO_MIGRATE" = false ]; then
  echo "> php artisan migrate --force"
  php artisan migrate --force
fi

# Laravel caches
echo "> php artisan config:cache"
php artisan config:cache
echo "> php artisan route:cache"
php artisan route:cache
echo "> php artisan view:cache"
php artisan view:cache

echo "Deploy finished."
