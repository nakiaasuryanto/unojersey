#!/bin/bash

# Deploy script untuk Nginx static site hosting
# Tidak butuh PM2/Node.js process

set -e  # Exit on error

# Configuration
PROJECT_DIR="/home/syanampro/Projects/unojersey"
NGINX_ROOT="/home/fabrikgroup/web/unojersey.com/public_html"
NGINX_USER="www-data"  # atau user yang menjalankan Nginx
BACKUP_DIR="/home/syanampro/backups/unojersey"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "🚀 Starting deployment..."
echo "📁 Project: $PROJECT_DIR"
echo "🌐 Nginx root: $NGINX_ROOT"

# Pindah ke directory project
cd "$PROJECT_DIR" || exit 1

# Backup existing dist folder (optional, tapi recommended)
if [ -d "$NGINX_ROOT/dist" ]; then
    echo "💾 Backing up current dist folder..."
    mkdir -p "$BACKUP_DIR"
    sudo cp -r "$NGINX_ROOT/dist" "$BACKUP_DIR/dist_$TIMESTAMP"
    echo "✅ Backup saved to: $BACKUP_DIR/dist_$TIMESTAMP"
fi

echo "📥 Pulling latest code from GitHub..."
git pull origin main

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building Astro site..."
npm run build

echo "📁 Copying build files to Nginx directory..."
# Copy folder dist ke Nginx document root
sudo rm -rf "$NGINX_ROOT/dist"
sudo cp -r "$PROJECT_DIR/dist" "$NGINX_ROOT/"

# Set permissions agar Nginx bisa baca
sudo chown -R $NGINX_USER:$NGINX_USER "$NGINX_ROOT/dist"
sudo chmod -R 755 "$NGINX_ROOT/dist"

echo "✅ Deployment completed!"
echo "🌐 Site: https://unojersey.com"
echo ""
echo "📊 Build statistics:"
echo "   - Total files: $(find "$PROJECT_DIR/dist" -type f | wc -l)"
echo "   - Total size: $(du -sh "$PROJECT_DIR/dist" | cut -f1)"
echo ""
echo "🎉 No PM2 needed - Nginx serves static files directly!"
