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
    const hour = currentDate.getUTCHours() + 3;

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

const songs = [
    {
        title: "Freestyle",
        artist: "Lil Baby"
    },
    {
        title: "THANK GOD",
        artist: "Travis Scott"
    },
    {
        title: "Gang Gang",
        artist: "Polo G"
    },
    {
        title: "The Woo",
        artist: "Pop Smoke"
    },
    {
        title: "For The Night",
        artist: "Pop Smoke"
    },
    {
        title: "Mood Swings",
        artist: "Pop Smoke"
    },
    {
        title: "Pop Out",
        artist: "Lil Baby ft. Nardo Wick"
    },
    {
        title: "Dior",
        artist: "Pop Smoke"
    },
    {
        title: "The Box",
        artist: "Roddy Ricch"
    },
    {
        title: "The London",
        artist: "Young Thug"
    },
    {
        title: "Life Is Good",
        artist: "Future"
    },
    {
        title: "Ransom",
        artist: "Lil Tecca"
    },
    {
        title: "Ballin'",
        artist: "Mustard"
    },
    {
        title: "Panini",
        artist: "Lil Nas X"
    },
    {
        title: "Hot",
        artist: "Young Thug"
    },
    {
        title: "Suge",
        artist: "DaBaby"
    },
    {
        title: "Wow.",
        artist: "Post Malone"
    },
    {
        title: "Old Town Road",
        artist: "Lil Nas X"
    },
    {
        title: "Raindrops (Insane)",
        artist: "Metro Boomin"
    },
    {
        title: "SICKO MODE",
        artist: "Travis Scott"
    },
    {
        title: "Lucid Dreams",
        artist: "Juice WRLD"
    },
    {
        title: "Nonstop",
        artist: "Drake"
    },
    {
        title: "I Like It",
        artist: "Cardi B"
    },
    {
        title: "Better Now",
        artist: "Post Malone"
    },
    {
        title: "MELTDOWN",
        artist: "Travis Scott ft. Drake"
    },
    {
        title: "In A Minute",
        artist: "Lil Baby"
    },
    {
        title: "Yes Indeed",
        artist: "Lil Baby"
    },
    {
        title: "Low Down",
        artist: "Lil Baby"
    },
    {
        title: "Drip Too Hard",
        artist: "Lil Baby"
    },
    {
        title: "Never Recover",
        artist: "Lil Baby"
    },
    {
        title: "Close Friends",
        artist: "Lil Baby"
    },
    {
        title: "Not Finished",
        artist: "Lil Baby"
    },
    {
        title: "Walk It Talk It",
        artist: "Migos"
    },
    {
        title: "SIRENS",
        artist: "Travis Scott"
    },
    {
        title: "BUTTERFLY EFFECT",
        artist: "Travis Scott"
    },
    {
        title: "STARGAZING",
        artist: "Travis Scott"
    },
    {
        title: "SKELETONS",
        artist: "Travis Scott"
    },
    {
        title: "YOSEMITE",
        artist: "Travis Scott"
    },
    {
        title: "CAN'T SAY",
        artist: "Travis Scott"
    },
    {
        title: "Overdue",
        artist: "Metro Boomin ft. Travis Scott"
    },
    {
        title: "Transporin'",
        artist: "Kodak Black"
    },
    {
        title: "Sanguine Paradise",
        artist: "Lil Uzi Vert"
    },
    {
        title: "That's A Rack",
        artist: "Lil Uzi Vert"
    },
    {
        title: "Money In The Grave",
        artist: "Drake"
    },
    {
        title: "P Power",
        artist: "Gunna ft. Drake"
    },
    {
        title: "Going Bad",
        artist: "Meek Mill ft. Drake"
    },
    {
        title: "No Stylist",
        artist: "French Montana"
    },
    {
        title: "ZEZE",
        artist: "Kodak Black"
    },
    {
        title: "SAD!",
        artist: "XXXTENTACION"
    },
    {
        title: "Armed And Dangerous",
        artist: "Juice WRLD"
    },
    {
        title: "Millions",
        artist: "Young Thug"
    },
    {
        title: "GOD'S COUNTRY",
        artist: "Travis Scott"
    },
    {
        title: "Heyy",
        artist: "Lil Baby"
    },
    {
        title: "Creepin'",
        artist: "Metro Boomin"
    },
    {
        title: "25k jacket",
        artist: "Gunna"
    },
    {
        title: "Don't Play",
        artist: "Polo G"
    },
    {
        title: "SKITZO",
        artist: "Travis Scott ft. Young Thug"
    },
    {
        title: "Bank Account",
        artist: "21 Savage"
    },
    {
        title: "rockstar",
        artist: "Post Malone"
    },
    {
        title: "Bartier Cardi",
        artist: "Cardi B"
    },
    {
        title: "I Get The Bag",
        artist: "Gucci Mane"
    },
    {
        title: "I KNOW ?",
        artist: "Travis Scott"
    },
    {
        title: "Digits",
        artist: "Young Thug"
    },
    {
        title: "Back On",
        artist: "Quality Control & Lil Baby"
    },
    {
        title: "Took Her To The O",
        artist: "King Von"
    },
    {
        title: "BOP",
        artist: "DaBaby"
    },
    {
        title: "Hot",
        artist: "Meek Mill"
    },
    {
        title: "ESCAPE PLAN",
        artist: "Travis Scott"
    },
    {
        title: "GATTI",
        artist: "JACKBOYS"
    },
    {
        title: "OUT WEST",
        artist: "JACKBOYS"
    },
    {
        title: "GANG GANG",
        artist: "JACKBOYS"
    },
    {
        title: "Right On",
        artist: "Lil Baby"
    },
    {
        title: "25 million",
        artist: "Roddy Ricch"
    },
    {
        title: "Just Wanna Rock",
        artist: "Lil Uzi Vert"
    },
    {
        title: "MY EYES",
        artist: "Travis Scott"
    },
    {
        title: "HIGHEST IN THE ROOM",
        artist: "Travis Scott"
    },
    {
        title: "Real Spill",
        artist: "Lil Baby"
    },
    {
        title: "Woah",
        artist: "Lil Baby"
    },
    {
        title: "Broke Boys",
        artist: "Drake & 21 Savage"
    },
    {
        title: "Life Is Good",
        artist: "Drake"
    },
    {
        title: "Pissy",
        artist: "Gucci Mane"
    },
    {
        title: "Baby",
        artist: "Quality Control & Lil Baby"
    },
    {
        title: "Bigger Picture",
        artist: "Lil Baby"
    },
    {
        title: "We Paid",
        artist: "Lil Baby"
    },
    {
        title: "Realist In It",
        artist: "Lil Baby"
    },
    {
        title: "south to west",
        artist: "Lil Baby"
    },
    {
        title: "Long Time (Intro)",
        artist: "Playboi Carti"
    },
    {
        title: "R.I.P. Fredo (Notice Me)",
        artist: "Playboi Carti"
    },
    {
        title: "Lean 4 Real",
        artist: "Playboi Carti"
    },
    {
        title: "Old Money",
        artist: "Playboi Carti"
    },
    {
        title: "Love Hurts",
        artist: "Playboi Carti"
    },
    {
        title: "Shoota",
        artist: "Playboi Carti"
    },
    {
        title: "Right Now",
        artist: "Playboi Carti"
    },
    {
        title: "Poke It Out",
        artist: "Playboi Carti"
    },
    {
        title: "5% TINT",
        artist: "Travis Scott"
    },
    {
        title: "Check",
        artist: "Young Thug"
    },
    {
        title: "My Dawg",
        artist: "Lil Baby"
    },
    {
        title: "Frozen",
        artist: "Lil Baby"
    },
    {
        title: "Never Needed No Help",
        artist: "Lil Baby"
    },
    {
        title: "Close Friends",
        artist: "Lil Baby"
    },
    {
        title: "California Breeze",
        artist: "Lil Baby"
    },
    {
        title: "Ocean Spray",
        artist: "Moneybagg Yo"
    },
    {
        title: "fukumean",
        artist: "Gunna"
    },
    {
        title: "fukk sleep",
        artist: "A$AP Rocky"
    },
    {
        title: "Me vs Me",
        artist: "Moneybagg Yo"
    },
    {
        title: "Um Yea",
        artist: "Quality Control & Lil Baby"
    },
    {
        title: "BASE",
        artist: "Lil Skies"
    },
    {
        title: "Lil Baby",
        artist: "Lil Baby"
    },
    {
        title: "PUFFIN ON ZOOTIEZ",
        artist: "Future"
    },
    {
        title: "Diamonds Dancing",
        artist: "Young Stoner Life"
    },
    {
        title: "Want Me Dead",
        artist: "Young Thug"
    },
    {
        title: "Sweater Weather",
        artist: "The Neighbourhood"
    }
];

let currentSongIndex = 0;

function getRandomSong() {
    const randomSongIndex = Math.floor(Math.random() * songs.length);
    return songs[randomSongIndex];
}

function updateSongStatus() {
    const now = new Date();
    const hour = now.getUTCHours() + 3;
    const day = now.getUTCDay();
    const songStatusElement = document.querySelector("#song-status");

    if (hour >= 11 && hour < 19 && day !== 0) {
        const currentSong = getRandomSong();
        songStatusElement.textContent = `🎧 ${currentSong.title} by ${currentSong.artist}`;
    } else {
        songStatusElement.textContent = "🔇 Not playing any song at the moment";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(updateSongStatus, 1000); // Update after 1second delay
    setInterval(updateSongStatus, 240000); // Then continue updating every 4 minutes
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
        const hour = now().getUTCHours() + 3;

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
