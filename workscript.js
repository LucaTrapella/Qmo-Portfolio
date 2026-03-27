class Work {

    // links is an array like: [{ label: "Soundcloud", url: "https://..." }, { label: "Bandcamp", url: "https://..." }]
    constructor(title, where, publisher, date, category, media, links = [], audio, desc, duration, moreinfo) {
        this.title = title;
        this.where = where;
        this.publisher = publisher;
        this.date = date;
        this.category = category;
        this.media = media;
        this.descr = desc;
        this.duration = duration;
        this.audio = audio;
        this.moreinfo = moreinfo;
        this.links = this.normalizeLinks(links, moreinfo);

        if (this.audio) {
            this.audioElement = new Audio(audio);
        }
    }

    normalizeLinks(links, moreinfo) {
        const normalizedLinks = Array.isArray(links)
            ? links.filter(link => link && link.url)
            : [];

        if (moreinfo) {
            normalizedLinks.push({ label: "More info here", url: moreinfo });
        }

        return normalizedLinks;
    }

    createLinkElement(label, url) {
        const linkEl = document.createElement("a");
        linkEl.href = url;
        linkEl.textContent = label;
        linkEl.classList.add("work-link");
        linkEl.target = "_blank";
        linkEl.rel = "noopener noreferrer";
        return linkEl;
    }

    render() {
        const workDiv = document.createElement("div");
        workDiv.classList.add("work-item");

        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("work-img-wrapper");

        const imgEl = document.createElement("img");
        imgEl.src = this.media;
        imgEl.alt = this.title;
        imgEl.classList.add("work-img");

        imgWrapper.appendChild(imgEl);

        const textContainer = document.createElement("div");
        textContainer.classList.add("work-text-container");

        const dateEl = document.createElement("p");
        dateEl.textContent = this.date;
        dateEl.classList.add("work-date");
        textContainer.append(dateEl);

        const titleEl = document.createElement("h3");
        titleEl.textContent = this.title;
        titleEl.classList.add("work-title");
        textContainer.append(titleEl);

        if (this.publisher) {
            const publisherEl = document.createElement("p");
            publisherEl.textContent = `Published by: ${this.publisher}`;
            publisherEl.classList.add("work-publisher");
            textContainer.append(publisherEl);
        }

        if (this.where) {
            const whereEl = document.createElement("p");
            whereEl.textContent = `Djset at: ${this.where}`;
            whereEl.classList.add("work-publisher");
            textContainer.append(whereEl);
        }

        if (this.descr) {
            const descrEl = document.createElement("p");
            descrEl.textContent = this.descr;
            descrEl.classList.add("work-description");
            textContainer.appendChild(descrEl);
        }

        if (this.duration) {
            const durationEl = document.createElement("p");
            durationEl.textContent = `Duration: ${this.duration}`;
            durationEl.classList.add("work-duration");
            // textContainer.append(durationEl);
        }

        if (this.audio) {
            const audioContainer = document.createElement("div");
            audioContainer.classList.add("audio-container");

            const playPauseBtn = document.createElement("button");
            playPauseBtn.classList.add("play-pause-btn");
            playPauseBtn.innerHTML = "▶";

            const progressBar = document.createElement("input");
            progressBar.type = "range";
            progressBar.classList.add("progress-bar");
            progressBar.value = 0;
            progressBar.min = 0;
            progressBar.max = 100;

            const timeLabel = document.createElement("span");
            timeLabel.classList.add("time-label");
            timeLabel.textContent = "0:00 / " + this.duration;

            audioContainer.append(playPauseBtn);
            textContainer.append(progressBar, timeLabel);
            imgWrapper.appendChild(audioContainer);

            playPauseBtn.addEventListener("click", () => {
                if (this.audioElement.paused) {
                    this.audioElement.play();
                    playPauseBtn.innerHTML = "| |";
                } else {
                    this.audioElement.pause();
                    playPauseBtn.innerHTML = "▶";
                }
            });

            this.audioElement.addEventListener("timeupdate", () => {
                const currentTime = this.audioElement.currentTime;
                const duration = this.audioElement.duration;
                progressBar.value = duration ? (currentTime / duration) * 100 : 0;
                timeLabel.textContent = this.formatTime(currentTime) + " / " + this.duration;
            });

            this.audioElement.addEventListener("ended", () => {
                playPauseBtn.innerHTML = "▶";
                progressBar.value = 0;
                timeLabel.textContent = "0:00 / " + this.duration;
            });

            progressBar.addEventListener("input", () => {
                if (!this.audioElement.duration) return;
                this.audioElement.currentTime = (progressBar.value / 100) * this.audioElement.duration;
            });
        }

        if (this.links.length) {
            const linksContainer = document.createElement("div");
            linksContainer.classList.add("work-links-container");

            this.links.forEach(({ label, url }, index) => {
                const linkEl = this.createLinkElement(label, url);
                linksContainer.append(linkEl);

                // Add space between links (but not after the last one)
                if (index < this.links.length - 1) {
                    linksContainer.append(document.createTextNode(" | "));
                }
            });

            textContainer.append(linksContainer);
        }

        workDiv.append(imgWrapper, textContainer);
        return workDiv;
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    }
}

