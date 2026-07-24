(function() {
    'use strict';
    const navbar      = document.getElementById('navbar');
    const searchBtn   = document.getElementById('searchBtn');
    const searchPanel = document.getElementById('searchPanel');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    /* ====================================================
       SCROLL → Transparent ↔ Beyaz Navbar
       ==================================================== */
    function onScroll() {
        const scrolled = window.scrollY > 50;
        navbar && navbar.classList.toggle('scrolled', scrolled);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ====================================================
       MOBİL MEGA MENU TOGGLE (Bootstrap collapse içinde)
       ==================================================== */
    document.querySelectorAll('.has-mega > .nav-link').forEach(link => {
        link.addEventListener('click', e => {
            if (window.innerWidth < 1200) { // xl breakpoint
                e.preventDefault();
                const parent = link.closest('.has-mega');
                // Diğerlerini kapat
                document.querySelectorAll('.has-mega').forEach(item => {
                    if (item !== parent) item.classList.remove('show');
                });
                parent.classList.toggle('show');
            }
        });
    });

    /* ====================================================
       MOBİL ALT MENÜ (SUBMENU) TOGGLE
       ==================================================== */
    document.querySelectorAll('.has-submenu > a').forEach(link => {
        link.addEventListener('click', e => {
            if (window.innerWidth < 1200) {
                e.preventDefault();
                e.stopPropagation(); // Üst menü (mega-menu) kapanmasın diye
                const parent = link.parentElement;
                parent.classList.toggle('open');
            }
        });
    });

    /* ====================================================
       ARAMA PANELİ
       ==================================================== */
    if (searchBtn && searchPanel && searchClose && searchInput) {
        searchBtn.addEventListener('click', () => {
            const open = searchPanel.classList.toggle('open');
            if (open) setTimeout(() => searchInput.focus(), 120);
        });
        searchClose.addEventListener('click', () => searchPanel.classList.remove('open'));
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') searchPanel.classList.remove('open');
        });
    }

    /* ====================================================
       RESIZE Temizlik
       ==================================================== */
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1200) {
            document.querySelectorAll('.has-mega').forEach(item => item.classList.remove('show'));
        }
    });
    /* ====================================================
       COUNTER ANİMASYONU (Sayılarla Üniversitemiz)
       ==================================================== */
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current).toLocaleString('tr-TR');
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target.toLocaleString('tr-TR');
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    /* ====================================================
       GALERİ LİGHTBOX ANİMASYONU
       ==================================================== */
    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal) {
        galleryModal.addEventListener('show.bs.modal', function (event) {
            const triggerElement = event.relatedTarget;
            const imgSrc = triggerElement.getAttribute('data-img-src');
            const modalImg = galleryModal.querySelector('#galleryModalImg');
            modalImg.src = imgSrc;
        });
    }

    // ============================================================
    // DUYURU POPUP (MODAL) OTOMATİK GÖSTERİM
    // ============================================================
    const announcementModalElement = document.getElementById('announcementModal');
    if (announcementModalElement) {
        // Sadece anasayfada açılması için kontrol
        const path = window.location.pathname;
        const isHomePage = path.endsWith('/') || path.endsWith('index.html');
        
        if (isHomePage) {
            const announcementModal = new bootstrap.Modal(announcementModalElement);
            // Sayfa yüklendikten 1 saniye sonra göster
            setTimeout(() => {
                announcementModal.show();
            }, 1000);
        }
    }

/* ====================================================
   SCROLL REVEAL (Aa Kaydrrken Gei Efektleri)
   ==================================================== */
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // G�r�ld�kten sonra tekrar animasyon olmamas� i�in observer'dan ��kar
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Eleman�n %15'i g�r�nd���nde tetikle
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

// Sayfa y�klendi�inde ve scroll olaylar�nda �al��t�r
document.addEventListener('DOMContentLoaded', revealOnScroll);
})();