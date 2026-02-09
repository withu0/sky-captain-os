#!/usr/bin/env bash
set -euo pipefail

# Local Ubuntu setup for sky-captain-os
# Run from project root: ./setup-local.sh

cd "$(dirname "$0")"
PROJECT_ROOT=$(pwd)

echo "=== sky-captain-os local setup ==="

# --- Prerequisites ---
MISSING_CMD=""
command -v php      >/dev/null 2>&1 || MISSING_CMD="${MISSING_CMD} php"
command -v composer >/dev/null 2>&1 || MISSING_CMD="${MISSING_CMD} composer"
command -v node     >/dev/null 2>&1 || MISSING_CMD="${MISSING_CMD} node"
command -v npm      >/dev/null 2>&1 || MISSING_CMD="${MISSING_CMD} npm"

if [ -n "$MISSING_CMD" ]; then
  echo ""
  echo "Missing:${MISSING_CMD}"
  echo ""
  echo "Install everything (copy-paste the block below, then run ./setup-local.sh again):"
  echo ""
  echo "---"
  cat << 'INSTALL'
sudo apt update
# PHP 8.2 (Ubuntu 22.04+). For 20.04 first: sudo add-apt-repository ppa:ondrej/php && sudo apt update
sudo apt install -y php8.2 php8.2-cli php8.2-mbstring php8.2-xml php8.2-bcmath php8.2-curl php8.2-sqlite3 php8.2-zip unzip
# (php8.2-xml provides ext-dom and ext-xml; for PHP 8.4 use php8.4-xml)
# Composer
curl -sS https://getcomposer.org/installer | php && sudo mv composer.phar /usr/local/bin/composer
# Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
INSTALL
  echo "---"
  echo ""
  echo "Then run: ./setup-local.sh"
  exit 1
fi

PHP_VERSION=$(php -r "echo PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION;")
NODE_VERSION=$(node -v 2>/dev/null | sed 's/^v//' | cut -d. -f1)
if [ "${NODE_VERSION:-0}" -lt 18 ] 2>/dev/null; then
  echo ""
  echo "Node 18+ required. Current: $(node -v)"
  echo ""
  echo "Install Node 20 (copy-paste and run):"
  echo "---"
  echo "curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -"
  echo "sudo apt install -y nodejs"
  echo "---"
  echo ""
  echo "Then run: ./setup-local.sh"
  exit 1
fi

echo "Using PHP $PHP_VERSION, $(node -v), $(composer -V 2>/dev/null | head -1)"

# --- PHP extensions (required by Composer/Laravel) ---
MISSING_EXT=""
php -m | grep -q '^dom$' || MISSING_EXT="${MISSING_EXT} dom"
php -m | grep -q '^xml$' || MISSING_EXT="${MISSING_EXT} xml"
php -m | grep -q '^pdo_sqlite$' || MISSING_EXT="${MISSING_EXT} pdo_sqlite"
if [ -n "$MISSING_EXT" ]; then
  echo ""
  echo "Missing PHP extensions:${MISSING_EXT}"
  echo ""
  echo "Install them (PHP $PHP_VERSION), then run ./setup-local.sh again:"
  echo "  sudo apt install php${PHP_VERSION}-xml php${PHP_VERSION}-sqlite3"
  echo ""
  echo "(php-xml provides dom/xml; php-sqlite3 provides pdo_sqlite for SQLite)"
  exit 1
fi

# --- PHP dependencies (must be first so vendor/ exists for artisan) ---
echo "> composer install"
composer install --no-interaction

# --- .env ---
if [ ! -f .env ]; then
  echo "> Copying .env.example to .env"
  cp .env.example .env
fi
if ! grep -q '^APP_KEY=base64:' .env 2>/dev/null; then
  echo "> Generating APP_KEY"
  php artisan key:generate
fi

# --- Database ---
if [ ! -f database/database.sqlite ]; then
  touch database/database.sqlite
  echo "> Created database/database.sqlite"
fi
echo "> php artisan migrate"
php artisan migrate --force

# --- Frontend ---
echo "> npm install"
npm install
echo "> npm run build"
npm run build

echo ""
echo "=== Setup complete ==="
echo ""
echo "Start the app with:"
echo "  composer dev"
echo ""
echo "Then open: http://localhost:8000"
echo ""
if [[ "${1:-}" == "--start" ]]; then
  echo "Starting app..."
  exec composer dev
fi
