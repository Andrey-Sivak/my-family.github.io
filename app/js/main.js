'use strict';
import * as $ from 'jquery';
import './slick.min';

// import {Validation} from "./validationClass";
import {Slider} from "./slider";

window.addEventListener('load', function () {

    (function passwordShow() {
        if (document.querySelector('.modal-sign.enter')) {
            const wrap = document.querySelector('.modal-sign.enter');
            const eye = wrap.querySelector('.eye');
            const input = wrap.querySelector('input.pass');
            const field = wrap.querySelector('.pas');

                eye.addEventListener('click', e => {
                    field.classList.toggle('hide');

                    if (field.classList.contains('hide')) {
                        input.type = 'text';
                    } else {
                        input.type = 'password';
                    }
                })
        }
    })();

    (function fixHeader() {

        const header = document.querySelector('.header');
        let sticky = header.offsetTop;

        if (document.querySelector('.menu')) {
            window.addEventListener('scroll', scrollHandler);
        }

        function scrollHandler() {
            if (window.pageYOffset > sticky + 100) {
                header.classList.add("scroll");
            } else {
                header.classList.remove("scroll");
            }
        }
    })();

    (function sliders() {

        if (document.getElementsByClassName('slider').length
            && !document.querySelector('.winners-page')) {
            const sliders = [...document.getElementsByClassName('slider')];
            const slidersObjects = [];

            for (let idx = 0; idx < sliders.length; idx++) {

                slidersObjects.push(new Slider({
                    wrap: `#slider${idx + 1}`,
                    nextArrow: `.rt${idx + 1}`,
                    prevArrow: `.lt${idx + 1}`,
                    dots: true,
                    dotsWrap: `.winners__tabs-slider_dots${idx + 1}`,
                    autoplay: false,
                }))
            }

            slidersObjects.forEach(s => s.init());
        }

        let tmp = 0;

        if (document.querySelector('.second-section__items')) {

            initSlider('.second-section__items');

            window.addEventListener('resize', function () {
                initSlider('.second-section__items');
            });
        }

        if (document.querySelector('.presents__section_slider')) {

            initSlider('.presents__section_wrap-sl');

            window.addEventListener('resize', function () {
                initSlider('.presents__section_wrap-sl');
            });

        }

        function initSlider(wrap) {
            let slider = null;
            const needWidth = 992;
            let winWidth = document.documentElement.clientWidth;

            if (tmp === 0 && needWidth > winWidth) {
                tmp = 1;

                $(wrap).slick({
                    dots: true
                });
            } else if (needWidth < winWidth && slider) {
                tmp = 0;
                slider = null;
            }
        }
    })();

    (function tabs() {
        if (document.querySelector('.winners__tabs_list')) {
            const tabs = [...document.querySelectorAll('.winners__tabs_item')];
            tabs.forEach(function (tab) {
                tab.addEventListener('click', function () {
                    if (this.classList.contains('active')) {
                        return;
                    }
                    const num = this.dataset.tab;
                    document.querySelector('.winners__tabs_item.active')
                        .classList.remove('active');
                    [...document.querySelectorAll('.winners__tabs_wrap')]
                        .forEach(function (item) {
                            if (item.classList.contains('active')) {
                                item.classList.remove('active');
                            }
                        });

                    setTimeout(() => {
                        this.classList.add('active');
                        [...document.querySelectorAll('.winners__tabs_wrap')]
                            .forEach(function (item) {
                                if (item.dataset.tabContent === num) {
                                    item.classList.remove('hide');
                                    item.classList.add('active');
                                } else {
                                    item.classList.add('hide');
                                }
                            });
                    }, 300)
                });
            });
        }
    })();

    (function select() {
        if (!document.getElementsByClassName('select').length) {
            return;
        }


        [...document.getElementsByClassName('select')].forEach(s => {
            const header = s.getElementsByClassName('select-header')[0];
            s.addEventListener('click', function () {
                this.classList.toggle('active');
            });

            const list = s.getElementsByClassName('select-list')[0];
            [...list.children].forEach(i => {
                i.addEventListener('click', function () {
                    header.innerHTML = this.innerHTML;
                    s.parentElement.getElementsByClassName('sel')[0].value = this.innerHTML;
                })
            })
        });

        if (document.querySelector('.winners__tabs_list-wrap')) {
            const selectPresent = document.querySelector('.winners__tabs_list-wrap');
            const selectPresentHeader = document.querySelector('.winners__tabs_list-header');
            selectPresentHeader.addEventListener('click', () => {
                selectPresent.classList.toggle('active');
            });
            [...document.querySelectorAll('.winners__tabs_item')].forEach(s => {
                s.addEventListener('click', function () {
                    selectPresentHeader.innerHTML = this.innerText;

                    setTimeout(() => {
                        selectPresent.classList.toggle('active');
                    }, 500)
                })
            });
        }

        function hideSelect(e) {
            [...document.getElementsByClassName('select')].forEach(s => {
                if (e.currentTarget !== s && s.classList.contains('active')) {
                    s.classList.remove('active');
                }
            })
        }
    })();

    (function navigate() {
        if (!document.getElementsByClassName('side-elements__lt').length) {
            return;
        }

        const sections = [...document.querySelectorAll('[data-section]')];
        const navigate = document.getElementsByClassName('side-elements__rt')[0];

        for (let i = 0; i < sections.length; i++) {
            const span = document.createElement('span');
            span.dataset.nav = i;
            span.addEventListener('click', nav);
            if (i === 0) {
                span.classList.add('active');
            }
            navigate.appendChild(span);

            sections[i].dataset.section = i;
        }

        $(window).scroll(function () {
            const $sections = $('[data-section]');

            $sections.each(function (i, el) {
                let top = $(el).offset().top - 100;
                let bottom = top + $(el).height();
                let scroll = $(window).scrollTop();
                let id = $(el).attr('data-section');

                if (scroll > top && scroll < bottom) {
                    $('.side-elements__rt span.active').removeClass('active');
                    $(`span[data-nav="${id}"]`).addClass('active');

                }
            })
        });

        function nav(e) {
            const target = e.target;
            const num = +target.dataset.nav;
            const targetSection = sections[num];

            [...document.querySelectorAll('[data-nav]')].forEach(n => {
                if (n === target) {
                    n.classList.add('active');
                } else if (n.classList.contains('active')) {
                    n.classList.remove('active');
                }
            });

            targetSection.scrollIntoView({
                behavior: 'smooth',
            })
        }
    })();

    (function menu() {
        if (!document.getElementsByClassName('menu').length) {
            return;
        }

        const menu = document.querySelector('.menu');
        const menuBtn = document.querySelector('.menu__btn');

        menuBtn.addEventListener('click', function (e) {
            menu.classList.toggle('active');
        })
    })();

    (function phoneMask() {
        if (!document.getElementById('winner-search')) {
            return;
        }

        new IMask(document.getElementById('winner-search'), {
            mask: '+{7}(000)000-00-00',
        });
    })();

    (function privacyNav() {
        if (document.querySelector('.privacy-page')) {

            const menu = document.querySelector('.privacy__menu_wrap');
            const elems = document.querySelectorAll('.privacy__content_item');

            [...menu.children].forEach((c, idx) => {
                c.dataset.scroll = idx;
                elems[idx].dataset.item = idx;

                c.addEventListener('click', nav);
            });

            function nav(e) {
                const target = e.target;
                const num = +target.dataset.scroll;
                const targetSection = elems[num];
                const top = targetSection.getBoundingClientRect().top + window.pageYOffset - 130;

                targetSection.scrollIntoView({
                    behavior: 'smooth',
                });

                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        }
    })();

    (function privacyMenu() {
        if (document.querySelector('.privacy__menu')) {
            const menu = document.querySelector('.privacy__menu');
            const header = document.querySelector('.privacy__menu_header');

            header.addEventListener('click', function (e) {
                menu.classList.toggle('active');
            });

            [...document.querySelectorAll('.privacy__menu_item')]
                .forEach(c => {
                    c.addEventListener('click', () => menu.classList.toggle('active'))
                })
        }
    })();

    (function QnASwitch() {
        if (document.querySelector('.q-a')) {

            const items = [...document.getElementsByClassName('q-a__item')];
            items.forEach(i => {
                const header = i.getElementsByClassName('q-a__item_caption')[0];

                header.addEventListener('click', () => {
                    i.classList.toggle('active');
                })
            })
        }

        if (document.querySelector('.q-a__menu')) {
            const menuItems = [...document.querySelectorAll('.q-a__menu_item')];
            const items = document.querySelector('.q-a__content');

            menuItems.forEach(m => {
                m.addEventListener('click', () => {
                    const topic = m.dataset.topic;

                    if (topic === 'all') {
                        [...items.children].forEach(i => {
                            i.style.display = 'block';
                        })
                    } else {
                        [...items.children].forEach(i => {
                            if (i.dataset.q !== topic) {
                                i.style.display = 'none';
                            } else {
                                i.style.display = 'block';
                            }
                        })
                    }
                })
            })
        }
    })();

    (function productCard() {
        if (document.querySelectorAll('.products__item').length) {
            [...document.querySelectorAll('.products__item')]
                .forEach(p => {
                    p.addEventListener('click', function (e) {
                        this.classList.add('no-hover');
                        setTimeout(() => {
                            this.classList.remove('no-hover');
                        }, 500);
                        this.classList.toggle('active');
                    })
                })
        }
    })();

    (function accountSearch() {
        if (document.querySelector('.second-section__search')) {
            const searches = document.querySelectorAll('.second-section__search_item');
            searches.forEach(s => {
                s.addEventListener('click', function (e) {
                    const target = e.target;

                    if (s === searches[0] && !s.classList.contains('active')) {
                        searches[1].classList.add('hide');
                        s.classList.add('active');
                    } else if (s === searches[1] && !s.classList.contains('active')) {
                        searches[0].classList.add('hide');
                        s.classList.add('active');
                    } else if (s.classList.contains('active')) {
                        s.classList.remove('active');
                        searches.forEach(sr => {
                            if (sr !== s) {
                                sr.classList.remove('hide');
                            }
                        })
                    }

                    if (target.classList.contains('second-section__search_i')) {
                        const val = target.innerHTML;
                        s.getElementsByClassName('second-section__search_header')[0]
                            .innerHTML = val;
                    }
                })
            })
        }
    })();

    /*(function formHandler() {
        if (!document.querySelector('.form')) {
            return;
        }

        const forms = [...document.querySelectorAll('.form')];

        forms.forEach(f => {
            if (f.classList.contains('index')) {

                new Validation({
                    wrap: '.form.index',
                    submitBtn: '.form__btn',
                    email: 'input.email',
                    firstName: 'input.name',
                    lastName: 'input.sel',
                    checkbox: 'input.check',
                    textarea: 'textarea',
                }).init();
            } else if (f.classList.contains('enter')) {

                new Validation({
                    wrap: '.form.enter',
                    submitBtn: '.form__btn',
                    phone: '.phone',
                    password: '.pass',
                }).init();
            } else if (f.classList.contains('register')) {

                new Validation({
                    wrap: '.form.register',
                    submitBtn: '.form__btn',
                    email: 'input.email',
                    phone: 'input.phone',
                    firstName: 'input.f-name',
                    lastName: 'input.l-name',
                    thirdName: 'input.t-name',
                    checkbox: 'input.check1',
                    checkbox1: 'input.check2',
                }).init();
            } else if (f.classList.contains('forgot')) {

                new Validation({
                    wrap: '.form.forgot',
                    submitBtn: '.form__btn',
                    phone: 'input.phone',
                }).init();
            }
        })
    })();*/

    /*(function downloadTicket() {
        if (document.querySelector('.header__download-check')) {
            const btns = document.querySelectorAll('.header__download-check');
            const modal = document.querySelector('.modal');
            const iframe = modal.querySelector('.modal__iframe');

            [...modal.querySelector('.ticket__items').children]
                .forEach(c => {
                    c.addEventListener('click', function (e) {
                        modal.querySelector('.ticket__items')
                            .parentElement
                            .removeChild(modal.querySelector('.ticket__items'));

                        iframe.style.display = 'block';
                        modal.querySelector('.ticket__caption')
                            .innerHTML = 'Загрузка фото чека';
                    })
                });

            btns.forEach(b => {
                b.addEventListener('click', () => {
                    modal.classList.add('active');
                });
            });

            modal.getElementsByClassName('close')[0]
                .addEventListener('click', () => {
                    modal.classList.remove('active');
                })
        }
    })();*/

    (function play() {
        if (document.querySelector('.modal-play')) {

            const modal = document.querySelector('.modal-play');
            const close = modal.getElementsByClassName('close')[0];
            const circle = modal.getElementsByClassName('modal-play__circle')[0];
            const turnBtn = modal.getElementsByClassName('modal-play__circle_circle')[0];
            const lamps = document.querySelectorAll('.modal-play__circle_min-round span');
            const showModalBtns = document.querySelectorAll('.show-modal');
            const popup = modal.querySelector('.popup');

            const angles = [60, 120, 180, 240, 300, 360];
            const colors = ['#E10D1A', '#199029', '#582C83', '#FFED00', '#F09002', '#119AD7'];
            let d = 360;
            let angle = null;

            let isAnimationEnd = true;
            let intrvl = null;
            let presentSector = null;

            let isConfetti = false;

            showModalBtns.forEach(b => {
                b.addEventListener('click', () => {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    isConfetti = true;
                    intrvl = null;
                })
            });

            turnBtn.addEventListener('click', function (e) {
                angle = angles[Math.floor(Math.random() * angles.length)];
                isConfetti = true;
                if (presentSector
                    && presentSector.classList.contains('active')) {

                    presentSector.classList.remove('active');
                }

                if (intrvl) {
                    clearInterval(intrvl);
                    intrvl = null;
                }

                if (isAnimationEnd) {
                    isAnimationEnd = false;
                    circle.style.transform = `rotate(-${angle + d * 3}deg)`;

                    lamps.forEach(l => {
                        let tmp = 0;
                        const interval = setInterval(() => {
                            lampsLight(l, tmp)
                        }, 100);

                        setTimeout(() => {
                            clearInterval(interval);
                        }, 12000);
                    });
                    isAnimationEnd = true;
                    d += 360;
                }
            });

            circle.addEventListener('transitionend', e => {

                if(e.target === e.currentTarget) {
                    presentSector = document.querySelector(`[data-angle="${angle}"]`);

                    setTimeout(() => {
                        popup.classList.add('active');
                    }, 1000);

                    if (isConfetti) {
                        confetti.start();
                        isConfetti = false;
                    }

                    intrvl = setInterval(() => {
                        selectElement(presentSector)
                    }, 500);
                }
            });

            popup.querySelector('.popup__btn')
                .addEventListener('click', () => {
                    popup.classList.remove('active');

                    if (!isConfetti) {
                        confetti.stop();
                    }
                });

            close.addEventListener('click', function (e) {
                modal.classList.remove('active');
                confetti.stop();
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    circle.style.transform = '';
                    isAnimationEnd = true;
                    clearInterval(intrvl);
                }, 500)
            });

            function lampsLight(item, tmp) {
                item.style.backgroundColor = colors[
                    Math.floor(Math.random() * colors.length)
                    ];
                tmp++;
            }

            function selectElement(el) {
                el.classList.toggle('active');
            }
        }
    })();

    (function optimizeHomePage() {
        if (!window.createImageBitmap) {
            const els = [...document.querySelectorAll('[data-bg]')];
            const imgs = [...document.querySelectorAll('[data-img]')];

            els.forEach((item) => {
                const style = item.currentStyle || window.getComputedStyle(item, false);
                let path = style.backgroundImage.slice(4, -1).replace(/"/g, "");
                path = path.replace('webp', 'png');
                item.style.backgroundImage = `url(${path})`;
            });

            imgs.forEach(i => {
                let path = i.getAttribute('src');
                path = path.replace('webp', 'png');
                i.setAttribute('src', path);
            })
        }
    })();

    (function popups() {
        if (document.querySelector('.modal.success')) {
            const btns = [...document.querySelectorAll('.scc')];
            btns.forEach(i => {
                i.addEventListener('click', () => {
                    const popup = document.querySelector('.s');
                    popup.classList.add('active');
                    popup.querySelector('.ticket__btn')
                        .addEventListener('click', () => {
                            popup.classList.remove('active');
                        });

                    popup.querySelector('.close')
                        .addEventListener('click', () => {
                            popup.classList.remove('active');
                        });
                });
            });
        }

        if (document.querySelector('.modal.denied')) {
            const btns = [...document.querySelectorAll('.dnn')];
            btns.forEach(i => {
                i.addEventListener('click', () => {
                    const popup = document.querySelector('.d');
                    popup.classList.add('active');
                    popup.querySelector('.ticket__btns_item')
                        .addEventListener('click', () => {
                            popup.classList.remove('active');
                        });

                    popup.querySelector('.close')
                        .addEventListener('click', () => {
                            popup.classList.remove('active');
                        });
                });
            });
        }


        // correct
        if (document.querySelector('[data-open="enter"]')
            && document.querySelector('.modal-sign.enter')) {

            const modals = [...document.querySelectorAll('[data-modal]')];
            const modalsShowBtns = [...document.querySelectorAll('[data-open]')];
            const modalsHideBtns = [...document.querySelectorAll('[data-close]')];
            let modalActive = null;

            modalsShowBtns.forEach(m => {
                m.addEventListener('click', show);
            });

            modalsHideBtns.forEach(m => {
                m.addEventListener('click', hide);
            });

            function show(e) {
                e.preventDefault();

                document.body.style.overflow = 'hidden';
                const target = e.currentTarget;

                if (!modalActive
                    || modalActive.dataset.modal !== target.dataset.open) {

                    if (modalActive) {
                        modalActive.classList.remove('active');
                        modalActive = null;
                    }

                    for (let i = 0; i < modals.length; i++) {

                        if (modals[i].dataset.modal === target.dataset.open) {
                            modals[i].classList.add('active');
                            modalActive = modals[i];

                            break;
                        }
                    }
                }
            }

            function hide(e) {
                e.preventDefault();

                document.body.style.overflow = 'auto';
                if (modalActive) {
                    modalActive.classList.remove('active');
                    modalActive = null;
                }
            }
        }
    })();

    (function privacyPageFixLeftMenu() {
        if (document.querySelector('.privacy__menu')) {
            const el = document.querySelector('.privacy__menu');


            if (document.querySelector('.menu')) {
                window.addEventListener('scroll', scrollHandler);
            }

            function scrollHandler() {
                if (window.pageYOffset > 100) {
                    el.classList.add("scroll");
                } else {
                    el.classList.remove("scroll");
                }
            }
        }
    })();

    (function tmp() {
        if (document.querySelector('.account-page')) {
            document.querySelector('.first-section__btn')
                .addEventListener('click', e => {
                    e.preventDefault();
                    document.querySelector('.download-ticket')
                        .classList.add('active');
                });

            document.querySelector('.download-ticket')
                .querySelector('.close')
                .addEventListener('click',e => {
                    document.querySelector('.download-ticket')
                        .classList.remove('active');
                })
        }
    })();
});