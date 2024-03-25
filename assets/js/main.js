"use strict";

const SLEEPING = "💤 Sleeping...";
const BUSY = "⚠️ Busy. ⛔ Do Not Disturb";
const AVAILABLE = "✅ Available for messaging, calls will be declined 📵";
const WEEKEND = "✨ On a weekend. 📳 Enjoying real life 🏞️";
const HOLIDAY = "🎉 It's a holiday! 🛫 Unavailable today, enjoying a great time with my family 👨‍👩‍👧‍👦️";
const translations = {
    en: {
        pageTitle: "rakin.tech | Ilia Rakin",
        greeting: "👋 Hello!",
        homepageText: "This is the homepage of Ilia Rakin.",
        currentStatusText: "Right now I’m: ⏳ Checking the schedule...",
        contactMeTitle: "💬 Contact Me",
        gmailContact: "📩 Gmail:",
        corporateContact: "🎓 Corporate:",
        telegramContact: "📩 Telegram (Business related issues ONLY):",
        seeAlsoTitle: "👀 See Also",
        footerText: "Rakin Ilia",
        inspirationText: "Inspired by 🇵🇱 Teris Labendszki & 🇺🇦 Stepan Tikunov",
    },
    fr: {
        pageTitle: "rakin.tech | Ilia Rakin",
        greeting: "👋 Bonjour!",
        homepageText: "Voici la page d'accueil d'Ilia Rakin.",
        currentStatusText: "En ce moment, je suis : ⏳ En train de vérifier l'agenda...",
        contactMeTitle: "💬 Contactez-moi",
        gmailContact: "📩 Gmail:,
        corporateContact: "🎓 Corporate:",
        telegramContact: "📩 Telegram (Uniquement pour les questions professionnelles):",
        seeAlsoTitle: "👀 Voir également",
        footerText: "Rakin Ilia",
        inspirationText: "Inspiré par 🇵🇱 Teris Labendszki & 🇺🇦 Stepan Tikunov",
    },
    es: {
        pageTitle: "rakin.tech | Ilia Rakin",
        greeting: "👋 ¡Hola!",
        homepageText: "Esta es la página de inicio de Ilia Rakin.",
        currentStatusText: "Ahora mismo estoy: ⏳ Revisando el calendario...",
        contactMeTitle: "💬 Contáctame",
        gmailContact: "📩 Gmail:",
        corporateContact: "🎓 Corporativo:",
        telegramContact: "📩 Telegram (Solo para asuntos de negocios):",
        seeAlsoTitle: "👀 Ver también",
        footerText: "Rakin Ilia",
        inspirationText: "Inspirado por 🇵🇱 Teris Labendszki & 🇺🇦 Stepan Tikunov",
    },
    ar: {
        pageTitle: "rakin.tech | إيليا راكين",
        greeting: "👋 مرحبا!",
        homepageText: "هذه هي الصفحة الرئيسية لإيليا راكين.",
        currentStatusText: "في الوقت الحالي أنا: ⏳ أتحقق من الجدول الزمني...",
        contactMeTitle: "💬 اتصل بي",
        gmailContact: "📩 Gmail:",
        corporateContact: "🎓 الشركات:",
        telegramContact: "📩 تلغرام (فقط للمسائل المتعلقة بالأعمال):",
        seeAlsoTitle: "👀 انظر أيضا",
        footerText: "راكين إيليا",
        inspirationText: "مستوحى من 🇵🇱 تيريس لابيندزكي & 🇺🇦 ستيبان تيكونوف",
    },
    de: {
        pageTitle: "rakin.tech | Ilia Rakin",
        greeting: "👋 Hallo!",
        homepageText: "Dies ist die Startseite von Ilia Rakin.",
        currentStatusText: "Im Moment bin ich: ⏳ Beim Überprüfen meines Zeitplans...",
        contactMeTitle: "💬 Kontaktiere mich",
        gmailContact: "📩 Gmail:",
        corporateContact: "🎓 Firmen:",
        telegramContact: "📩 Telegram (Nur für geschäftliche Angelegenheiten): @xhackerino",
        seeAlsoTitle: "👀 Siehe auch",
        footerText: "Rakin Ilia",
        inspirationText: "Inspiriert von 🇵🇱 Teris Labendszki & 🇺🇦 Stepan Tikunov",
    },
    ru: {
        pageTitle: "rakin.tech | Илья Ракин",
        greeting: "👋 Привет!",
        homepageText: "Это визитная карточка Ильи Ракина.",
        currentStatusText: "Сейчас я: ⏳ Проверяю расписание...",
        contactMeTitle: "💬 Связаться со мной",
        gmailContact: "📩 Почта Гугл:",
        corporateContact: "🎓 Корпоративная:",
        telegramContact: "📩 Телеграмм (Только для деловых вопросов):",
        seeAlsoTitle: "👀 Смотрите также",
        footerText: "Ракин Илья",
        inspirationText: "Вдохновлялся 🇵🇱 Терисом Лабендзки и 🇺🇦 Степаном Тикуновым",
    }
    };

