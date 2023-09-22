import { sliderOpt } from 'src/app/shared/data';

export const introSlider = {
    ...sliderOpt,
    nav: false,
    loop: false,
    responsive: {
        992: {
            nav: true
        }
    }
}

export const brandSlider = {
    ...sliderOpt,
    nav: false,
    dots: true,
    margin: 30,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        420: {
            items: 3
        },
        600: {
            items: 4
        },
        900: {
            items: 5
        },
        1024: {
            items: 6
        },
        1400: {
            items: 6,
            nav: true,
            dots: false
        }
    }
}

export const productSlider = {
    ...sliderOpt,
    nav: false,
    dots: true,
    margin: 20,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        480: {
            items: 2
        },
        768: {
            items: 3
        },
        992: {
            items: 4
        },
        1280: {
            items: 5
        },
        1400: {
            items: 5,
            nav: true
        }
    }
}

export const blogSlider = {
    ...sliderOpt,
    nav: false,
    dots: true,
    items: 3,
    margin: 20,
    loop: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        992: {
            items: 3
        },
        1280: {
            items: 4,
            nav: true,
            dots: false
        }
    }
}