// Sliders

const swiperHero = new Swiper('.swiperHero', {
    autoplay: {
        delay: 5000,
        disableOnInteraction: false, // Continue autoplay after interaction
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    loop: true,
});

const swiperCards = new Swiper('.swiperCards', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    // centeredSlides: true,
    loop: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        992: {
            spaceBetween: 24,
        },
    },
});

document.addEventListener('DOMContentLoaded', function () {
    const wishlistButtons = document.querySelectorAll('.btn-add-whishlist');

    wishlistButtons.forEach(button => {
        button.addEventListener('click', function () {
            button.classList.toggle('js-active');
        });
    });
});