// Hero Slider
document.addEventListener("DOMContentLoaded", () => {
    const heroWrap = document.querySelector(".hero_main_wrap");
    if (!heroWrap) return;

    heroWrap.querySelectorAll("[data-slider='component']:not([data-slider='component'] [data-slider='component'])").forEach((component) => {
        if (component.dataset.scriptInitialized) return;
        component.dataset.scriptInitialized = "true";
        const swiperElement = component.querySelector(".slider_element");
        const swiperWrapper = component.querySelector(".slider_list");
        if (!swiperElement || !swiperWrapper) return;
        function flattenDisplayContents(slot) {
            if (!slot) return;
            let child = slot.firstElementChild;
            while (child && child.classList.contains("u-display-contents")) {
                while (child.firstChild) {
                    slot.insertBefore(child.firstChild, child);
                }
                slot.removeChild(child);
                child = slot.firstElementChild;
            }
        }
        flattenDisplayContents(swiperWrapper);
        function removeCMSList(slot) {
            const dynList = Array.from(slot.children).find((child) => child.classList.contains("w-dyn-list"));
            if (!dynList) return;
            const nestedItems = dynList?.querySelector(".w-dyn-items")?.children;
            if (!nestedItems) return;
            const staticWrapper = [...slot.children];
            [...nestedItems].forEach(el => { const c = [...el.children].find(c => !c.classList.contains('w-condition-invisible')); c && slot.appendChild(c); });
            staticWrapper.forEach((el) => el.remove());
        }
        removeCMSList(swiperWrapper);
        [...swiperWrapper.children].forEach((el) => el.classList.add("swiper-slide"));
        const followFinger = swiperElement.getAttribute("data-follow-finger") === "true",
            freeMode = swiperElement.getAttribute("data-free-mode") === "true",
            mousewheel = swiperElement.getAttribute("data-mousewheel") === "true",
            slideToClickedSlide = swiperElement.getAttribute("data-slide-to-clicked") === "true",
            speed = +swiperElement.getAttribute("data-speed") || 600;
        new Swiper(swiperElement, {
            slidesPerView: "auto",
            followFinger: followFinger,
            loopAdditionalSlides: 10,
            freeMode: freeMode,
            slideToClickedSlide: slideToClickedSlide,
            centeredSlides: false,
            autoHeight: false,
            speed: speed,
            mousewheel: {
                enabled: mousewheel,
                forceToAxis: true,
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            navigation: {
                nextEl: component.querySelector("[data-slider='next'] button"),
                prevEl: component.querySelector("[data-slider='previous'] button"),
            },
            pagination: {
                el: component.querySelector(".slider_bullet_list"),
                bulletActiveClass: "is-active",
                bulletClass: "slider_bullet_item",
                bulletElement: "button",
                clickable: true,
            },
            slideActiveClass: "is-active",
            slideDuplicateActiveClass: "is-active",
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            }
        });
    });
});

// Universal Slider
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-slider='component']:not([data-slider='component'] [data-slider='component'])").forEach((component) => {
        if (component.dataset.scriptInitialized) return;
        component.dataset.scriptInitialized = "true";

        const swiperElement = component.querySelector(".slider_element");
        const swiperWrapper = component.querySelector(".slider_list");
        if (!swiperElement || !swiperWrapper) return;

        function flattenDisplayContents(slot) {
            if (!slot) return;
            let child = slot.firstElementChild;
            while (child && child.classList.contains("u-display-contents")) {
                while (child.firstChild) {
                    slot.insertBefore(child.firstChild, child);
                }
                slot.removeChild(child);
                child = slot.firstElementChild;
            }
        }
        flattenDisplayContents(swiperWrapper);

        function removeCMSList(slot) {
            const dynList = Array.from(slot.children).find((child) => child.classList.contains("w-dyn-list"));
            if (!dynList) return;
            const nestedItems = dynList?.querySelector(".w-dyn-items")?.children;
            if (!nestedItems) return;
            const staticWrapper = [...slot.children];
            [...nestedItems].forEach(el => { const c = [...el.children].find(c => !c.classList.contains('w-condition-invisible')); c && slot.appendChild(c); });
            staticWrapper.forEach((el) => el.remove());
        }
        removeCMSList(swiperWrapper);

        [...swiperWrapper.children].forEach((el) => el.classList.add("swiper-slide"));

        const followFinger = swiperElement.getAttribute("data-follow-finger") === "true",
            freeMode = swiperElement.getAttribute("data-free-mode") === "true",
            mousewheel = swiperElement.getAttribute("data-mousewheel") === "true",
            slideToClickedSlide = swiperElement.getAttribute("data-slide-to-clicked") === "true",
            speed = +swiperElement.getAttribute("data-speed") || 600;

        new Swiper(swiperElement, {
            slidesPerView: "auto",
            followFinger: followFinger,
            loopAdditionalSlides: 10,
            freeMode: freeMode,
            slideToClickedSlide: slideToClickedSlide,
            centeredSlides: false,
            autoHeight: false,
            speed: speed,
            mousewheel: {
                enabled: mousewheel,
                forceToAxis: true,
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            navigation: {
                nextEl: component.querySelector("[data-slider='next'] button"),
                prevEl: component.querySelector("[data-slider='previous'] button"),
            },
            pagination: {
                el: component.querySelector(".slider_bullet_list"),
                bulletActiveClass: "is-active",
                bulletClass: "slider_bullet_item",
                bulletElement: "button",
                clickable: true,
            },
            slideActiveClass: "is-active",
            slideDuplicateActiveClass: "is-active",
        });
    });
});