document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language-select');
    const yearSpan = document.getElementById('year');

    yearSpan.textContent = new Date().getFullYear();

    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        translatePage(selectedLanguage);
        localStorage.setItem('selectedLanguage', selectedLanguage);
        adjustLayoutForRTL(selectedLanguage);
    });

    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    languageSelect.value = savedLanguage;
    translatePage(savedLanguage);
    adjustLayoutForRTL(savedLanguage);

    initCopyToClipboard();
    initBannerToggle();
    initStatusUpdate();

    function translatePage(lang) {
            for (const key in translations[lang]) {
                const element = document.getElementById(key);
                if (element) {
                    element.textContent = translations[lang][key];
                }
            }
        }

        function adjustLayoutForRTL(lang) {
            document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        }

        function initCopyToClipboard() {
            document.querySelectorAll('.copy').forEach(element => {
                element.addEventListener('click', () => {
                    navigator.clipboard.writeText(element.textContent.trim()).then(() => {
                        showPopup("Address copied to clipboard!");
                    }, () => {
                        showPopup("Failed to copy address.", true);
                    });
                });
            });
        }

        function initBannerToggle() {
            const banner = document.querySelector('.banner');
            const bannerButton = document.querySelector('.show-banner');
            bannerButton.addEventListener('click', () => banner.classList.toggle('show'));
            banner.addEventListener('click', event => {
                if (event.target === banner) {
                    banner.classList.remove('show');
                }
            });
        }

        function showPopup(content, isError = false, durationMs = 3000) {
            const popup = document.querySelector(".popup");
            const popupText = document.querySelector(".popup-text");
            popupText.textContent = content;
            popup.classList.toggle("error", isError);
            popup.classList.add("show");
            setTimeout(() => popup.classList.remove("show"), durationMs);
        }

        function initStatusUpdate() {
            updateStatus();
            setInterval(updateStatus, 60000); // Update every minute
        }

    function updateStatus() {
        const now = new Date();
        const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
        const hour = now.getHours(); // 0 to 23
        const month = now.getMonth(); // 0 (January) to 11 (December)
        const date = now.getDate(); // 1 to 31

        // Example holiday: January 1st
        const isHoliday = (month === 0 && date === 1);

        let currentStatusMessage = AVAILABLE; // Default status

        if (isHoliday) {
            currentStatusMessage = HOLIDAY;
        } else if (day === 0 || day === 6) {
            currentStatusMessage = WEEKEND;
        } else if (hour < 8 || hour >= 17) {
            currentStatusMessage = SLEEPING;
        } else {
            currentStatusMessage = BUSY;
        }

        const statusContainer = document.getElementById("status");
        if (statusContainer) {
            statusContainer.textContent = currentStatusMessage;
        }
    }
});
