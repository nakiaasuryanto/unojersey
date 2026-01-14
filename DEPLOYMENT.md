# 🚀 Deployment Guide - UnoJersey

## Overview

UnoJersey menggunakan Astro (Static Site Generator) yang di-deploy ke VPS menggunakan GitHub Actions + PM2.

## Konfigurasi Deployment

### 📁 File Konfigurasi

1. **`.deployrc`** - Konfigurasi deployment (LOCAL ONLY, jangan di-commit)
   ```bash
   DEPLOY_USER="fabrikgroup"
   PM2_APP_NAME="unojersey"
   DEPLOY_BRANCH="main"
   PREVIEW_PORT="9904"
   ```

2. **`deploy.sh`** - Deployment script
   - Pull latest code dari GitHub
   - Install dependencies (npm install)
   - Build Astro site (npm run build)
   - Restart PM2 dengan `npm start` (port 9904)

3. **`.github/workflows/deploy.yml`** - GitHub Actions
   - Trigger: Push ke branch `main`
   - SSH ke VPS dan jalankan deploy.sh

### 🌐 Deployment Flow

```
GitHub Push (main branch) → GitHub Actions → SSH ke VPS → deploy.sh →
  1. git pull (as fabrikgroup)
  2. npm install (all dependencies)
  3. npm run build (Astro build)
  4. PM2 restart/start (npm start → astro preview port 9904)
```

## 📝 Setup GitHub Secrets

Di GitHub repository, set secrets berikut:

- **PROD_VPS_HOST** - IP/Domain VPS
- **PROD_VPS_USERNAME** - Username SSH (syanampro)
- **PROD_VPS_SSH_KEY** - SSH private key
- **PROD_VPS_PORT** - SSH port (opsional, default 22)

## 🔧 Manual Deployment

Jika perlu deploy manual tanpa GitHub Actions:

```bash
# SSH ke VPS
ssh syanampro@vps-host

# Pindah ke directory project
cd /home/fabrikgroup/web/unojersey.com/public_html

# Jalankan deploy script
./deploy.sh
```

## 🛠️ Development vs Production

### Local Development
```bash
npm run dev          # Start dev server (default port 4321)
npm run build        # Build untuk production (output: dist/)
npm run start        # Preview production build (port 9904)
npm start            # Sama dengan npm run start
```

### Production (VPS)
- **Repository**: `/home/fabrikgroup/web/unojersey.com/public_html/`
- **PM2 app name**: `unojersey-web`
- **Port**: `9904`
- **Command**: `pm2 start npm --name "unojersey-web" -- start`
- **Auto-build**: Setiap deploy otomatis build Astro site

## 📊 PM2 Commands

```bash
# Cek status PM2
sudo -u fabrikgroup pm2 list

# View logs
sudo -u fabrikgroup pm2 logs unojersey

# Restart manual
sudo -u fabrikgroup pm2 restart unojersey

# Stop
sudo -u fabrikgroup pm2 stop unojersey

# Delete
sudo -u fabrikgroup pm2 delete unojersey
```

## 🔍 Troubleshooting

### Deploy gagal
```bash
# Cek deploy.sh permission
ls -la deploy.sh  # Harus -rwxr-xr-x

# Pastikan .deployrc ada
cat .deployrc
```

### PM2 tidak jalan
```bash
# Cek PM2 list
sudo -u fabrikgroup pm2 list

# Cek error logs
sudo -u fabrikgroup pm2 logs unojersey --err
```

### Build error
```bash
# Cek node_modules
sudo -u fabrikgroup rm -rf node_modules
sudo -u fabrikgroup npm install

# Clear Astro cache
sudo -u fabrikgroup rm -rf .astro dist
sudo -u fabrikgroup npm run build
```

## 📱 Nginx Configuration (Optional)

Jika ingin serve via Nginx instead of PM2 preview:

```nginx
server {
    listen 80;
    server_name unojersey.com www.unojersey.com;

    root /home/fabrikgroup/web/unojersey.com/public_html;
    index index.html;

    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Catatan**: Setup ini menggunakan PM2 preview server di port 9904. Jika ingin menggunakan Nginx, perlu reverse proxy configuration dari port 9904 ke domain.

## 🔄 Rollback

Jika perlu rollback ke versi sebelumnya:

```bash
cd /home/fabrikgroup/web/unojersey.com/public_html
sudo -u fabrikgroup git log --oneline -10  # Cek commit history
sudo -u fabrikgroup git reset --hard <commit-hash>
./deploy.sh  # Rebuild dan redeploy
```

## ✅ Pre-deployment Checklist

- [ ] `.deployrc` sudah dikonfigurasi dengan benar
- [ ] GitHub secrets sudah di-set (PROD_VPS_HOST, PROD_VPS_USERNAME, PROD_VPS_SSH_KEY)
- [ ] User `fabrikgroup` sudah ada di VPS
- [ ] Repository sudah di-clone di `/home/fabrikgroup/web/unojersey.com/public_html`
- [ ] `.deployrc` sudah di-copy dari `.deployrc.example` dan di-edit
- [ ] PM2 sudah terinstall: `sudo npm install -g pm2`
- [ ] `deploy.sh` sudah executable: `chmod +x deploy.sh`
- [ ] Firewall port 9904 sudah open
- [ ] User `syanampro` punya sudo access untuk menjalankan command sebagai `fabrikgroup`
- [ ] npm sudah terinstall di VPS

---

**Generated based on routing.digital360.id deployment workflow**
