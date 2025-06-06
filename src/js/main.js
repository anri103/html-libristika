window.onload = () => {
    // hero slider
    const swiperHero = document.querySelector('.swiperHero');
    if (swiperHero) {
        var swiper = new Swiper(swiperHero, {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false, // Continue autoplay after interaction
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }
    // slider with cards
    const swiperCards = document.querySelectorAll('.swiperCards');
    swiperCards.forEach(slider => {
        new Swiper(slider, {
            slidesPerView: 'auto',
            spaceBetween: 20,
            freeMode: true,
            loop: false,
            navigation: {
                nextEl: slider.querySelector('.swiper-button-next'),
                prevEl: slider.querySelector('.swiper-button-prev'),
            },
            breakpoints: {
                992: {
                    spaceBetween: 24,
                },
            },
        });
    });

    // button add to whishlist
    const wishlistBtn = document.querySelectorAll('.btn-add-whishlist');
    wishlistBtn.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('js-active');
        });
    });

    // auto resize editor textarea
    const autoResizeTextarea = document.querySelectorAll('.auto-resize');
    autoResizeTextarea.forEach(textarea => {
        textarea.addEventListener('input', () => {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });
}