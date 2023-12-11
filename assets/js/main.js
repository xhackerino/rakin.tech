"use strict";

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
const AVAILABLE = "✅ Available for messaging only, calls will be declined 📵";
const WEEKEND = "✨ On a weekend. 📳 Enjoying real life 🏞️";

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
            showPopup("Please, contact me later.", true)
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
