// Основные переменные
let currentProgress = 0;
let isLoading = true;
let currentSection = 'market';

// Матричный эффект
function initMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    
    // Установка размеров canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const charArray = chars.split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    // Инициализация капель
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }
    
    function draw() {
        // Полупрозрачный черный для эффекта следа
        ctx.fillStyle = "rgba(10, 10, 10, 0.04)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#00ff9d";
        ctx.font = `${fontSize}px 'JetBrains Mono'`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Случайное обновление позиции
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
}

// Частицы для фона
function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
    
    function createParticle(parent) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайные свойства
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: #00ff9d;
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: floatParticle ${duration}s linear ${delay}s infinite;
        `;
        
        parent.appendChild(particle);
        
        // Удаляем частицу после анимации и создаем новую
        setTimeout(() => {
            particle.remove();
            createParticle(parent);
        }, (duration + delay) * 1000);
    }
}

// Симуляция загрузки
function simulateLoading() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const steps = [
        { percent: 15, text: "Инициализация защищенного соединения..." },
        { percent: 30, text: "Подключение к узлам Tor..." },
        { percent: 50, text: "Установка шифрования AES-256..." },
        { percent: 70, text: "Верификация пользователя..." },
        { percent: 85, text: "Загрузка маркетплейса..." },
        { percent: 100, text: "Готово! Перенаправление..." }
    ];
    
    let currentStep = 0;
    
    function nextStep() {
        if (currentStep < steps.length) {
            const step = steps[currentStep];
            progressFill.style.width = step.percent + '%';
            progressText.textContent = step.text;
            currentStep++;
            
            const delay = currentStep === steps.length ? 1500 : Math.random() * 800 + 400;
            setTimeout(nextStep, delay);
        } else {
            completeLoading();
        }
    }
    
    nextStep();
}

// Завершение загрузки
function completeLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainInterface = document.getElementById('mainInterface');
    
    // Анимация исчезновения
    loadingScreen.style.opacity = '0';
    loadingScreen.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        mainInterface.classList.remove('hidden');
        
        // Инициализация основного интерфейса
        initMainInterface();
    }, 800);
}

// Инициализация основного интерфейса
function initMainInterface() {
    initNavigation();
    initProductFilters();
    initBuyButtons();
    updateMarketStats();
    startLiveUpdates();
}

// Навигация по разделам
function initNavigation() {
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Убираем активный класс у всех элементов
            navItems.forEach(nav => nav.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Добавляем активный класс текущему элементу
            item.classList.add('active');
            
            // Показываем соответствующую секцию
            const sectionId = item.getAttribute('data-section') + 'Section';
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                currentSection = item.getAttribute('data-section');
                
                // Обновляем заголовок
                updateSectionTitle(item.textContent.trim());
            }
        });
    });
}

// Обновление заголовка секции
function updateSectionTitle(title) {
    const titleElement = document.getElementById('sectionTitle');
    titleElement.textContent = title;
}

// Фильтрация продуктов
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            // Фильтрация продуктов
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Кнопки покупки
function initBuyButtons() {
    const buyButtons = document.querySelectorAll('.buy-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            openPurchaseModal(productName);
        });
    });
}

// Модальное окно покупки
function openPurchaseModal(productName) {
    const modal = document.getElementById('purchaseModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Генерация контента модального окна
    modalContent.innerHTML = `
        <div class="purchase-details">
            <div class="product-summary">
                <h3>${productName}</h3>
                <p>Пожалуйста, ознакомьтесь с условиями перед оплатой</p>
            </div>
            
            <div class="delivery-info">
                <h4>📦 Информация о доставке</h4>
                <div class="info-grid">
                    <div class="info-item">
                        <i class="fas fa-clock"></i>
                        <span>Срок доставки: 7-14 дней</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-shield-alt"></i>
                        <span>Степень защиты: Максимальная</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-box"></i>
                        <span>Упаковка: Стелс-упаковка</span>
                    </div>
                </div>
            </div>
            
            <div class="payment-section">
                <h4>💳 Оплата</h4>
                <div class="crypto-address">
                    <label>BTC Address:</label>
                    <div class="address-container">
                        <code id="btcAddress">1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</code>
                        <button class="copy-btn" onclick="copyToClipboard('btcAddress')">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
                <p class="payment-warning">
                    ⚠️ Отправляйте точную сумму! После оплаты закройте эту страницу.
                </p>
            </div>
            
            <div class="contact-section">
                <h4>📞 Поддержка</h4>
                <p>После оплаты используйте этот ID для связи:</p>
                <div class="telegram-id">
                    <code>@shadow_support_bot</code>
                    <button class="copy-btn" onclick="copyToClipboard('telegramId')">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
                <p class="contact-note">
                    Поддержка свяжется с вами в течение часа для подтверждения заказа
                </p>
            </div>
            
            <div class="modal-actions">
                <button class="btn-secondary" onclick="closeModal()">Отмена</button>
                <button class="btn-primary" onclick="confirmPurchase('${productName}')">
                    Подтвердить заказ
                </button>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Подтверждение покупки
function confirmPurchase(productName) {
    // Показываем уведомление о успешном заказе
    showNotification(`Заказ "${productName}" принят в обработку`, 'success');
    closeModal();
    
    // Дополнительные действия можно добавить здесь
    setTimeout(() => {
        showNotification('Ожидайте связи от поддержки в Telegram', 'info');
    }, 2000);
}

// Закрытие модального окна
function closeModal() {
    const modal = document.getElementById('purchaseModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Копирование в буфер обмена
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent || element.innerText;
    
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Скопировано в буфер обмена', 'success');
    }).catch(() => {
        // Fallback для старых браузеров
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Скопировано в буфер обмена', 'success');
    });
}

