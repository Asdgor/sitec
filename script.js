// Главные переменные
let currentStage = 0;
let traceInterval;
let heartbeatInterval;
let isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Звуковые эффекты (используем базовые, если нет файлов)
const sounds = {
    static: document.getElementById('staticSound'),
    heartbeat: document.getElementById('heartbeatSound')
};

// Имитация реального BTC курса
async function updateBtcPrice() {
    try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        const data = await response.json();
        const price = Math.floor(data.bpi.USD.rate_float);
        document.getElementById('btcPrice').textContent = price.toLocaleString();
    } catch (error) {
        document.getElementById('btcPrice').textContent = '45,231';
    }
}

// Определение местоположения (фейковое)
function getFakeLocation() {
    const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань'];
    return cities[Math.floor(Math.random() * cities.length)];
}

// Запуск симуляции подключения к Tor
function startTorSimulation() {
    setTimeout(() => {
        document.querySelector('.input-section').classList.remove('hidden');
        document.getElementById('passwordInput').focus();
        
        // Показываем мобильное предупреждение если нужно
        if (isMobile) {
            setTimeout(() => {
                document.querySelector('.mobile-warning').classList.remove('hidden');
                document.getElementById('locationText').textContent = getFakeLocation();
            }, 2000);
        }
    }, 7000);
}

// Обработка ввода пароля
function handlePasswordInput() {
    const passwordInput = document.getElementById('passwordInput');
    
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const password = this.value;
            if (password.length > 0) {
                // Запускаем "взлом"
                grantAccess();
            }
        }
    });
}

// Доступ получен - показываем каталог
function grantAccess() {
    // Проигрываем звук статики
    playSound(sounds.static);
    
    // Показываем сообщение о успешном входе
    const output = document.querySelector('.output');
    const accessLine = document.createElement('div');
    accessLine.className = 'line green-text';
    accessLine.textContent = 'ACCESS GRANTED - WELCOME TO THE SHADOW MARKET';
    accessLine.style.opacity = '0';
    output.appendChild(accessLine);
    
    setTimeout(() => {
        accessLine.style.opacity = '1';
        
        // Прячем терминал и показываем каталог
        setTimeout(() => {
            document.querySelector('.terminal').classList.add('hidden');
            document.querySelector('.catalog').classList.remove('hidden');
            
            // Запускаем страшные фичи
            startScaryFeatures();
            updateBtcPrice();
            setupPanicButton();
        }, 2000);
    }, 100);
}

// Запуск страшных фич
function startScaryFeatures() {
    // Случайные федеральные предупреждения
    setTimeout(showFederalAlert, 15000);
    
    // Сердцебиение
    heartbeatInterval = setInterval(() => {
        playSound(sounds.heartbeat);
    }, 30000);
    
    // Случайные глитчи
    setInterval(() => {
        if (Math.random() < 0.3) {
            triggerRandomGlitch();
        }
    }, 10000);
}

// Федеральное предупреждение
function showFederalAlert() {
    const alert = document.getElementById('federalAlert');
    const tracePercent = document.getElementById('tracePercent');
    
    alert.classList.remove('hidden');
    
    let percent = 0;
    traceInterval = setInterval(() => {
        percent += Math.floor(Math.random() * 10) + 5;
        if (percent >= 100) {
            percent = 100;
            tracePercent.textContent = percent;
            
            // Финальное сообщение
            setTimeout(() => {
                alert.querySelector('.alert-content').innerHTML = `
                    <div class="red-text">[FEDERAL TRACE COMPLETE]</div>
                    <div>LOCATION COMPROMISED</div>
                    <div>CONNECTION TERMINATED</div>
                `;
                
                setTimeout(showDisclaimer, 3000);
            }, 1000);
            
            clearInterval(traceInterval);
        } else {
            tracePercent.textContent = percent;
        }
    }, 800);
}

// Случайные глитч-эффекты
function triggerRandomGlitch() {
    const items = document.querySelectorAll('.item-title');
    const randomItem = items[Math.floor(Math.random() * items.length)];
    
    randomItem.classList.add('glitch');
    setTimeout(() => {
        randomItem.classList.remove('glitch');
    }, 500);
}

// Кнопка паники
function setupPanicButton() {
    const panicBtn = document.getElementById('panicBtn');
    
    panicBtn.addEventListener('click', function() {
        // Первое нажатие - не работает
        if (!this.dataset.attempts) {
            this.dataset.attempts = '1';
            this.textContent = '🚨 SYSTEM LOCKED';
            this.style.background = '#ff0000';
            
            // Показываем сообщение
            const fakeMessage = document.createElement('div');
            fakeMessage.className = 'line red-text';
            fakeMessage.textContent = 'EMERGENCY PROTOCOL DISABLED BY ADMIN';
            document.querySelector('.catalog').insertBefore(fakeMessage, document.querySelector('.panic-section'));
            
            // Второе нажатие - показываем дисклеймер
        } else {
            showDisclaimer();
        }
    });
}

// Проигрывание звука
function playSound(sound) {
    if (sound && typeof sound.play === 'function') {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Audio play failed:', e));
    }
}

// Показ дисклеймера (концовка)
function showDisclaimer() {
    // Очищаем все интервалы
    clearInterval(traceInterval);
    clearInterval(heartbeatInterval);
    
    // Прячем всё и показываем дисклеймер
    document.querySelector('.terminal').classList.add('hidden');
    document.querySelector('.catalog').classList.add('hidden');
    document.querySelector('.alert').classList.add('hidden');
    
    document.querySelector('.disclaimer').classList.remove('hidden');
    
    // Кнопка закрытия
    document.getElementById('closeBtn').addEventListener('click', function() {
        document.querySelector('.disclaimer').classList.add('hidden');
    });
}

// Обработка мобильного предупреждения
function setupMobileWarning() {
    const proceedBtn = document.getElementById('proceedBtn');
    
    proceedBtn.addEventListener('click', function() {
        document.querySelector('.mobile-warning').classList.add('hidden');
        document.querySelector('.input-section').classList.remove('hidden');
        document.getElementById('passwordInput').focus();
    });
}

// Фильтрация товаров
function setupCategoryFilter() {
    const catButtons = document.querySelectorAll('.cat-btn');
    
    catButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Обновляем активную кнопку
            catButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.cat;
            const items = document.querySelectorAll('.item');
            
            items.forEach(item => {
                if (category === 'all' || item.dataset.cat === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    startTorSimulation();
    handlePasswordInput();
    setupMobileWarning();
    setupCategoryFilter();
    
    // Обновляем количество пользователей
    setInterval(() => {
        const userCount = document.getElementById('userCount');
        const current = parseInt(userCount.textContent.replace(',', ''));
        const change = Math.floor(Math.random() * 50) - 25;
        const newCount = Math.max(1000, current + change);
        userCount.textContent = newCount.toLocaleString();
    }, 15000);
});
