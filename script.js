// Seleciona todas as tabs
const sliderTabs = document.querySelectorAll(".slider-tab");

// Indicador animado
const sliderIndicator = document.querySelector(".slider-indicator");

// Container da paginação
const sliderControls = document.querySelector(".slider-controls");

// Atualiza posição do indicador
const updateIndicator = (tab, index) => {
    sliderIndicator.style.transform = `translateX(${tab.offsetLeft - 20}px)`;
    sliderIndicator.style.width = `${tab.offsetWidth}px`;

    // Centraliza o item clicado
    const scrollLeft =
        tab.offsetLeft -
        sliderControls.offsetWidth / 2 +
        tab.offsetWidth / 2;

    sliderControls.scrollTo({
        left: scrollLeft,
        behavior: "smooth"
    });
};

// Inicializa o Swiper
const swiper = new Swiper('.slider-container', {
    effect: "fade",
    speed: 1300,
    autoplay: { delay: 4000 },

    navigation: {
        prevEl: "#slide-prev",
        nextEl: "#slide-next"
    },

    on: {
        slideChange: () => {
            updateIndicator(sliderTabs[swiper.activeIndex], swiper.activeIndex);
        },
        reachEnd: () => swiper.autoplay.stop()
    }
});

// Clique nas tabs
sliderTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        swiper.slideTo(index);
        updateIndicator(tab, index);
    });
});

// Inicializa o indicador
updateIndicator(sliderTabs[0], 0);

// Atualiza ao redimensionar
window.addEventListener("resize", () => {
    updateIndicator(sliderTabs[swiper.activeIndex], swiper.activeIndex);
});