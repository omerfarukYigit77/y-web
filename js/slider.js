(function() {
    'use strict';
    const slides      = document.querySelectorAll('.slide');
    const dots        = document.querySelectorAll('.dot');
    const sliderPrev  = document.getElementById('sliderPrev');
    const sliderNext  = document.getElementById('sliderNext');
    const progressBar = document.getElementById('sliderProgressBar');
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

})();