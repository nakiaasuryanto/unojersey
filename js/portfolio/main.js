// ========================================
// PORTFOLIO PAGE JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Force scroll to top on page load
  window.scrollTo(0, 0);

  // ========================================
  // NAVBAR SCROLL EFFECT
  // ========================================
  const navbar = document.getElementById('navbar');
  const navTagline = document.getElementById('nav-tagline');
  const navTaglineText = navTagline?.querySelector('.nav-tagline-text');
  const navbarLogo = document.getElementById('navbar-logo');

  function updateNavbar() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      navbar?.classList.add('scrolled');

      if (navTaglineText) {
        navTaglineText.style.fontSize = '24px';
      }

      if (navbarLogo) {
        navbarLogo.classList.remove('navbar-logo-hidden');
        navbarLogo.classList.add('navbar-logo-visible');
        navbarLogo.src = '/assets/images/UNO-Black.png';
      }
    } else {
      navbar?.classList.remove('scrolled');

      if (navTaglineText) {
        navTaglineText.style.fontSize = '48px';
      }

      if (navbarLogo) {
        navbarLogo.classList.remove('navbar-logo-visible');
        navbarLogo.classList.add('navbar-logo-hidden');
        navbarLogo.src = '/assets/images/UNO-White.png';
      }
    }
  }

  window.addEventListener('scroll', updateNavbar);
  updateNavbar();

  // ========================================
  // PORTFOLIO DATA
  // ========================================
  const portfolioItems = [
    {
      id: 1,
      title: 'SMAN 39 Jakarta',
      category: 'baseball',
      description: 'Custom jersey dengan desain sublimasi',
      thumbnail: '/assets/images/product-model1.jpg',
      detailImages: [
        { src: '/assets/images/product1-1.JPG', caption: 'Desain bold dengan warna tim yang mencolok' },
        { src: '/assets/images/product1-2.JPG', caption: 'Detail bordir nama dan nomor punggung premium' },
        { src: '/assets/images/product1-3.JPG', caption: 'Bahan dry-fit yang breathable dan nyaman' },
        { src: '/assets/images/product1-4.JPG', caption: 'Kombinasi warna yang dinamis dan sporty' },
        { src: '/assets/images/product1-5.JPG', caption: 'Finishing yang rapi dan tahan lama' }
      ],
      fullDescription: 'Jersey baseball custom dengan desain modern yang memadukan warna bold dan detail premium. Dibuat menggunakan bahan dry-fit berkualitas tinggi yang breathable, cocok untuk performa maksimal di lapangan.'
    },
    {
      id: 2,
      title: 'SMAN 1 Paliman',
      category: 'football',
      description: 'Jersey dry-fit premium',
      thumbnail: '/assets/images/product-model2.jpg',
      detailImages: [
        { src: '/assets/images/product2-1.JPG', caption: 'Desain lightning yang energik dan powerful' },
        { src: '/assets/images/product2-2.JPG', caption: 'Kerah V-neck dengan detail stitching premium' },
        { src: '/assets/images/product2-3.JPG', caption: 'Pattern geometris yang modern dan dinamis' },
        { src: '/assets/images/product2-4.JPG', caption: 'Sponsor area dengan posisi strategis' },
        { src: '/assets/images/product2-5.JPG', caption: 'Lengan raglan dengan fit yang ergonomic' },
        { src: '/assets/images/product2-6.JPG', caption: 'Detail warna gradasi yang eye-catching' }
      ],
      fullDescription: 'Jersey football premium dengan motif lightning yang symbolkan kecepatan dan power. Menggunakan teknologi sublimasi terbaik untuk hasil warna yang tajam dan tidak mudah pudar.'
    },
    {
      id: 3,
      title: 'MAN 1 Tuban',
      category: 'football',
      description: 'Jersey football profesional',
      thumbnail: '/assets/images/product-model3.jpg',
      detailImages: [
        { src: '/assets/images/product3-1.JPG', caption: 'Desain klasik dengan sentuhan modern' },
        { src: '/assets/images/product3-2.JPG', caption: 'Color block yang elegan dan profesional' },
        { src: '/assets/images/product3-3.JPG', caption: 'Detail kerah dengan reinforcement stitching' },
        { src: '/assets/images/product3-4.JPG', caption: 'Badan jersey dengan airflow technology' },
        { src: '/assets/images/product3-5.JPG', caption: 'Lengan dengan fit yang comfortable' },
        { src: '/assets/images/product3-6.JPG', caption: 'Backdrop warna yang kontras dan stylish' },
        { src: '/assets/images/product3-7.JPG', caption: 'Full display jersey dengan semua detail' }
      ],
      fullDescription: 'Jersey football profesional dengan desain color block yang elegan. Dibuat untuk tim yang mengutamakan identitas kuat dengan tampilan yang clean dan modern di lapangan.'
    },
    {
      id: 4,
      title: 'SMAN 107 Jakarta',
      category: 'futsal',
      description: 'Singlet futsal ringan',
      thumbnail: '/assets/images/product-model4.jpg',
      detailImages: [
        { src: '/assets/images/product4-1.JPG', caption: 'Singlet dengan desain aerodinamis' },
        { src: '/assets/images/product4-2.JPG', caption: 'Pattern minimalis yang sleek dan modern' },
        { src: '/assets/images/product4-3.JPG', caption: 'Detail side panel dengan ventilation' },
        { src: '/assets/images/product4-4.JPG', caption: 'Back design dengan keseimbangan warna' }
      ],
      fullDescription: 'Singlet futsal dengan desain aerodinamis untuk gerakan cepat. Bahan ultra-light dengan ventilation system membuatnya nyaman dipakai sepanjang pertandingan intens.'
    },
    {
      id: 5,
      title: 'SMP Al-Azhar 13 Surabaya',
      category: 'futsal',
      description: 'Jersey futsal classic reversible',
      thumbnail: '/assets/images/product-model5.jpg',
      detailImages: [
        { src: '/assets/images/product5-1.JPG', caption: 'Desain phoenix yang symbolkan kebangkitan' },
        { src: '/assets/images/product5-2.JPG', caption: 'Front view dengan color block dynamic' },
        { src: '/assets/images/product5-3.JPG', caption: 'Detail pattern geometris yang unik' },
        { src: '/assets/images/product5-4.JPG', caption: 'Back view dengan nama dan nomor' },
        { src: '/assets/images/product5-5.JPG', caption: 'Side view dengan dimensional design' }
      ],
      fullDescription: 'Jersey futsal dengan desain phoenix yang inspiratif. Memadukan warna hangat dan energy yang mencerminkan semangat juang yang tak pernah padam.'
    },
    {
      id: 6,
      title: 'Komunitas CB150 Sidoarjo',
      category: 'others',
      description: 'Set jersey training tim',
      thumbnail: '/assets/images/product-model6.jpg',
      detailImages: [
        { src: '/assets/images/product6-1.JPG', caption: 'Desain storm yang powerful dan intense' },
        { src: '/assets/images/product6-2.JPG', caption: 'Front detail dengan gradasi warna dramatic' },
        { src: '/assets/images/product6-3.JPG', caption: 'Pattern zigzag yang dinamis dan energik' },
        { src: '/assets/images/product6-4.JPG', caption: 'Back view dengan branding tim' },
        { src: '/assets/images/product6-5.JPG', caption: 'Detail sleeve dengan trim warna kontras' },
        { src: '/assets/images/product6-6.JPG', caption: 'Full jersey dengan finishing premium' }
      ],
      fullDescription: 'Jersey multi-sport dengan desain storm yang powerful. Cocok untuk berbagai jenis olahraga dengan tampilan yang maskulin dan penuh energy.'
    },
    {
      id: 7,
      title: 'SMAN 4 Surabaya',
      category: 'basketball',
      description: 'Uniform basketball custom',
      thumbnail: '/assets/images/product-model7.jpg',
      detailImages: [
        { src: '/assets/images/product7-1.JPG', caption: 'Jersey basketball dengan desain aggressive' },
        { src: '/assets/images/product7-2.JPG', caption: 'Detail lettering tim yang bold dan jelas' },
        { src: '/assets/images/product7-3.JPG', caption: 'Number font yang modern dan readable' },
        { src: '/assets/images/product7-4.JPG', caption: 'Color combination yang strong dan confident' },
        { src: '/assets/images/product7-5.JPG', caption: 'Back view dengan identity yang kuat' }
      ],
      fullDescription: 'Jersey basketball custom dengan desain aggressive dan confident. Dibuat untuk tim yang dominan di lapangan dengan tampilan yang tidak bisa diabaikan.'
    }
  ];

  // ========================================
  // RENDER PORTFOLIO
  // ========================================
  const portfolioContainer = document.getElementById('portfolioContainer');

  function renderPortfolio(items) {
    if (!portfolioContainer) {
      console.error('Portfolio container not found');
      return;
    }

    portfolioContainer.innerHTML = '';

    items.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'portfolio-item';
      itemDiv.dataset.category = item.category;
      itemDiv.dataset.itemId = item.id;

      const thumbnailImage = item.thumbnail || '/assets/images/placeholder.jpg';

      itemDiv.innerHTML = `
        <div class="portfolio-image">
          <img src="${thumbnailImage}" alt="${item.title}" onerror="this.src='/assets/images/placeholder.jpg'">
          <div class="portfolio-text-overlay">
            <div class="portfolio-item-content">
              <span class="portfolio-category-tag">${item.category}</span>
              <h3 class="portfolio-item-title">${item.title}</h3>
              <p class="portfolio-item-desc">${item.description}</p>
            </div>
          </div>
          <div class="portfolio-overlay">
            <div class="portfolio-overlay-content">
              <p>Lihat Detail</p>
            </div>
          </div>
        </div>
      `;

      // Add click event to open modal
      itemDiv.addEventListener('click', () => openModal(item));

      portfolioContainer.appendChild(itemDiv);
    });
  }

  // Initial render
  renderPortfolio(portfolioItems);

  // ========================================
  // FILTER FUNCTIONALITY
  // ========================================
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Filter items
      const filter = this.dataset.filter;

      if (filter === 'all') {
        renderPortfolio(portfolioItems);
      } else {
        const filteredItems = portfolioItems.filter(item => item.category === filter);
        renderPortfolio(filteredItems);
      }
    });
  });

  // ========================================
  // MODAL FUNCTIONALITY
  // ========================================
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const galleryMainImage = document.getElementById('galleryMainImage');
  const galleryCaption = document.getElementById('galleryCaption');
  const galleryThumbnails = document.getElementById('galleryThumbnails');
  const galleryCounter = document.getElementById('galleryCounter');
  const galleryPrev = document.getElementById('galleryPrev');
  const galleryNext = document.getElementById('galleryNext');

  let currentImages = [];
  let currentImageIndex = 0;

  function openModal(item) {
    if (!modalOverlay) return;

    // Update modal content
    document.getElementById('modalCategory').textContent = item.category;
    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalDescription').textContent = item.description;
    document.getElementById('modalFullDescription').textContent = item.fullDescription;

    // Set gallery images
    currentImages = item.detailImages || [];
    currentImageIndex = 0;

    // Render thumbnails
    renderThumbnails();

    // Show first image
    updateGallery();

    // Show modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;

    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderThumbnails() {
    if (!galleryThumbnails) return;

    galleryThumbnails.innerHTML = '';

    currentImages.forEach((img, index) => {
      const thumb = document.createElement('div');
      thumb.className = 'gallery-thumb' + (index === currentImageIndex ? ' active' : '');
      thumb.innerHTML = `<img src="${img.src}" alt="${img.caption}">`;

      thumb.addEventListener('click', () => {
        currentImageIndex = index;
        updateGallery();
      });

      galleryThumbnails.appendChild(thumb);
    });
  }

  function updateGallery() {
    if (!galleryMainImage || !galleryCaption || !galleryCounter) return;

    const currentImg = currentImages[currentImageIndex];

    galleryMainImage.src = currentImg.src;
    galleryMainImage.alt = currentImg.caption;
    galleryCaption.textContent = currentImg.caption;
    galleryCounter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;

    // Update thumbnails active state
    const thumbs = galleryThumbnails?.querySelectorAll('.gallery-thumb');
    thumbs?.forEach((thumb, index) => {
      if (index === currentImageIndex) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });

    // Update navigation buttons
    if (galleryPrev) {
      galleryPrev.disabled = currentImageIndex === 0;
    }
    if (galleryNext) {
      galleryNext.disabled = currentImageIndex === currentImages.length - 1;
    }
  }

  function showNextImage() {
    if (currentImageIndex < currentImages.length - 1) {
      currentImageIndex++;
      updateGallery();
    }
  }

  function showPrevImage() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      updateGallery();
    }
  }

  // Event listeners
  modalClose?.addEventListener('click', closeModal);

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  galleryPrev?.addEventListener('click', showPrevImage);
  galleryNext?.addEventListener('click', showNextImage);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modalOverlay?.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    }
  });

});
