(function() {
    'use strict';
/* ====================================================
   ERİŞİLEBİLİRLİK (A11Y) MENÜ LOGIC
   ==================================================== */
    const a11yBtn = document.getElementById('a11yBtn');
    const a11yWindow = document.getElementById('a11yWindow');
    const a11yClose = document.getElementById('a11yClose');
    
    if(a11yBtn && a11yWindow) {
        a11yBtn.addEventListener('click', () => {
            a11yWindow.classList.toggle('show');
        });
        
        if(a11yClose) {
            a11yClose.addEventListener('click', () => {
                a11yWindow.classList.remove('show');
            });
        }
    }

    const btnTextInc = document.getElementById('a11y-text-inc');
    const btnContrast = document.getElementById('a11y-contrast');
    const btnGrayscale = document.getElementById('a11y-grayscale');
    const btnLinks = document.getElementById('a11y-links');
    const btnReset = document.getElementById('a11y-reset');

    if(btnTextInc) {
        btnTextInc.addEventListener('click', function() {
            this.classList.toggle('active');
            document.documentElement.classList.toggle('a11y-large-text');
        });
    }

    if(btnContrast) {
        btnContrast.addEventListener('click', function() {
            this.classList.toggle('active');
            document.body.classList.toggle('a11y-high-contrast');
        });
    }

    if(btnGrayscale) {
        btnGrayscale.addEventListener('click', function() {
            this.classList.toggle('active');
            document.body.classList.toggle('a11y-grayscale');
        });
    }

    if(btnLinks) {
        btnLinks.addEventListener('click', function() {
            this.classList.toggle('active');
            document.body.classList.toggle('a11y-highlight-links');
        });
    }

    if(btnReset) {
        btnReset.addEventListener('click', function() {
            document.documentElement.classList.remove('a11y-large-text');
            document.body.classList.remove('a11y-high-contrast', 'a11y-grayscale', 'a11y-highlight-links');
            
            document.querySelectorAll('.a11y-option').forEach(btn => btn.classList.remove('active'));
        });
    }

})();