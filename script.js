document.addEventListener('DOMContentLoaded', () => {

    // --- Бургер-меню ---
    const burgerMenu = document.getElementById('burger-menu');
    const navMenu = document.querySelector('.nav-menu');

    burgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // --- Анимация появления секций при скролле ---
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Обработка контактной формы (Web3Forms) ---
    const form = document.getElementById('contact-form');
    const formResult = document.getElementById('form-result');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        const json = JSON.stringify(object);
        
        formResult.innerHTML = "Отправка...";
        formResult.style.color = "#a0a0a0";

        fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let jsonResponse = await response.json();
                if (response.status == 200) {
                    formResult.innerHTML = "Сообщение успешно отправлено!";
                    formResult.style.color = "#00d26a";
                } else {
                    console.log(response);
                    formResult.innerHTML = jsonResponse.message;
                    formResult.style.color = "#ff4d4d";
                }
            })
            .catch(error => {
                console.log(error);
                formResult.innerHTML = "Что-то пошло не так. Попробуйте снова.";
                formResult.style.color = "#ff4d4d";
            })
            .then(function() {
                form.reset();
                setTimeout(() => {
                    formResult.innerHTML = '';
                }, 5000);
            });
    });

});
