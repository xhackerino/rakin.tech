"use strict";

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
    languageSelect.addEventListener('change', handleLanguageChange);

    function handleLanguageChange() {
        const selectedLanguage = this.value;
        translatePage(selectedLanguage);
        localStorage.setItem('selectedLanguage', selectedLanguage);

        // Adjust layout for RTL languages like Arabic
        document.body.setAttribute('dir', selectedLanguage === 'ar' ? 'rtl' : 'ltr');
    }
    
    function translatePage(lang) {
            for (const key in translations[lang]) {
                const element = document.getElementById(key);
                if (element) {
                    element.textContent = translations[lang][key];
                }
            }
        }
    
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    document.getElementById('language-select').value = savedLanguage;
    translatePage(savedLanguage);
    document.body.setAttribute('dir', savedLanguage === 'ar' ? 'rtl' : 'ltr');
});

// Apply the translation based on saved preference or default language
window.onload = () => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Default to English if no preference is saved
    document.getElementById('language-select').value = savedLanguage;
    translatePage(savedLanguage);

    // Adjust layout for RTL languages like Arabic, based on the saved preference
    if (savedLanguage === 'ar') {
        document.body.setAttribute('dir', 'rtl');
    } else {
        document.body.setAttribute('dir', 'ltr');
    }
};

const showPopup = (() => {
    let timeoutId = null;
    const popup = document.querySelector(".popup");
    const popupText = document.querySelector(".popup-text");

    const animation = [
        { opacity: 1, offset: 0 },
        { opacity: 0, offset: 0.4 },
        { opacity: 0, offset: 0.6 },
        { opacity: 1, offset: 1 },  
    ];

    const sleep = async (ms) => new Promise(resolve => {
        setTimeout(resolve, ms);
    });

    return async (content, isError = false, durationMs = 3000) => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
            popupText.animate(animation, 300);
            await sleep(150);
        }

        popupText.textContent = content;

        if (isError) {
            popup.classList.add("error");
        } else {
            popup.classList.remove("error");
        }

        await sleep(10);

        popup.classList.add("show");

        timeoutId = setTimeout(() => popup.classList.remove("show"), durationMs);
    }
})();

const now = () => new Date();

const range = (start, end, base, value) => {
    const keys = Array.from(
        { length: end - start + 1 },
        (_, i) => (start + i) % base
    );

    return keys.reduce(
        (acc, cur) => ({ ...acc, [cur]: value }),
        {}
    );
}

const SLEEPING = "💤 Sleeping...";
const BUSY = "⚠️ Busy. ⛔ Do Not Disturb";
const AVAILABLE = "✅ Available for messaging, calls will be declined 📵";
const WEEKEND = "✨ On a weekend. 📳 Enjoying real life 🏞️";
const HOLYDAY = "🎉 It's a holyday! 🛫 Unavaliable today, enjoying a great time with my family 👨‍👩‍👧‍👦️";

const schedule = {
    ...range(1, 5, 7, {
        ...range(0, 6, 24, {
            message: SLEEPING,
            dnd: true,
        }),
        ...range(7, 17, 24, {
            message: BUSY,
            dnd: false,
        }),
        ...range(18, 23, 24, {
            message: AVAILABLE,
            dnd: false,
        }),
        ...range()
    }),
    ...range(6, 7, 7, {
        ...range(0, 23, 24, {
            message: WEEKEND,
            dnd: false
        }),
    }),
};

const statusContainer = document.querySelector("#status");

setInterval(() => {
    const day = now().getUTCDay();
    const hour = now().getUTCHours();

    const status = schedule[day][hour];
    if (status !== statusContainer.textContent) {
        statusContainer.textContent = status.message;
    }
}, 1000);

const copyElements = document.querySelectorAll(".copy");

for (const element of copyElements) {
    element.addEventListener("click", () => {
        navigator.clipboard.writeText(element.textContent.trim());
        showPopup("Address copied to clipboard!");
    });
}

const contactLinks = document.querySelectorAll(".contact");

for (const link of contactLinks) {
    link.addEventListener("click", (event) => {
        const day = now().getUTCDay();
        const hour = now().getUTCHours();    

        const status = schedule[day][hour];

        if (status.dnd) {
            event.preventDefault();
            showPopup("Please, contact me later. I'm sleeping", true)
        }
    })
}

const yearSpan = document.querySelector("#year");
yearSpan.textContent = now().getUTCFullYear();

const banner = document.querySelector(".banner");

const showBanner = () => {
    banner.classList.add("show");
}

const hideBanner = () => {
    banner.classList.remove("show");
}

banner.addEventListener("click", (event) => {
    if (event.target === banner) {
        hideBanner();
    }
});

const bannerButton = document.querySelector(".show-banner");

bannerButton.addEventListener("click", () => showBanner());
