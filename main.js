console.log('MAIN.JS is loading!');
/* ==========================================
   YALOVA ÜNİVERSİTESİ - main.js
   Bootstrap 5 Uyumlu
   ========================================== */

(function () {
    'use strict';

    const navbar      = document.getElementById('navbar');
    const searchBtn   = document.getElementById('searchBtn');
    const searchPanel = document.getElementById('searchPanel');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    const slides      = document.querySelectorAll('.slide');
    const dots        = document.querySelectorAll('.dot');
    const sliderPrev  = document.getElementById('sliderPrev');
    const sliderNext  = document.getElementById('sliderNext');
    const progressBar = document.getElementById('sliderProgressBar');

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
       HERO SLIDER
       ==================================================== */
    let current = 0;
    const total = slides.length;
    const DURATION = 6000;
    let autoTimer = null;

    function goTo(index) {
        if(total === 0) return;
        index = ((index % total) + total) % total;

        slides[current].classList.remove('active');
        slides[current].setAttribute('aria-hidden', 'true');
        dots[current] && dots[current].classList.remove('active');
        dots[current] && dots[current].setAttribute('aria-selected', 'false');

        current = index;

        slides[current].classList.add('active');
        slides[current].setAttribute('aria-hidden', 'false');
        dots[current] && dots[current].classList.add('active');
        dots[current] && dots[current].setAttribute('aria-selected', 'true');

        startProgress();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startProgress() {
        clearTimeout(autoTimer);
        if (progressBar) {
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
            void progressBar.offsetWidth; // reflow
            progressBar.style.transition = `width ${DURATION}ms linear`;
            progressBar.style.width = '100%';
        }
        autoTimer = setTimeout(next, DURATION);
    }

    /* Oklar */
    sliderNext && sliderNext.addEventListener('click', () => { clearTimeout(autoTimer); next(); });
    sliderPrev && sliderPrev.addEventListener('click', () => { clearTimeout(autoTimer); prev(); });

    /* Dots */
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            if (i !== current) { clearTimeout(autoTimer); goTo(i); }
        });
    });

    /* Klavye navigasyonu */
    const heroSlider = document.getElementById('heroSlider');
    if (heroSlider) {
        heroSlider.setAttribute('tabindex', '0');
        heroSlider.addEventListener('keydown', e => {
            if (e.key === 'ArrowRight') { clearTimeout(autoTimer); next(); }
            if (e.key === 'ArrowLeft')  { clearTimeout(autoTimer); prev(); }
        });

        /* Touch/swipe */
        let touchStartX = 0;
        heroSlider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
        heroSlider.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) { clearTimeout(autoTimer); diff > 0 ? next() : prev(); }
        }, { passive: true });

        /* Hover'da durdur */
        heroSlider.addEventListener('mouseenter', () => {
            clearTimeout(autoTimer);
            if (progressBar) { progressBar.style.transition = 'none'; }
        });
        heroSlider.addEventListener('mouseleave', () => startProgress());
    }

    /* Başlat */
    if (slides.length > 0) {
        slides[0].classList.add('active');
        dots[0] && dots[0].classList.add('active');
        startProgress();
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

    /* ====================================================
       FLOATING CHATBOT
       ==================================================== */
    const chatbotBtn = document.getElementById('chatbotBtn');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');

    if (chatbotBtn && chatbotWindow && chatbotClose) {
        chatbotBtn.addEventListener('click', () => {
            chatbotWindow.classList.toggle('show');
            // �konu de�i�tir
            if (chatbotWindow.classList.contains('show')) {
                chatbotBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                chatbotBtn.innerHTML = '<i class="fas fa-comment-dots"></i>';
            }
        });

        chatbotClose.addEventListener('click', () => {
            chatbotWindow.classList.remove('show');
            chatbotBtn.innerHTML = '<i class="fas fa-comment-dots"></i>';
        });
    }

})();


/* ====================================================
   SCROLL REVEAL (A�a�� Kayd�r�rken Ge�i� Efektleri)
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



/* ====================================================
   CHAT BOT LOGIC
   ==================================================== */
console.log('Chatbot loaded!');


    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotBody = document.getElementById('chatbotBody');

    // Mesaj Ekleme Fonksiyonu
    function addMessage(text, isUser = false) {
        // Eğer seçenekler varsa kaldır
        const options = document.querySelector('.chat-options');
        if (options && isUser) {
            options.style.display = 'none';
        }

        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message ' + (isUser ? 'user-message' : 'bot-message');
        msgDiv.textContent = text;
        
        if (isUser) {
            msgDiv.style.background = 'var(--yu-teal)';
            msgDiv.style.color = '#fff';
            msgDiv.style.marginLeft = 'auto';
            msgDiv.style.borderBottomRightRadius = '4px';
            msgDiv.style.borderBottomLeftRadius = '12px';
            msgDiv.style.border = 'none';
            msgDiv.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }

        chatbotBody.appendChild(msgDiv);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    // Mesaj Gönderme
    function sendMessage() {
        const text = chatbotInput.value.trim();
        if (text) {
            addMessage(text, true);
            chatbotInput.value = '';
            
            // Cevap simülasyonu
            setTimeout(() => {
                addMessage("Bu bir demo yanıtıdır. Şu an yapay zeka entegrasyonu aktif değil ancak arayüz başarıyla çalışıyor! 🚀");
            }, 1000);
        }
    }

    if (chatbotSend && chatbotInput) {
        chatbotSend.addEventListener('click', sendMessage);
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Hazır Seçeneklere Tıklama
    const optionBtns = document.querySelectorAll('.chat-option-btn');
    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            chatbotInput.value = btn.textContent;
            sendMessage();
        });
    });