// Testimonials Slide
document.addEventListener("DOMContentLoaded", () => {
    const component = document.querySelector('.testimonial_wrap');

    const swiper = new Swiper(component.querySelector('.testimonial_slider_element.swiper'), {
        speed: 400,
        spaceBetween: 80,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        on: {
            progress(swiper) {
                swiper.slides.forEach((slide) => {
                    const absProgress = Math.abs(slide.progress);
                    const scale = 1 - (0.2 * absProgress);
                    slide.style.transform = `scale(${Math.max(0.8, scale)})`;
                });
            },
            setTransition(swiper, duration) {
                swiper.slides.forEach((slide) => {
                    slide.style.transition = `transform ${duration}ms ease`;
                });
            },
        },
        navigation: {
            nextEl: component.querySelector("[data-slider='next'] button"),
            prevEl: component.querySelector("[data-slider='previous'] button"),
        },
    });
});

// Lightbox with Swiper.js
document.addEventListener('DOMContentLoaded', () => {
    // Select all lightbox wrappers
    const lightboxWrappers = document.querySelectorAll('[data-lightbox="wrapper"]');

    lightboxWrappers.forEach((wrapper, wrapperIndex) => {
        const galleryItems = wrapper.querySelectorAll('[data-lightbox="item"]');
        if (galleryItems.length === 0) return;

        const images = [];

        // Collect all images from gallery items within this wrapper
        galleryItems.forEach(item => {
            const img = item.querySelector('img');
            if (img) {
                images.push({
                    src: img.src,
                    alt: img.alt || ''
                });
            }
        });

        // Create lightbox elements specific to this wrapper
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        // Add a unique ID or data attribute if needed for debugging, but element reference is sufficient
        lightbox.dataset.lightboxInstance = wrapperIndex;

        lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close">&times;</button>
        <div class="lightbox-content">
          <div class="swiper lightbox-main-swiper">
            <div class="swiper-wrapper">
              ${images.map(img => `
                <div class="swiper-slide">
                  <img src="${img.src}" alt="${img.alt}">
                </div>
              `).join('')}
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
          <div thumbsSlider="" class="swiper lightbox-thumbs-swiper">
            <div class="swiper-wrapper">
              ${images.map(img => `
                <div class="swiper-slide">
                  <img src="${img.src}" alt="${img.alt}">
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
        document.body.appendChild(lightbox);

        const closeBtn = lightbox.querySelector('.lightbox-close');

        // Scope selectors to this specific lightbox instance
        const thumbsContainer = lightbox.querySelector('.lightbox-thumbs-swiper');
        const mainContainer = lightbox.querySelector('.lightbox-main-swiper');
        const nextButton = lightbox.querySelector('.swiper-button-next');
        const prevButton = lightbox.querySelector('.swiper-button-prev');

        // Initialize thumb swiper
        const thumbsSwiper = new Swiper(thumbsContainer, {
            spaceBetween: 10,
            slidesPerView: 'auto',
            freeMode: true,
            watchSlidesProgress: true,
            centerInsufficientSlides: true,
        });

        // Initialize main swiper
        const mainSwiper = new Swiper(mainContainer, {
            spaceBetween: 10,
            slideToClickedSlide: true,
            navigation: {
                nextEl: nextButton,
                prevEl: prevButton,
            },
            thumbs: {
                swiper: thumbsSwiper,
            },
            keyboard: {
                enabled: true,
                onlyInViewport: false,
            },
        });

        // Open lightbox
        const openLightbox = (index) => {
            mainSwiper.slideTo(index, 0);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        // Close lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        // Gallery item click handlers (scoped to items in this wrapper)
        galleryItems.forEach((item, index) => {
            const button = item.querySelector('button');
            if (button) {
                button.addEventListener('click', () => openLightbox(index));
            }
        });

        // Event listeners
        closeBtn.addEventListener('click', closeLightbox);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });

        // Global keydown listener for Escape, checking if THIS lightbox is active
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
        });
    });
});


// Cache viewport queries
const BREAKPOINT = 568;
let isLarge = window.innerWidth > BREAKPOINT;
let triggerStart = isLarge ? "top 70%" : "top 85%";

// Update cache on resize (debounced)
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        isLarge = window.innerWidth > BREAKPOINT;
        triggerStart = isLarge ? "top 70%" : "top 85%";
    }, 150);
});

const getDelay = (delay) => isLarge ? delay : 0;

const initGSAP = () => {
    if (typeof window.gsap === "undefined") {
        document.documentElement.classList.add("gsap-not-found");
        return false;
    }

    if (typeof ScrollTrigger === "undefined") {
        console.error("GSAP plugins not loaded. Please include ScrollTrigger before this script.");
        return false;
    }

    gsap.registerPlugin(ScrollTrigger);
    return true;
};

// Shared timeline defaults
const TIMELINE_DEFAULTS = {
    ease: "expo.out",
    duration: 1.4
};

// Reusable animation creator
const createScrollTimeline = (trigger, delay) =>
    gsap.timeline({
        scrollTrigger: {
            trigger,
            start: triggerStart,
            once: true
        },
        defaults: TIMELINE_DEFAULTS
    });

// Batch similar animations together
const animateElements = (selector, animationConfig) => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    elements.forEach(el => {
        el.style.visibility = "visible";
        const delay = getDelay(parseFloat(el.getAttribute("data-animation-delay")) || 0);
        const tl = createScrollTimeline(el, delay);

        animationConfig(el, tl, delay);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    if (!initGSAP()) return;

    // Batch DOM queries and reduce layout thrashing
    const batchAnimations = () => {
        // Hero Main Animation
        animateElements('[data-animation-trigger="hero-main"]', (el, tl, delay) => {
            const contents = el.querySelectorAll(".u-content-wrapper > * > *");
            const images = el.querySelectorAll("img");

            if (contents.length) {
                tl.from(contents, {
                    opacity: 0,
                    y: 100,
                    stagger: 0.05,
                    willChange: "transform, opacity"
                }, delay);
            }
            if (images.length) {
                tl.from(images, {
                    scale: 1.1,
                    duration: 3,
                    willChange: "transform"
                }, delay);
            }
        });

        // cards
        animateElements('[data-animation-trigger="card"]', (el, tl, delay) => {
            const contents = el.querySelectorAll(".u-content-wrapper > * > *");
            const cards = el.querySelectorAll('[data-animation-target="card"]');

            if (contents.length) {
                tl.from(contents, {
                    opacity: 0,
                    x: 50,
                    stagger: 0.1,
                    willChange: "transform, opacity"
                }, delay);
            }

            if (cards.length) {
                tl.from(cards, {
                    opacity: 0,
                    x: 50,
                    stagger: 0.1,
                    willChange: "transform, opacity"
                }, delay);
            }
        });

        // Timeline
        animateElements('[data-animation-trigger="timeline"]', (el, tl, delay) => {
            const contents = el.querySelectorAll(".timeline_item_content > *:not(.timeline_item_year-wrap)");
            const cards = el.querySelectorAll('[data-animation-target="timeline-tab"]');
            const years = el.querySelectorAll('.timeline_item_year');

            if (contents.length) {
                tl.from(contents, {
                    opacity: 0,
                    x: 50,
                    stagger: 0.1,
                    willChange: "transform, opacity"
                }, delay);
            }

            if (cards.length) {
                tl.from(cards, {
                    opacity: 0,
                    x: 50,
                    stagger: 0.1,
                    willChange: "transform, opacity"
                }, delay);
            }

            if (years.length) {
                tl.from(years, {
                    opacity: 0,
                    x: 50,
                    stagger: 0.1,
                    willChange: "transform, opacity"
                }, delay);
            }
        });
    };

    // Run all animations in a single batch
    requestAnimationFrame(batchAnimations);
});