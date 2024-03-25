"use strict";

"use strict";

const translations = {
    en: {
        greeting: "👋 Hello!",
        contactMe: "💬 Contact Me",
        gmail: "📩 Gmail:",
        corporate: "🎓 Corporate:",
        telegram: "📩 Telegram (Business related issues ONLY):",
        seeAlso: "👀 See Also",
        instagram: "📷 Instagram:",
        vk: "🇷🇺 VK:",
        linkedIn: "🇫🇮 LinkedIn:",
        gitHub: "👨‍💻 GitHub:",
        wallets: "💰 Wallets",
        // Add other translations here
    },
    fr: {
        greeting: "👋 Bonjour!",
        contactMe: "💬 Contactez-moi",
        gmail: "📩 Gmail:",
        corporate: "🎓 Entreprise:",
        telegram: "📩 Telegram (Uniquement pour les questions professionnelles):",
        seeAlso: "👀 Voir Aussi",
        instagram: "📷 Instagram:",
        vk: "🇷🇺 VK:",
        linkedIn: "🇫🇮 LinkedIn:",
        gitHub: "👨‍💻 GitHub:",
        wallets: "💰 Portefeuilles",
        // Add more translations here
    },
    es: {
        greeting: "👋 ¡Hola!",
        contactMe: "💬 Contáctame",
        gmail: "📩 Gmail:",
        corporate: "🎓 Corporativo:",
        telegram: "📩 Telegram (Solo para asuntos de negocios):",
        seeAlso: "👀 Ver También",
        instagram: "📷 Instagram:",
        vk: "🇷🇺 VK:",
        linkedIn: "🇫🇮 LinkedIn:",
        gitHub: "👨‍💻 GitHub:",
        wallets: "💰 Carteras",
        // Add more translations here
    },
    ar: {
        greeting: "👋 مرحبا!",
        contactMe: "💬 اتصل بي",
        gmail: "📩 جيميل:",
        corporate: "🎓 الشركات:",
        telegram: "📩 تلغرام (للقضايا المتعلقة بالأعمال فقط):",
        seeAlso: "👀 انظر أيضا",
        instagram: "📷 انستغرام:",
        vk: "🇷🇺 VK:",
        linkedIn: "🇫🇮 لينكدإن:",
        gitHub: "👨‍💻 جيتهب:",
        wallets: "💰 المحافظ",
        // Add more translations here
    },
    de: {
        greeting: "👋 Hallo!",
        contactMe: "💬 Kontaktiere mich",
        gmail: "📩 Gmail:",
        corporate: "🎓 Firmen:",
        telegram: "📩 Telegram (Nur für geschäftliche Angelegenheiten):",
        seeAlso: "👀 Siehe Auch",
        instagram: "📷 Instagram:",
        vk: "🇷🇺 VK:",
        linkedIn: "🇫🇮 LinkedIn:",
        gitHub: "👨‍💻 GitHub:",
        wallets: "💰 Geldbörsen",
        // Add more translations here
    },
    ru: {
        greeting: "👋 Привет!",
        contactMe: "💬 Свяжитесь со мной",
        gmail: "📩 Gmail:",
        corporate: "🎓 Корпоративный:",
        telegram: "📩 Телеграмм (Только по деловым вопросам):",
        seeAlso: "👀 Смотрите также",
        instagram: "📷 Инстаграм:",
        vk: "🇷🇺 ВК:",
        linkedIn: "🇫🇮 LinkedIn:",
        gitHub: "👨‍💻 GitHub:",
        wallets: "💰 Кошельки",
        // Add more translations here
    },
    // Add more languages as needed
};

// Add this after your translations object

function translatePage(lang) {
    // Assuming your text content is within elements with IDs corresponding to translation keys
    for (const key in translations[lang]) {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = translations[lang][key];
        }
    }
}

// Listen for changes on the language select dropdown
document.getElementById('language-select').addEventListener('change', function() {
    const selectedLanguage = this.value;
    translatePage(selectedLanguage);
    localStorage.setItem('selectedLanguage', selectedLanguage); // Remember the user's choice
    // Adjust layout for RTL languages like Arabic
        if (selectedLanguage === 'ar') {
            document.body.setAttribute('dir', 'rtl');
        } else {
            document.body.setAttribute('dir', 'ltr');
        }
});

// Apply the translation based on saved preference or default language
window.onload = () => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Default to English if no preference is saved
    document.getElementById('language-select').value = savedLanguage;
    translatePage(savedLanguage);
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
