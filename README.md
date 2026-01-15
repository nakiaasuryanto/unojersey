# UNO JERSEY - Custom Jersey Website

Custom premium quality jerseys for your team. Basketball, Football, Futsal, Volleyball and more.

## Project Overview

UNO JERSEY is a static website built with **Astro**, featuring:
- Static pages for showcasing products and portfolio
- Dynamic blog/news pages with custom routes
- Modern, responsive design with Tailwind CSS
- Smooth animations with GSAP

## Technology Stack

- **Framework:** Astro 5.x
- **Styling:** Tailwind CSS 6.x
- **Animations:** GSAP 3.x
- **Interactivity:** Alpine.js
- **Deployment:** Nginx (static site hosting)

## Project Structure

```
unojersey/
├── /src
│   ├── /pages                 # Astro pages
│   │   ├── index.astro        # Homepage
│   │   ├── temukan.astro      # Find/Quiz page
│   │   ├── portfolio.astro    # Portfolio showcase
│   │   ├── tentang-kami.astro  # About us
│   │   └── /berita
│   │       ├── index.astro    # Blog index
│   │       └── [slug].astro   # Dynamic blog posts
│   ├── /components            # Reusable components
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── ProductsSection.astro
│   │   ├── PortfolioSection.astro
│   │   ├── TemukanPreview.astro
│   │   ├── BannerCTA.astro
│   │   └── Footer.astro
│   └── /layouts
│       ├── Layout.astro       # Main layout
│       └── KreasikanLayout.astro
├── /public                    # Static assets
│   ├── /images               # Images and media
│   ├── /videos               # Video files
│   ├── favicon.png
│   └── favicon.svg
├── astro.config.mjs          # Astro configuration
├── vite.config.js            # Vite configuration
├── package.json
├── deploy.sh                 # Deployment script
└── README.md
```

## Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:4321

### Build for Production

```bash
# Build the site
npm run build

# Preview production build locally
npm run preview
```

## Deployment

### Prerequisites

- VPS with Nginx installed
- SSH access to server
- Git repository (GitHub/GitLab)

### Deployment Process

1. **Configure deployment** by creating `.deployrc` file (see `.deployrc.example`)

2. **Make deploy script executable:**
   ```bash
   chmod +x deploy.sh
   ```

3. **Deploy to server:**
   ```bash
   ./deploy.sh
   ```

The deployment script will:
- Pull latest code from Git
- Install dependencies
- Build Astro site
- Copy `dist/` folder to Nginx document root
- Set proper file permissions

### Nginx Configuration

Configure Nginx to serve static files directly (see `nginx.conf` in project):

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;

    root /path/to/public_html/dist;
    index index.html;

    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|mp4)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Important:** No PM2 or Node.js process needed for static site deployment.

## Available Pages

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Landing page with hero, products, and portfolio |
| Temukan | `/temukan` | Find/quiz page for jersey style |
| Portfolio | `/portfolio` | Portfolio showcase |
| Tentang Kami | `/tentang-kami` | About us page |
| Berita | `/berita` | Blog/news index |
| Blog Posts | `/berita/[slug]` | Dynamic blog post pages |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `./deploy.sh` | Deploy to server |

## Design System

### Colors
- Primary Red: `#E63946`
- Primary Blue: `#1D3557`
- Light Gray: `#FAFAFA`

### Typography
- Headings: Bebas Neue
- Body: Inter

### Spacing
- Base unit: 8px
- Consistent spacing scale

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow Astro best practices
2. Use Tailwind CSS utility classes
3. Test on multiple screen sizes
4. Optimize images before adding to `/public`
5. Update documentation for significant changes

## Troubleshooting

### Build Issues

If build fails, try:
```bash
rm -rf node_modules .astro dist
npm install
npm run build
```

### Routing Issues

If pages show 404 on server:
- Check Nginx `try_files` configuration
- Ensure `dist/` folder is copied correctly
- Verify file permissions on server

### Deployment Issues

Check `.deployrc` configuration:
- Ensure correct user and branch
- Verify Git repository URL
- Check server paths and permissions

## License

© 2024 UNO JERSEY. All rights reserved.
