class Work {

    // per un djset: titolo, publisher, data, djset, immagine, link audio, audio, descrizione, durata
    constructor(title, where, publisher, date, category, media, link, audio, desc, duration, moreinfo) {
        this.title = title;
        this.where = where;
        this.publisher = publisher;
        this.date = date;
        this.category = category;
        this.media = media;
        this.link = link;
        this.descr = desc;
        this.duration = duration;
        this.audio = audio;
        if (this.audio) {this.audioElement = new Audio(audio);}
        this.moreinfo = moreinfo;
    }


    render() {
        const workDiv = document.createElement("div");
        workDiv.classList.add("work-item");

        // Contenitore immagine
        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("work-img-wrapper");

        const imgEl = document.createElement("img");
        imgEl.src = this.media;
        imgEl.alt = this.title;
        imgEl.classList.add("work-img");

        imgWrapper.appendChild(imgEl);

        // Contenitore testo
        const textContainer = document.createElement("div");
        textContainer.classList.add("work-text-container");



        // Data
        const dateEl = document.createElement("d");
        dateEl.textContent = this.date;
        dateEl.classList.add("work-date");

        textContainer.append(dateEl);


        // Title
        const titleEl = document.createElement("h3");
        titleEl.textContent = this.title;
        titleEl.classList.add("work-title");

        textContainer.append(titleEl);



        if (this.publisher) {
            const publisherEl = document.createElement("p");
            publisherEl.textContent = `Published by: ${this.publisher}`;
            publisherEl.classList.add("work-publisher");
            textContainer.append(publisherEl)

        }

        if (this.where) {
            const whereEl = document.createElement("w");
            whereEl.textContent = `Music event at: ${this.where}`;
            whereEl.classList.add("work-publisher");
            textContainer.append(whereEl)

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
            //textContainer.append(durationEl);

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
                progressBar.value = (currentTime / duration) * 100;
                timeLabel.textContent = this.formatTime(currentTime) + " / " + this.duration;
            });

            progressBar.addEventListener("input", () => {
                this.audioElement.currentTime = (progressBar.value / 100) * this.audioElement.duration;
            });
        }

        
        if (this.link) {
            const linkEl = document.createElement("a");
            linkEl.href = this.link;
            linkEl.textContent = "Listen in full here";
            linkEl.classList.add("work-link");
            linkEl.target = "_blank"; // Apre in una nuova scheda
            linkEl.rel = "noopener noreferrer"; // Sicurezza

            textContainer.append(linkEl);

        }

        if (this.moreinfo) {
            const moreinfoEl = document.createElement("a");
            moreinfoEl.href = this.moreinfo;
            moreinfoEl.textContent = "More info here";
            moreinfoEl.classList.add("work-link");
            moreinfoEl.target = "_blank"; // Apre in una nuova scheda
            moreinfoEl.rel = "noopener noreferrer"; // Sicurezza

            textContainer.append(moreinfoEl);

        }


        // Struttura finale
        workDiv.append( imgWrapper, textContainer);
        return workDiv;
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    }
}

// Creazione oggetti 
const works = [
    //new Work("Soné (6 ed.)","Spazio Hydro, Biella",0, "1.02.2025", "serata", "works_images/sone.jpg", 0, 0,0,0,"https://www.instagram.com/p/DFYNM0CNfjh/?utm_source=ig_web_copy_link"),
    new Work("Opening for: Olmo Amato - Deep Blue","Bi-BOx Art Space, Biella",0, "20.09.2024", "serata", "https://i1.sndcdn.com/artworks-Rdt1nexJWYS5Vney-Rr6Tug-t1080x1080.jpg", 0, 0,0,0,"https://www.instagram.com/p/DB1pE27pe0P/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="),
    new Work("Esplorazioni Sonore #2 (Porquerolles)",0,"Onde Coerenti", "29.08.2024", "DJ Set", "works_images/es2.jpeg", "https://soundcloud.com/luca-trapella-651200896/esplorazioni-sonore-2?si=b3ed1330cf5648b6af3022d9b751eb76&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing","works_audio/es2.mp3", "Una grotta sull'isola di Porquerolles ha ispirato la seconda Esplorazione. Il mix si addentra nella cavità per poi riemergere al tramonto. Diversamente dalla prima, qui si attraversano diversi generi e le tracce vengono accompagnate da registrazioni ambientali dell'isola.", "1:00:00",0),
    new Work("Esplorazioni Sonore #1 (Poșta)",0,"Onde Coerenti", "20.07.2024", "DJ Set", "works_images/es1.jpg", "https://soundcloud.com/luca-trapella-651200896/esplorazioni-sonore-1-lucu?si=7a9f1cf80ccb4325af3764befc8fd675&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing","works_audio/es1.mp3", "Il paesaggio decadente e silenzioso delle campagne rumene è il luogo perfetto per esplorare. I pensieri si perdono nelle alte frequenze, mentre il corpo vibra nelle basse.", "0:59:58",0),

];

// Mostra lavori ordinati per data
function displayWorks(sortBy) {
    const container = document.getElementById("works-container");
    container.innerHTML = "";

    const sortedWorks = [...works].sort((a, b) => {
        if (sortBy === "date") return b.date - a.date;
        if (sortBy === "title") return a.title.localeCompare(b.title);
    });

    sortedWorks.forEach(work => {
        container.appendChild(work.render());
    });
}

displayWorks("date");