// Уведомления
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Автоматическое скрытие
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#00ff9d',
        error: '#ff4444',
        warning: '#ffaa00',
        info: '#00ccff'
    };
    return colors[type] || '#00ccff';
}

// Обновление статистики рынка
function updateMarketStats() {
    // Обновление цены BTC
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => response.json())
        .then(data => {
            const price = Math.floor(data.bpi.USD.rate_float);
            document.getElementById('btcPrice').textContent = price.toLocaleString();
        })
        .catch(() => {
            // Fallback цена
            document.getElementById('btcPrice').textContent = '47,231';
        });
    
    // Случайное обновление онлайн пользователей
    updateOnlineUsers();
}

function updateOnlineUsers() {
    const userCountElement = document.getElementById('userCount');
    const current = parseInt(userCountElement.textContent.replace(',', '')) || 1847;
    const change = Math.floor(Math.random() * 50) - 20;
    const newCount = Math.max(1500, current + change);
    userCountElement.textContent = newCount.toLocaleString();
}

// Живые обновления
function startLiveUpdates() {
    // Обновление онлайн пользователей каждые 30 секунд
    setInterval(updateOnlineUsers, 30000);
    
    // Обновление цены BTC каждые 2 минуты
    setInterval(updateMarketStats, 120000);
    
    // Случайные уведомления системы
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% шанс
            const messages = [
                "Система безопасности обновлена",
                "Новые товары добавлены в каталог",
                "Проведено техническое обслуживание",
                "Улучшена производительность сети"
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            showNotification(randomMessage, 'info');
        }
    }, 60000);
}

// CSS анимации для уведомлений
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes floatParticle {
        0% { transform: translateY(0) rotate(0deg); opacity: 0; }
        10% { opacity: 0.3; }
        90% { opacity: 0.1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content i {
        font-size: 1.2em;
    }
`;
document.head.appendChild(notificationStyles);

// Дополнительные CSS стили для модального окна
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .purchase-details {
        display: flex;
        flex-direction: column;
        gap: 25px;
    }
    
    .product-summary h3 {
        color: #00ff9d;
        margin-bottom: 5px;
        font-size: 1.3em;
    }
    
    .product-summary p {
        opacity: 0.8;
        font-size: 0.9em;
    }
    
    .delivery-info h4,
    .payment-section h4,
    .contact-section h4 {
        color: #00ccff;
        margin-bottom: 15px;
        font-size: 1.1em;
    }
    
    .info-grid {
        display: grid;
        gap: 10px;
    }
    
    .info-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 12px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 6px;
        font-size: 0.9em;
    }
    
    .info-item i {
        color: #00ff9d;
        width: 16px;
    }
    
    .crypto-address {
        margin-bottom: 15px;
    }
    
    .crypto-address label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #00ff9d;
    }
    
    .address-container {
        display: flex;
        align-items: center;
        gap: 10px;
        background: rgba(0, 0, 0, 0.3);
        padding: 12px 15px;
        border-radius: 8px;
        border: 1px solid rgba(0, 255, 157, 0.3);
    }
    
    .address-container code {
        flex: 1;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9em;
        word-break: break-all;
    }
    
    .copy-btn {
        background: rgba(0, 255, 157, 0.2);
        border: 1px solid rgba(0, 255, 157, 0.5);
        color: #00ff9d;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .copy-btn:hover {
        background: rgba(0, 255, 157, 0.3);
        transform: scale(1.05);
    }
    
    .payment-warning {
        background: rgba(255, 68, 68, 0.1);
        border: 1px solid rgba(255, 68, 68, 0.3);
        padding: 12px 15px;
        border-radius: 8px;
        font-size: 0.9em;
        color: #ff4444;
    }
    
    .telegram-id {
        display: flex;
        align-items: center;
        gap: 10px;
        background: rgba(0, 204, 255, 0.1);
        padding: 12px 15px;
        border-radius: 8px;
        margin: 10px 0;
        border: 1px solid rgba(0, 204, 255, 0.3);
    }
    
    .telegram-id code {
        flex: 1;
        font-family: 'JetBrains Mono', monospace;
        color: #00ccff;
    }
    
    .contact-note {
        font-size: 0.85em;
        opacity: 0.8;
        font-style: italic;
    }
    
    .modal-actions {
        display: flex;
        gap: 15px;
        justify-content: flex-end;
        margin-top: 20px;
    }
    
    .btn-primary {
        background: linear-gradient(135deg, #00ff9d, #00ccff);
        color: #0a0a0a;
        border: none;
        padding: 12px 25px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 255, 157, 0.4);
    }
    
    .btn-secondary {
        background: rgba(255, 255, 255, 0.1);
        color: #e0e0e0;
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 12px 25px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(modalStyles);

// Инициализация при загрузке страницы даркнета
if (document.getElementById('matrixCanvas')) {
    document.addEventListener('DOMContentLoaded', function() {
        initMatrix();
        initParticles();
        simulateLoading();
        
        // Закрытие модального окна по клику вне его
        document.addEventListener('click', (e) => {
            if (e.target.id === 'purchaseModal') {
                closeModal();
            }
        });
        
        // Закрытие модального окна по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    });
}

// Для страницы кафе
if (document.getElementById('accessCode')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Добавляем анимацию появления элементов
        const animatedElements = document.querySelectorAll('.cafe-header, .cafe-nav, .hero-section, .access-section');
        animatedElements.forEach((element, index) => {
            element.style.animation = `fadeIn 0.8s ease ${index * 0.2}s both`;
        });
    });
}
