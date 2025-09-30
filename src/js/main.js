// genres menu
function toggleCollapses(hideId, showId) {
    const hideElement = document.getElementById(hideId);
    const showElement = document.getElementById(showId);
    
    if (!hideElement || !showElement) return;
    
    const hideCollapse = coreui.Collapse.getInstance(hideElement) || new coreui.Collapse(hideElement, { toggle: false });
    const showCollapse = coreui.Collapse.getInstance(showElement) || new coreui.Collapse(showElement, { toggle: false });
    
    hideCollapse.hide();
    showCollapse.show();
}

window.onload = () => {

    // Получаем элементы меню
    const catalogMenu = document.getElementById('collapseCatalogMenu');
    const genresMenu = document.getElementById('collapseGenresMenu');
    const catalogTogglers = document.querySelectorAll('.js-catalog-toggler');

    // Обработчик для всех кнопок "Каталог"
    catalogTogglers.forEach(catalogToggler => {
        catalogToggler.addEventListener('click', function(e) {
            e.preventDefault();
            
            const isCatalogOpen = catalogMenu.classList.contains('show');
            const isGenresOpen = genresMenu.classList.contains('show');
            
            if (isGenresOpen) {
                // Закрываем genresMenu, не открываем catalogMenu
                const genresCollapse = coreui.Collapse.getInstance(genresMenu) || new coreui.Collapse(genresMenu, { toggle: false });
                genresCollapse.hide();
            } else {
                // Стандартное переключение catalogMenu
                const catalogCollapse = coreui.Collapse.getInstance(catalogMenu) || new coreui.Collapse(catalogMenu, { toggle: false });
                if (isCatalogOpen) {
                    catalogCollapse.hide();
                } else {
                    catalogCollapse.show();
                }
            }
        });
    });

    // Обработчики событий для отслеживания состояния меню
    if (catalogMenu) {
        catalogMenu.addEventListener('show.coreui.collapse', function() {
            document.body.classList.add('catalog-menu-active');
            document.body.classList.remove('genres-menu-active');
        });
        
        catalogMenu.addEventListener('hide.coreui.collapse', function() {
            document.body.classList.remove('catalog-menu-active');
        });
    }

    if (genresMenu) {
        genresMenu.addEventListener('show.coreui.collapse', function() {
            document.body.classList.add('genres-menu-active');
            document.body.classList.remove('catalog-menu-active');
        });
        
        genresMenu.addEventListener('hide.coreui.collapse', function() {
            document.body.classList.remove('genres-menu-active');
        });
    }

    // Инициализация начального состояния
    if (catalogMenu && catalogMenu.classList.contains('show')) {
        document.body.classList.add('catalog-menu-active');
    }
    if (genresMenu && genresMenu.classList.contains('show')) {
        document.body.classList.add('genres-menu-active');
    }

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

    // recom
    const swiperBookSeries = document.querySelectorAll('.swiperBookSeries');
    swiperBookSeries.forEach(slider => {
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

    // custom coreUI rating icon
    const coreuiCustomRating = document.querySelectorAll('.coreui-rating');
    coreuiCustomRating.forEach(rating => {
        const optionsCustomIcons1 = {
            activeIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none"><path d="M7.52447 0.463526C7.67415 0.0028708 8.32585 0.00286996 8.47553 0.463525L9.90837 4.87336C9.97531 5.07937 10.1673 5.21885 10.3839 5.21885H15.0207C15.505 5.21885 15.7064 5.83865 15.3146 6.12336L11.5633 8.84878C11.3881 8.9761 11.3148 9.20179 11.3817 9.4078L12.8145 13.8176C12.9642 14.2783 12.437 14.6613 12.0451 14.3766L8.29389 11.6512C8.11865 11.5239 7.88135 11.5239 7.70611 11.6512L3.95488 14.3766C3.56303 14.6613 3.03578 14.2783 3.18546 13.8176L4.6183 9.4078C4.68524 9.20179 4.61191 8.9761 4.43667 8.84878L0.685441 6.12336C0.293584 5.83866 0.494972 5.21885 0.979333 5.21885H5.6161C5.83272 5.21885 6.02469 5.07937 6.09163 4.87336L7.52447 0.463526Z" fill="#C3846F"></path></svg>',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none"><path d="M7.52447 0.463526C7.67415 0.0028708 8.32585 0.00286996 8.47553 0.463525L9.90837 4.87336C9.97531 5.07937 10.1673 5.21885 10.3839 5.21885H15.0207C15.505 5.21885 15.7064 5.83865 15.3146 6.12336L11.5633 8.84878C11.3881 8.9761 11.3148 9.20179 11.3817 9.4078L12.8145 13.8176C12.9642 14.2783 12.437 14.6613 12.0451 14.3766L8.29389 11.6512C8.11865 11.5239 7.88135 11.5239 7.70611 11.6512L3.95488 14.3766C3.56303 14.6613 3.03578 14.2783 3.18546 13.8176L4.6183 9.4078C4.68524 9.20179 4.61191 8.9761 4.43667 8.84878L0.685441 6.12336C0.293584 5.83866 0.494972 5.21885 0.979333 5.21885H5.6161C5.83272 5.21885 6.02469 5.07937 6.09163 4.87336L7.52447 0.463526Z" fill="#D6D6D4"></path></svg>',
            value: 0
        };
        new coreui.Rating(rating, optionsCustomIcons1);
    });

    // Инициализация всех collapse элементов
    const collapseElements = document.querySelectorAll('.collapse');
    collapseElements.forEach(element => {
        new coreui.Collapse(element, { toggle: false });
    });
}