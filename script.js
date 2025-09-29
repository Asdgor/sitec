// Основная логика даркнет-платформы

let currentUser = null;

// Показать подключение Tor
function showTorConnection() {
    document.getElementById('welcome').classList.add('hidden');
    document.getElementById('tor-connection').classList.remove('hidden');
}

// Показать маркетплейс
function showMarketplace() {
    document.getElementById('tor-connection').classList.add('hidden');
    document.getElementById('marketplace').classList.remove('hidden');
    updateMarketStats();
    setupNavigation();
    setupOrderButtons();
}

// Обновление статистики
function updateMarketStats() {
    // Обновляем BTC цену
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => response.json())
        .then(data => {
            const price = Math.floor(data.bpi.USD.rate_float);
            document.getElementById('btcPrice').textContent = price.toLocaleString();
        })
        .catch(() => {
            document.getElementById('btcPrice').textContent = '47,231';
        });

    // Обновляем онлайн пользователей
    setInterval(() => {
        const userCount = document.getElementById('userCount');
        const current = parseInt(userCount.textContent.replace(',', ''));
        const change = Math.floor(Math.random() * 50) - 20;
        const newCount = Math.max(1500, current + change);
        userCount.textContent = newCount.toLocaleString();
    }, 30000);
}

// Навигация по категориям
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const categoryContents = document.querySelectorAll('.category-content');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            button.classList.add('active');
            
            // Прячем все категории
            categoryContents.forEach(content => content.classList.add('hidden'));
            
            // Показываем выбранную категорию
            const category = button.dataset.category;
            document.getElementById(`${category}-content`).classList.remove('hidden');
        });
    });
}

// Кнопки заказа
function setupOrderButtons() {
    const orderButtons = document.querySelectorAll('.order-btn');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.dataset.product;
            openOrderModal(productName);
        });
    });
}

// Открыть модальное окно заказа
function openOrderModal(productName) {
    document.getElementById('productName').textContent = productName;
    document.getElementById('orderModal').classList.remove('hidden');
}

// Закрыть модальное окно
function closeOrderModal() {
    document.getElementById('orderModal').classList.add('hidden');
    // Показываем сообщение о успешном "заказе"
    alert('Заказ принят. Закройте страницу и ожидайте связи в Telegram в течение часа.');
}

// Закрытие модального окна по клику вне его
document.addEventListener('click', (event) => {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        closeOrderModal();
    }
});

// Блокировка специальных услуг
function setupSpecialServices() {
    const specialButtons = document.querySelectorAll('.locked-btn');
    
    specialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const password = prompt('Введите код доступа уровня 3:');
            if (password) {
                alert('Неверный код доступа. Доступ запрещен.');
            }
        });
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('marketplace')) {
        setupSpecialServices();
    }
});
