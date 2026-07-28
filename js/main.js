const initHeroSwiper = () => {
    const hero = document.querySelector('.hero-swiper');

    if (!hero || typeof Swiper === 'undefined') return;

    new Swiper(hero, {
        loop: true,
        speed: 800,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '#hero .swiper-pagination',
            clickable: true,
            bulletElement: 'button',
        },
        a11y: {
            enabled: true,
        },
    });
};

const initHeroControl = () => {
    const control = document.querySelector('#hero .control');
    const hero = document.querySelector('.hero-swiper');

    if (!control || !hero) return;

    control.addEventListener('click', () => {
        const swiper = hero.swiper;
        const isPaused = control.classList.toggle('is-paused');

        if (swiper) {
            if (isPaused) {
                swiper.autoplay.stop();
            } else {
                swiper.autoplay.start();
            }
        }

        control.setAttribute('aria-label', isPaused ? '슬라이드 재생' : '슬라이드 일시정지');
    });
};

const duplicateCards = (list, cardSelector, copies = 2) => {
    const originalCards = [...list.querySelectorAll(`:scope > ${cardSelector}`)];

    for (let set = 0; set < copies; set += 1) {
        originalCards.forEach((card) => {
            list.appendChild(card.cloneNode(true));
        });
    }

    return originalCards.length;
};

const initPromotionSlider = () => {
    const slider = document.querySelector('.promotion-swiper');
    const list = slider?.querySelector('.promotion-list');

    if (!slider || !list || typeof Swiper === 'undefined') return;

    const cardCount = duplicateCards(list, '.promotion-card');

    new Swiper(slider, {
        loop: true,
        loopedSlides: cardCount,
        loopAdditionalSlides: cardCount,
        loopPreventsSliding: false,
        speed: 600,
        slidesPerView: 'auto',
        spaceBetween: 20,
        navigation: {
            prevEl: '.con1 .slide-button.prev',
            nextEl: '.con1 .slide-button.next',
        },
        breakpoints: {
            768: {
                slidesPerView: 'auto',
                spaceBetween: 40,
            },
        },
        a11y: {
            enabled: true,
        },
    });
};

const initLiveSlider = () => {
    const slider = document.querySelector('.live-swiper');
    const list = slider?.querySelector('.live-now__list');

    if (!slider || !list || typeof Swiper === 'undefined') return;

    const cardCount = duplicateCards(list, '.live-card');

    new Swiper(slider, {
        loop: true,
        loopedSlides: cardCount,
        loopAdditionalSlides: cardCount,
        loopPreventsSliding: false,
        speed: 600,
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 23,
        navigation: {
            prevEl: '.con2 .live-slide.prev',
            nextEl: '.con2 .live-slide.next',
        },
        a11y: {
            enabled: true,
        },
    });
};

const initRankingSlider = () => {
    const slider = document.querySelector('.ranking-swiper');
    const wrapper = slider?.querySelector('.ranking-wrapper');
    const firstGroup = wrapper?.querySelector('.ranking-group');

    if (!slider || !wrapper || !firstGroup || typeof Swiper === 'undefined') return;

    while (wrapper.children.length < 3) {
        wrapper.appendChild(firstGroup.cloneNode(true));
    }

    wrapper.querySelectorAll('.ranking-group').forEach((group) => {
        group.querySelectorAll('.ranking-card .rank').forEach((rank, index) => {
            rank.textContent = index + 1;
        });
    });

    new Swiper(slider, {
        loop: true,
        speed: 600,
        slidesPerView: 1,
        slidesPerGroup: 1,
        navigation: {
            prevEl: '.con3 .ranking-slide.prev',
            nextEl: '.con3 .ranking-slide.next',
        },
        a11y: {
            enabled: true,
        },
    });
};

const initTopButton = () => {
    const topButton = document.querySelector('#footer .top-button');
    const hero = document.querySelector('#hero');
    const footer = document.querySelector('#footer');

    if (!topButton || !hero || !footer) return;

    let isTicking = false;

    const updateTopButton = () => {
        const heroRect = hero.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        const isHeroVisible = heroRect.top < window.innerHeight && heroRect.bottom > 0;
        const isFooterVisible = footerRect.top < window.innerHeight && footerRect.bottom > 0;

        topButton.classList.toggle('is-hidden', isHeroVisible);
        topButton.classList.toggle('is-footer', !isHeroVisible && isFooterVisible);
        isTicking = false;
    };

    const requestTopButtonUpdate = () => {
        if (isTicking) return;

        isTicking = true;
        window.requestAnimationFrame(updateTopButton);
    };

    topButton.addEventListener('click', (event) => {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });

    window.addEventListener('scroll', requestTopButtonUpdate, { passive: true });
    window.addEventListener('resize', requestTopButtonUpdate);
    updateTopButton();
};

(() => {
    initHeroSwiper();
    initHeroControl();
    initPromotionSlider();
    initLiveSlider();
    initRankingSlider();
    initTopButton();
})();
