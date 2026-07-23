(function() {
    'use strict';
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

})();