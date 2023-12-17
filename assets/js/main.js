"use strict";

const showPopup = (() => {
    let timeoutId = null;
    const popup = document.querySelector(".popup");
    const popupText = document.querySelector(".popup-text");

    const animation = [
        {opacity: 1, offset: 0},
        {opacity: 0, offset: 0.4},
        {opacity: 0, offset: 0.6},
        {opacity: 1, offset: 1},
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

const year = now().getUTCFullYear();

const range = (start, end, base, value) => {
    const keys = Array.from(
        {length: end - start + 1},
        (_, i) => (start + i) % base
    );

    return keys.reduce(
        (acc, cur) => ({...acc, [cur]: value}),
        {}
    );
}

const SLEEPING = "💤 Sleeping...";
const BUSY = "⚠️ Busy. ⛔ Do Not Disturb";
const AVAILABLE = "✅ Available for messaging, calls will be declined 📵";
const WEEKEND = "✨ On a weekend. 📳 Enjoying real life 🏞️";
const HOLIDAY = "🎉 On a holiday celebration with my family!";

const fixedHolidays = {
    '01-01': 'Feast of the Circumcision of Christ (New Year\'s Day)',
    '01-02': 'Saint Basil\'s Day (New Year\'s 2nd Day)',
    '01-06': 'Epiphany (Three Kings’ Day)',
    '02-02': 'Candlemas (Presentation of Jesus at the Temple)',
    '02-14': 'Saint Valentine\'s Day',
    '03-17': 'Saint Patrick\'s Day',
    '03-19': 'Saint Joseph\'s Day',
    '03-25': 'Annunciation',
    '04-23': 'Saint George\'s Day',
    '04-25': 'Saint Mark\'s Day',
    '05-01': 'Saint James the Great Day',
    '05-09': 'Europe Day',
    '05-31': 'Visitation of Mary',
    '06-24': 'Nativity of Saint John the Baptist',
    '06-29': 'Saints Peter and Paul\'s Day',
    '07-17': 'my Sister\'s Birthday',
    '07-20': 'Saint Elijah\'s the Prophet Day',
    '07-25': 'Saint James the Great Day',
    '07-29': 'my Birthday!',
    '08-06': 'Transfiguration of Jesus',
    '08-15': 'Assumption of Mary (Assumption Day)',
    '09-14': 'Holy Cross Day',
    '09-29': 'Michaelmas (Feast of Saint Michael and All Angels)',
    '10-04': 'Saint Francis of Assisi Day',
    '10-18': 'Saint Luke\'s Day',
    '10-31': 'Reformation Day',
    '11-01': 'All Saints\' Day',
    '11-02': 'All Souls\' Day',
    '11-30': 'Saint Andrew\'s Day',
    '12-06': 'Saint Nicholas Day',
    '12-08': 'Feast of the Immaculate Conception',
    '12-24': 'Christmas Eve',
    '12-25': 'Christmas Day',
    '12-26': 'Saint Stephen\'s Day',
    '12-28': 'Holy Innocents\' Day',
    '12-29': 'my Dad\'s Birthday',
    '12-31': 'New Year\'s Eve',
};

function calculateEaster(year) {
    const f = Math.floor,
        // Golden Number - 1
        G = year % 19,
        C = f(year / 100),
        // related to Epact
        H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
        // number of days from 21 March to the Paschal full moon
        I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
        // weekday for the Paschal full moon
        J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
        // number of days from 21 March to the Sunday on or before the Paschal full moon
        L = I - J,
        month = 3 + f((L + 40) / 44),
        day = L + 28 - 31 * f(month / 4);

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

const movableHolidays = {
    [calculateEaster(year)]: 'Easter Sunday',
};

// Combine fixed and movable holidays
const holidays = {...fixedHolidays, ...movableHolidays};

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
            dnd: true,
        }),
    }),
};

const statusContainer = document.querySelector("#status");

// Function to format date in 'MM-DD' format
const formatDate = (date) => {
    return `${date.getUTCMonth() + 1}`.padStart(2, '0') + '-' + `${date.getUTCDate()}`.padStart(2, '0');
}

setInterval(() => {
    const currentDate = now();
    const formattedDate = formatDate(currentDate);
    const dayOfWeek = currentDate.getUTCDay();
    const hour = currentDate.getUTCHours();

    // Check if today is a holiday
    if (holidays[formattedDate]) {
        statusContainer.textContent = `${HOLIDAY} Today is ${holidays[formattedDate]} 👨‍👩‍👧‍👦`;
    } else {
        // Existing schedule logic
        const status = schedule[dayOfWeek][hour];
        if (status !== statusContainer.textContent) {
            statusContainer.textContent = status.message;
        }
    }
}, 1000);

let songs = [];

function loadSongs() {
    fetch('assets/songs.json')  // Ensure the path to your songs.json file is correct
        .then(response => response.json())
        .then(data => {
            songs = data;
            setInterval(updateSongStatus, 240000); // 240000 milliseconds = 4 minutes
        })
        .catch(error => console.error('Error loading songs:', error));
}
function getRandomSong() {
    if (songs.length === 0) return 'No song available';
    const randomIndex = Math.floor(Math.random() * songs.length);
    return `${songs[randomIndex].title} by ${songs[randomIndex].artist}`;
}

function updateSongStatus() {
    const now = new Date();
    const hour = now.getHours();
    const songStatusElement = document.querySelector("#song-status");

    if (hour >= 4 && hour < 19) { // Between 11 AM and 7 PM
        const currentSong = getRandomSong();
        songStatusElement.textContent = `Currently listening to: 🎵 ${currentSong}`;
    } else {
        songStatusElement.textContent = "Not currently playing any song";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadSongs();
    updateSongStatus(); // Initial update
});

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