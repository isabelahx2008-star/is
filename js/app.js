const topics = {
      impressionismo: {
        eyebrow: "01 · Movimento artístico",
        title: "Impressionismo",
        intro: "Uma revolução silenciosa que deixou o ateliê para encontrar a pintura sob a luz do dia. O instante, com toda a sua impermanência, tornou-se o tema.",
        context: "Na França da segunda metade do século XIX, artistas jovens desafiaram as regras acadêmicas e os temas históricos grandiosos. Em 1874, organizaram em Paris uma exposição independente — onde a crítica, ao ridicularizar Impressão, nascer do sol, de Monet, acabou batizando o movimento. A tinta aplicada em pinceladas rápidas, a pintura ao ar livre e o estudo da luz passaram ao primeiro plano.",
        bio: "Claude Monet (1840–1926) dedicou a vida a observar como a luz transforma paisagens e objetos ao longo do dia. Pintou séries de um mesmo motivo — como a Catedral de Rouen e os Nenúfares — para capturar variações de cor, atmosfera e tempo. Seu jardim em Giverny tornou-se um de seus grandes ateliês a céu aberto.",
        artist: "Claude Monet",
        period: "Paris, 1840 — Giverny, 1926",
        portrait: "imagens/retrato-monet.jpg",
    banner: "imagens/impressionismo-monet.jpg",
    works: [
          { title: "Impressão, nascer do sol", year: "1872", image: "imagens/impressionismo-monet.jpg" },
          { title: "Mulher com sombrinha", year: "1875", image: "imagens/obra-monet-parasol.jpg" },
          { title: "Catedral de Rouen, pleno sol", year: "1894", image: "imagens/obra-monet-catedral-rouen.jpg" }
        ]
      },
      expressionismo: {
        eyebrow: "02 · Movimento artístico",
        title: "Expressionismo",
        intro: "Mais do que reproduzir o mundo, expressar o que ele provoca. No Expressionismo, a emoção altera as formas e incendeia as cores.",
        context: "O Expressionismo ganhou força no início do século XX, sobretudo na Alemanha e na Europa Central, em meio à rápida urbanização e a profundas inquietações sociais. Artistas de grupos como Die Brücke e Der Blaue Reiter rejeitaram a representação naturalista: distorções, cores intensas e linhas marcadas tornaram-se meios de revelar estados interiores e tensões de seu tempo.",
        bio: "Edvard Munch (1863–1944), pintor norueguês, transformou experiências de amor, perda, ansiedade e mortalidade em imagens de grande intensidade psicológica. Sua série O Friso da Vida explora os ciclos da existência. Com figuras simplificadas, contornos ondulantes e cores expressivas, Munch influenciou profundamente a arte moderna e o Expressionismo.",
        artist: "Edvard Munch",
        period: "Løten, 1863 — Oslo, 1944",
        portrait: "imagens/retrato-munch.png",
        banner: "imagens/expressionismo-munch.jpg",
        works: [
          { title: "O Grito", year: "1893", image: "imagens/expressionismo-munch.jpg" },
          { title: "Madonna", year: "1894–1895", image: "imagens/obra-munch-madonna.jpg" },
          { title: "Ansiedade", year: "1894", image: "imagens/obra-munch-ansiedade.jpg" }
        ]
      },
      vangogh: {
        eyebrow: "03 · Artista em destaque",
        title: "Vincent van Gogh",
        intro: "Em apenas uma década de produção artística, Vincent van Gogh construiu uma obra singular: vibrante, íntima e profundamente ligada à experiência de estar vivo.",
        context: "Nascido nos Países Baixos em 1853, Van Gogh começou a pintar seriamente por volta dos 27 anos. Viveu e trabalhou entre os Países Baixos, Paris, Arles e Saint-Rémy. Embora tenha recebido pouco reconhecimento em vida, sua liberdade pictórica ajudou a abrir caminho para a arte moderna e influenciou gerações de artistas.",
        bio: "Van Gogh (1853–1890) desenvolveu uma linguagem própria com pinceladas carregadas, linhas rítmicas e cores intensas, usadas para traduzir sentimentos e sensações. A correspondência com seu irmão Theo revela um artista atento à cor, à natureza e ao ofício da pintura. Sua produção inclui mais de duas mil obras, entre pinturas e desenhos.",
        artist: "Vincent van Gogh",
        period: "Zundert, 1853 — Auvers-sur-Oise, 1890",
        portrait: "imagens/retrato-vangogh.jpg",
        banner: "imagens/vangogh-noite-estrelada.jpg",
        works: [
          { title: "A Noite Estrelada", year: "1889", image: "imagens/vangogh-noite-estrelada.jpg" },
          { title: "Girassóis", year: "1888", image: "imagens/obra-vangogh-girassois.jpg" },
          { title: "O Quarto em Arles", year: "1888", image: "imagens/obra-vangogh-quarto-arles.jpg" }
        ]
      }
    };

    const slides = [...document.querySelectorAll(".slide")];
    const indicators = [...document.querySelectorAll(".nav-index")];
    const progress = document.querySelector(".progress span");
    const detailsOverlay = document.querySelector(".details-overlay");
    const detailsBanner = document.querySelector("#detail-banner");
    const comparisonSection = document.querySelector(".comparison-section");
    const worksTrack = document.querySelector("#works-track");
    const worksCount = document.querySelector(".works-count");
    let activeIndex = 0;
    let touchStartX = 0;
    let autoplayPaused = false;
    let autoplayTimer;

    function pauseAutoplay() {
      if (autoplayPaused) return;
      autoplayPaused = true;
      window.clearInterval(autoplayTimer);
    }

    function showSlide(index, manual = true) {
      if (manual) pauseAutoplay();
      const nextIndex = (index + slides.length) % slides.length;
      slides[activeIndex].classList.remove("active");
      slides[activeIndex].setAttribute("aria-hidden", "true");
      indicators[activeIndex].classList.remove("active");
      indicators[activeIndex].removeAttribute("aria-current");
      activeIndex = nextIndex;
      slides[activeIndex].classList.add("active");
      slides[activeIndex].setAttribute("aria-hidden", "false");
      indicators[activeIndex].classList.add("active");
      indicators[activeIndex].setAttribute("aria-current", "true");
      progress.style.width = `${((activeIndex + 1) / slides.length) * 100}%`;
    }

    function openOverlay(overlay) {
      pauseAutoplay();
      overlay.classList.add("open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      const closeButton = overlay.querySelector(".close");
      if (closeButton) closeButton.focus();
    }

    function closeOverlay(overlay) {
      overlay.classList.remove("open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    function showDetails(topicKey) {
      const topic = topics[topicKey];
      comparisonSection.hidden = topicKey !== "expressionismo";
      document.querySelector("#detail-eyebrow").textContent = topic.eyebrow;
      document.querySelector("#detail-title").textContent = topic.title;
      document.querySelector("#detail-intro").textContent = topic.intro;
      document.querySelector("#detail-context").textContent = topic.context;
      document.querySelector("#detail-bio").textContent = topic.bio;
      document.querySelector("#artist-name").textContent = topic.artist;
      document.querySelector("#artist-period").textContent = topic.period;
      detailsBanner.style.backgroundImage = `url('${topic.banner}')`;
      const portrait = document.querySelector("#artist-image");
      portrait.src = topic.portrait;
      portrait.alt = `Retrato de ${topic.artist}`;
      worksTrack.replaceChildren(...topic.works.map((work, index) => {
        const card = document.createElement("article");
        card.className = "work-card";
        card.setAttribute("aria-label", `Obra ${index + 1} de ${topic.works.length}: ${work.title}`);

        const image = document.createElement("img");
        image.src = work.image;
        image.alt = `Obra ${work.title}, de ${topic.artist}`;
        image.loading = "lazy";
        card.appendChild(image);

        const caption = document.createElement("div");
        caption.className = "work-caption";

        const title = document.createElement("h4");
        title.textContent = work.title;
        caption.appendChild(title);

        const metadata = document.createElement("p");
        const year = document.createElement("span");
        year.textContent = work.year;
        const author = document.createElement("span");
        author.textContent = topic.artist;
        metadata.append(year, author);
        caption.appendChild(metadata);
        card.appendChild(caption);
        return card;
      }));
      worksTrack.scrollLeft = 0;
      detailsOverlay.scrollTop = 0;
      openOverlay(detailsOverlay);
      requestAnimationFrame(updateWorksControls);
    }

    document.querySelector(".comparison-open").addEventListener("click", () => {
      showDetails("expressionismo");
      requestAnimationFrame(() => comparisonSection.scrollIntoView({ behavior: "smooth", block: "start" }));
    });

    function updateWorksControls() {
      const lastIndex = Math.max(worksTrack.children.length - 1, 0);
      const cardWidth = worksTrack.firstElementChild?.getBoundingClientRect().width || 1;
      const gap = Number.parseFloat(getComputedStyle(worksTrack).columnGap) || 0;
      const activeIndex = Math.min(Math.round(worksTrack.scrollLeft / (cardWidth + gap)), lastIndex);
      const visibleCount = Math.max(1, Math.floor((worksTrack.clientWidth + gap) / (cardWidth + gap)));
      const firstVisible = worksTrack.children.length ? activeIndex + 1 : 0;
      const lastVisible = Math.min(activeIndex + visibleCount, worksTrack.children.length);
      worksCount.textContent = `${String(firstVisible).padStart(2, "0")} — ${String(lastVisible).padStart(2, "0")} / ${String(worksTrack.children.length).padStart(2, "0")}`;
      document.querySelector(".works-previous").disabled = worksTrack.scrollLeft <= 2;
      document.querySelector(".works-next").disabled =
        worksTrack.scrollLeft + worksTrack.clientWidth >= worksTrack.scrollWidth - 2;
    }

    function scrollWorks(direction) {
      const card = worksTrack.querySelector(".work-card");
      if (!card) return;
      const gap = Number.parseFloat(getComputedStyle(worksTrack).columnGap) || 18;
      worksTrack.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
    }

    document.querySelectorAll(".nav-index").forEach((button, index) => {
      button.addEventListener("click", () => showSlide(index));
    });
    document.querySelector(".previous").addEventListener("click", () => showSlide(activeIndex - 1));
    document.querySelector(".next").addEventListener("click", () => showSlide(activeIndex + 1));
    document.querySelectorAll(".next-button").forEach(button => {
      button.addEventListener("click", () => showSlide(activeIndex + 1));
    });
    document.querySelectorAll(".learn-more").forEach(button => {
      button.addEventListener("click", () => showDetails(button.dataset.topic));
    });
    document.querySelector(".works-previous").addEventListener("click", () => scrollWorks(-1));
    document.querySelector(".works-next").addEventListener("click", () => scrollWorks(1));
    worksTrack.addEventListener("scroll", updateWorksControls, { passive: true });
    window.addEventListener("resize", updateWorksControls);
    document.querySelector(".close-details").addEventListener("click", () => closeOverlay(detailsOverlay));
    detailsOverlay.addEventListener("click", event => {
      if (event.target === detailsOverlay) closeOverlay(detailsOverlay);
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        if (detailsOverlay.classList.contains("open")) closeOverlay(detailsOverlay);
      }
      if (!detailsOverlay.classList.contains("open")) {
        if (event.key === "ArrowRight") showSlide(activeIndex + 1);
        if (event.key === "ArrowLeft") showSlide(activeIndex - 1);
      }
    });
    document.querySelector(".slides").addEventListener("touchstart", event => {
      pauseAutoplay();
      touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });
    document.querySelector(".slides").addEventListener("touchend", event => {
      const distance = event.changedTouches[0].screenX - touchStartX;
      if (Math.abs(distance) > 65) showSlide(activeIndex + (distance < 0 ? 1 : -1));
    }, { passive: true });

    autoplayTimer = window.setInterval(() => {
      if (!document.hidden && !detailsOverlay.classList.contains("open")) {
        showSlide(activeIndex + 1, false);
      }
    }, 2000);
