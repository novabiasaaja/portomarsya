document.addEventListener('DOMContentLoaded', () => {

    // ===== PENTING: PUSAT DATA GALERI (ISI DENGAN 25 FOTO) =====
    const imageData = [
        // Halaman 1
        { src: './images/wedding.jpeg', category: 'pernikahan', title: 'Momen Bahagia 1', description: 'Deskripsi singkat untuk foto ini.' },
        { src: './images/wedding.jpeg', category: 'prewedding', title: 'Senja di Pantai 1', description: 'Deskripsi singkat untuk foto ini.' },
        { src: './images/wedding.jpeg', category: 'lamaran', title: 'Awal Segalanya 1', description: 'Deskripsi singkat untuk foto ini.' },
        { src: './images/wedding.jpeg', category: 'pernikahan', title: 'Ikrar Suci 1', description: 'Deskripsi singkat untuk foto ini.' },
        { src: './images/wedding.jpeg', category: 'prewedding', title: 'Tertawa Bersama 1', description: 'Deskripsi singkat untuk foto ini.' },
        // Halaman 2
        { src: './images/wedding.jpeg', category: 'pernikahan', title: 'Momen Bahagia 2', description: 'Deskripsi singkat untuk foto ini.' },
        { src: './images/wedding.jpeg', category: 'prewedding', title: 'Senja di Pantai 2', description: 'Deskripsi singkat untuk foto ini.' },
        { src: './images/wedding.jpeg', category: 'lamaran', title: 'Awal Segalanya 2', description: 'Deskripsi singkat untuk foto ini.' },
        { src: './images/wedding.jpeg', category: 'pernikahan', title: 'Ikrar Suci 2', description: 'Deskripsi singkat untuk foto ini.' },
        { src: './images/wedding.jpeg', category: 'prewedding', title: 'Tertawa Bersama 2', description: 'Deskripsi singkat untuk foto ini.' },
        // Halaman 3
        { src: './images/wedding.jpeg', category: 'pernikahan', title: 'Momen Bahagia 3', description: 'Deskripsi singkat untuk foto ini.' },
        { src: './images/wedding.jpeg', category: 'prewedding', title: 'Senja di Pantai 3', description: 'Deskripsi singkat untuk foto ini.' },
        { src: './images/wedding.jpeg', category: 'lamaran', title: 'Awal Segalanya 3', description: 'Deskripsi singkat untuk foto ini.' },
        { src: './images/wedding.jpeg', category: 'pernikahan', title: 'Ikrar Suci 3', description: 'Deskripsi singkat untuk foto ini.' },
        { src: './images/wedding.jpeg', category: 'prewedding', title: 'Tertawa Bersama 3', description: 'Deskripsi singkat untuk foto ini.' },
        // Halaman 4
        { src: './images/wedding.jpeg', category: 'pernikahan', title: 'Momen Bahagia 4', description: 'Deskripsi singkat untuk foto ini.' },
        { src: './images/wedding.jpeg', category: 'prewedding', title: 'Senja di Pantai 4', description: 'Deskripsi singkat untuk foto ini.' },
        { src: './images/wedding.jpeg', category: 'lamaran', title: 'Awal Segalanya 4', description: 'Deskripsi singkat untuk foto ini.' },
        { src: './images/wedding.jpeg', category: 'pernikahan', title: 'Ikrar Suci 4', description: 'Deskripsi singkat untuk foto ini.' },
        { src: './images/wedding.jpeg', category: 'prewedding', title: 'Tertawa Bersama 4', description: 'Deskripsi singkat untuk foto ini.' },
        // Halaman 5
        { src: './images/wedding.jpeg', category: 'pernikahan', title: 'Momen Bahagia 5', description: 'Deskripsi singkat untuk foto ini.' },
        { src: './images/wedding.jpeg', category: 'prewedding', title: 'Senja di Pantai 5', description: 'Deskripsi singkat untuk foto ini.' },
        { src: './images/wedding.jpeg', category: 'lamaran', title: 'Awal Segalanya 5', description: 'Deskripsi singkat untuk foto ini.' },
        { src: './images/wedding.jpeg', category: 'pernikahan', title: 'Ikrar Suci 5', description: 'Deskripsi singkat untuk foto ini.' },
        { src: './images/wedding.jpeg', category: 'prewedding', title: 'Tertawa Bersama 5', description: 'Deskripsi singkat untuk foto ini.' },
    ];

    // ===== Inisialisasi Elemen & Variabel Galeri =====
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageIndicator = document.getElementById('page-indicator');
    
    let currentFilter = 'all';
    let imagesPerPage = 5;
    let currentPage = 1;

    // ===== Fungsi untuk Menampilkan Gambar =====
    function renderGallery() {
        const filteredImages = imageData.filter(image => currentFilter === 'all' || image.category === currentFilter);
        const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
        galleryGrid.innerHTML = '';
        const startIndex = (currentPage - 1) * imagesPerPage;
        const endIndex = startIndex + imagesPerPage;
        const imagesToRender = filteredImages.slice(startIndex, endIndex);

        imagesToRender.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item', 'animate-item');
            galleryItem.style.transitionDelay = `${index * 100}ms`;
            galleryItem.innerHTML = `
                <figure>
                    <img src="${image.src}" alt="${image.alt || image.title}" loading="lazy">
                    <figcaption class="gallery-caption">
                        <h3>${image.title}</h3>
                        <p>${image.description}</p>
                    </figcaption>
                </figure>
            `;
            galleryGrid.appendChild(galleryItem);
            fadeInObserver.observe(galleryItem);
        });
        
        pageIndicator.textContent = totalPages > 0 ? `Halaman ${currentPage} / ${totalPages}` : 'Tidak ada foto';
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    }

    // ===== Event Listener untuk Tombol Filter =====
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            currentPage = 1;
            renderGallery();
        });
    });

    // ===== Event Listener untuk Navigasi Halaman =====
    nextBtn.addEventListener('click', () => { currentPage++; renderGallery(); });
    prevBtn.addEventListener('click', () => { currentPage--; renderGallery(); });

    // ===== EFEK ANIMASI PADA SCROLL =====
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-item').forEach(el => fadeInObserver.observe(el));
    
    // ===== EFEK PARALLAX PADA GAMBAR ABOUT ME =====
    const parallaxImage = document.querySelector('.parallax-image');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const elementTop = parallaxImage.parentElement.offsetTop;
        const elementHeight = parallaxImage.parentElement.offsetHeight;
        
        if (scrollPosition > elementTop - window.innerHeight && scrollPosition < elementTop + elementHeight) {
            const movement = (scrollPosition - elementTop) * 0.15; // Sesuaikan angka 0.15 untuk intensitas
            parallaxImage.style.transform = `translateY(${movement}px)`;
        }
    });

    // ===== Panggilan Pertama untuk Mengisi Galeri =====
    renderGallery();
});