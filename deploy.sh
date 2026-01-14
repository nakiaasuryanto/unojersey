#!/bin/bash

# Deploy script untuk unojersey
# Dijalankan sebagai user fabrikgroup langsung

set -e  # Exit on error

# Load configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "$SCRIPT_DIR/.deployrc" ]; then
    source "$SCRIPT_DIR/.deployrc"
else
    echo "❌ Error: .deployrc not found!"
    exit 1
fi

echo "🚀 Starting deployment..."
echo "👤 Deploy user: $DEPLOY_USER"
echo "📦 PM2 app: $PM2_APP_NAME"
echo "🌿 Branch: $DEPLOY_BRANCH"

# Pindah ke directory project
cd "$SCRIPT_DIR" || exit 1

echo "📥 Pulling latest code from GitHub..."
git pull origin "$DEPLOY_BRANCH"

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building Astro site..."
npm run build

echo "📁 Copying build to public_html..."
PUBLIC_HTML="/home/$DEPLOY_USER/web/unojersey.com/public_html"

# Create directory if not exists
mkdir -p "$PUBLIC_HTML"

# Copy build files
cp -r dist/* "$PUBLIC_HTML"/

echo "🚀 Starting PM2 preview server..."
# Jalankan dari project directory (bukan public_html) untuk akses vite.config.js
if pm2 list | grep -q "$PM2_APP_NAME"; then
    pm2 restart "$PM2_APP_NAME"
else
    pm2 start npm --name "$PM2_APP_NAME" -- start
fi

echo "✅ Deployment completed!"
echo "🌐 Site running at: http://localhost:9904"
echo "📊 PM2 Status:"
pm2 list