// new Work(
//     "Nome evento",
//     "dove",
//     0,
//     "?.?.2025",
//     "serata",
//     "works_images/",
//     [
//         { label: "Soundcloud", url: "https://..." },
//         { label: "Bandcamp", url: "https://..." },
//         { label: "More info here", url: "https://..." }
//     ],
//     0,
//     0,
//     0,
//     0
// ),

const works = [
    new Work(
        "A Year on Saqon Island",
        0,
        "Qmo",
        "?.03.2026",
        "DJ Set",
        "works_images/SAQON.jpeg",
        [
            { label: "Soundcloud", url: ""},
            { label: "Bandcamp", url: ""}

        ],
        0,
        "??",
        0,
        0
    ),

    new Work(
        "4th Floor w/ Qmo",
        "RBL (Imbarchino), Torino",
        0,
        "6.05.2025",
        "serata",
        "works_images/SAQON.jpeg",
        [
            { label: "More info here", url: "https://www.mixcloud.com/radiobandalarga/4th-floor-w-qmo-6th-may-2025/" }
        ],
        0,
        0,
        0,
        0
    ),
    new Work(
        "The Rapture E11 with QMO",
        "Linea, Milano",
        0,
        "4.04.2025",
        "serata",
        "works_images/linea.PNG",
        [
            { label: "More info here", url: "https://youtu.be/eejiI_3X0LY" }
        ],
        0,
        0,
        0,
        0
    ),
    new Work(
        "Lapse w/ frHans",
        0,
        "Onde Coerenti",
        "13.03.2025",
        "DJ Set",
        "works_images/lapse.jpg",
        [
            { label: "Soundcloud", url: "https://soundcloud.com/luca-trapella-651200896/lapse-frhans-qmo?si=b4c76294f4d14262b886bb23a1911140&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" }
        ],
        "works_audio/lapse.mp3",
        0,
        "03:02",
        0
    ),
    new Work(
        "Opening for: Olmo Amato - Deep Blue",
        "Bi-BOx Art Space, Biella",
        0,
        "20.09.2024",
        "serata",
        "https://i1.sndcdn.com/artworks-Rdt1nexJWYS5Vney-Rr6Tug-t1080x1080.jpg",
        [
            { label: "More info here", url: "https://www.instagram.com/p/DB1pE27pe0P/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" }
        ],
        0,
        0,
        0,
        0
    ),
    new Work(
        "Esplorazioni Sonore #1 (Porquerolles)",
        0,
        "Onde Coerenti",
        "29.08.2024",
        "DJ Set",
        "works_images/es2.jpeg",
        [
            { label: "Soundcloud", url: "https://soundcloud.com/luca-trapella-651200896/esplorazioni-sonore-2?si=b3ed1330cf5648b6af3022d9b751eb76&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" }
        ],
        "works_audio/es2.mp3",
        "A cave on the island of Porquerolles inspired this Exploration. The mix dives into the cavity and then resurfaces at sunset. Tracks are accompanied by field recordings from the island.",
        "1:00:00",
        0
    ),
];

// Mostra lavori ordinati per data
function displayWorks(sortBy) {
    const container = document.getElementById("works-container");
    container.innerHTML = "";

    const sortedWorks = [...works].sort((a, b) => {
        if (sortBy === "date") {
            const parseDate = (dateString) => {
                const [day, month, year] = dateString.split(".").map(Number);
                return new Date(year, month - 1, day);
            };
            return parseDate(b.date) - parseDate(a.date);
        }
        if (sortBy === "title") return a.title.localeCompare(b.title);
    });

    sortedWorks.forEach(work => {
        container.appendChild(work.render());
    });
}

displayWorks("date");
