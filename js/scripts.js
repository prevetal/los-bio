// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]
OVERLAY = document.querySelector('.overlay')

header = document.querySelector('header')
headerWrap = document.querySelector('.header_wrap')


document.addEventListener('DOMContentLoaded', function () {
	// Калькулятор
	let calcSlider = document.querySelector('.calc .swiper'),
		calcSliderBtns = document.querySelectorAll('.calc .head .steps .item'),
		calcSliderFinishBtn = document.querySelectorAll('.calc .head .finish'),
		calcSliderPrevBtns = document.querySelectorAll('.calc .step .btns .prev_btn'),
		calcSliderNextBtns = document.querySelectorAll('.calc .step .btns .next_btn')

	if (calcSlider) {
		const calcSliderInt = new Swiper('.calc .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			allowTouchMove: false,
			simulateTouch: false,
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			on: {
				init: swiper => {
					setTimeout(() => setHeight($(swiper.$el).find('.step')))
				},
				resize: swiper => {
					setTimeout(() => {
						$(swiper.$el).find('.step').height('auto')
						setHeight($(swiper.$el).find('.step'))
					})
				},
				slideChange: swiper => {
					setTimeout(() => {
						if (swiper.realIndex == 4) {
							calcSliderBtns.forEach(el => el.classList.add('active'))
							$('.calc .head').addClass('last')
						} else {
							calcSliderFinishBtn.forEach(el => el.classList.remove('active'))
							$('.calc .head').removeClass('last')
							calcSliderBtns.forEach(el => el.classList.remove('active'))

							for (let index = 0; index <= swiper.realIndex; index++) {
								calcSliderBtns[index].classList.add('active')
							}
						}
					})
				}
			}
		})

		if (calcSliderBtns) {
			calcSliderBtns.forEach((el, i) => {
				el.addEventListener('click', e => {
					e.preventDefault()

					calcSliderInt.slideTo(i, 500)
				})
			})
		}

		if (calcSliderFinishBtn) {
			calcSliderFinishBtn.forEach((el, i) => {
				el.addEventListener('click', e => {
					e.preventDefault()

					calcSliderInt.slideTo(4, 500)
				})
			})
		}

		if (calcSliderPrevBtns) {
			calcSliderPrevBtns.forEach((el, i) => {
				el.addEventListener('click', e => {
					e.preventDefault()

					calcSliderInt.slidePrev(500)
				})
			})
		}

		if (calcSliderNextBtns) {
			calcSliderNextBtns.forEach((el, i) => {
				el.addEventListener('click', e => {
					e.preventDefault()

					calcSliderInt.slideNext(500)
				})
			})
		}
	}


	// Калькулятор - ползунок
	const nonLinearSlider = document.getElementById('nonlinear'),
		noUiSliderMinusBtn = document.querySelector('.calc .range .minus .btn'),
		noUiSliderPlusBtn = document.querySelector('.calc .range .plus .btn')

	if (nonLinearSlider) {
		noUiSlider.create(nonLinearSlider, {
			connect: true,
			behaviour: 'tap',
			start: 5,
			range: {
				'min': [1],
				'max': [30]
			}
		})

		let rangeNodes = [
			document.querySelector('.calc .range .input')
		]

		nonLinearSlider.noUiSlider.on('update', function (values, handle, unencoded, isTap, positions) {
			if (handle == 0) {
				rangeNodes[handle].value = parseInt(values[handle])
			}
		})


		if (noUiSliderMinusBtn && parseInt(nonLinearSlider.noUiSlider.get()) > 1) {
			noUiSliderMinusBtn.addEventListener('click', e => {
				e.preventDefault()

				nonLinearSlider.noUiSlider.updateOptions({
					start: parseInt(nonLinearSlider.noUiSlider.get()) - 1
				})
			})
		}

		if (noUiSliderPlusBtn && parseInt(nonLinearSlider.noUiSlider.get()) < 30) {
			noUiSliderPlusBtn.addEventListener('click', e => {
				e.preventDefault()

				nonLinearSlider.noUiSlider.updateOptions({
					start: parseInt(nonLinearSlider.noUiSlider.get()) + 1
				})
			})
		}
	}


	// О Евролос в интернете
	const internetSliders = [],
		internet = document.querySelectorAll('.internet .swiper')

	internet.forEach(function (el, i) {
		el.classList.add('internet_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			breakpoints: {
				0: {
					spaceBetween: 20,
					slidesPerView: 'auto'
				},
				480: {
					spaceBetween: 24,
					slidesPerView: 'auto'
				},
				1024: {
					spaceBetween: 24,
					slidesPerView: 3
				}
			}
		}

		internetSliders.push(new Swiper('.internet_s' + i, options))
	})


	// Меню
	responsiveMenu = $('.responsive_menu').responsiveMenu({
		containerClass: 'main_menu',
		itemClass: 'item',
		linkText: '<span></span>'
	})


	// Изменение количества товара
	const amountMinusBtns = document.querySelectorAll('.amount .minus'),
		amountPlusBtns = document.querySelectorAll('.amount .plus'),
		amountInputs = document.querySelectorAll('.amount .input')

	if (amountMinusBtns) {
		amountMinusBtns.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				const parent = el.closest('.amount'),
					input = parent.querySelector('.input'),
					inputVal = parseFloat(input.value),
					minimum = parseFloat(input.getAttribute('data-minimum')),
					step = parseFloat(input.getAttribute('data-step')),
					unit = input.getAttribute('data-unit')

				if (inputVal > minimum) input.value = inputVal - step + unit
			})
		})
	}

	if (amountPlusBtns) {
		amountPlusBtns.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				const parent = el.closest('.amount'),
					input = parent.querySelector('.input'),
					inputVal = parseFloat(input.value),
					maximum = parseFloat(input.getAttribute('data-maximum')),
					step = parseFloat(input.getAttribute('data-step')),
					unit = input.getAttribute('data-unit')

				if (inputVal < maximum) input.value = inputVal + step + unit
			})
		})
	}

	if (amountInputs) {
		amountInputs.forEach(el => {
			el.addEventListener('keydown', () => {
				const maximum = parseInt(el.getAttribute('data-maximum'))

				setTimeout(() => {
					if (el.value == '' || el.value == 0) el.value = parseInt(el.getAttribute('data-minimum'))
					if (el.value > maximum) el.value = maximum
				})
			})
		})
	}


	// Аккордион
	const accordions = document.querySelectorAll('.accordion_item .head'),
		accordionSpeedAnimation = 300

	if (accordions) {
		accordions.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				const item = el.closest('.accordion_item'),
					accordion = el.closest('.accordion')

				if (item.classList.contains('active')) {
					item.classList.remove('active')

					setTimeout(() => slideToggle(item.querySelector('.data'), accordionSpeedAnimation))
				} else {
					accordion.querySelector('.accordion_item').classList.remove('active')

					item.classList.add('active')
					setTimeout(() => slideToggle(item.querySelector('.data'), accordionSpeedAnimation))
				}
			})
		})
	}


	// Карточка товара
	const productSliders = [],
		products = document.querySelectorAll('.product')

	if (products) {
		products.forEach((product, i) => {
			product.querySelector('.big .swiper').classList.add('product_s' + i)
			product.querySelector('.big .swiper').setAttribute('data-index', i)

			let options = {
				loop: false,
				speed: 500,
				watchSlidesProgress: true,
				slideActiveClass: 'active',
				slideVisibleClass: 'visible',
				spaceBetween: 24,
				slidesPerView: 1,
				preloadImages: false,
				lazy: {
					enabled: true,
					checkInView: true,
					loadOnTransitionStart: true,
					loadPrevNext: true
				},
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
					clickable: true,
					bulletActiveClass: 'active'
				},
				on: {
					slideChange: swiper => {
						setTimeout(() => {
							let btns = product.querySelectorAll('.thumbs .btn')

							btns.forEach(btn => btn.classList.remove('active'))
							btns[swiper.activeIndex].classList.add('active')
						})
					}
				}
			}

			productSliders.push(new Swiper('.product_s' + i, options))

			product.querySelectorAll('.thumbs .btn').forEach(el => {
				el.addEventListener('click', e => {
					e.preventDefault()

					let sliderIndex = product.querySelector('.big .swiper').getAttribute('data-index')

					productSliders[parseInt(sliderIndex)].slideTo(el.getAttribute('data-slide-index'), 500)
				})
			})

			let moreBrtn = product.querySelector('.more_btn')

			if (moreBrtn) {
				moreBrtn.addEventListener('click', e => {
					e.preventDefault()

					product.querySelectorAll('.big a.fancy_img')[4].click()
				})
			}
		})
	}


	$('.fancy_img').fancybox({
		transitionEffect: 'slide',
		i18n: {
			'en': {
				CLOSE: 'Закрыть'
			}
		},
		thumbs: {
			autoStart: $(window).width() < 1024 ? false : true
		},
		// caption: function (instance, item) {
		// 	return $(this).find('.figcaption').html()
		// }
	})


	// Моб. меню
	const mobMenuBtn = document.querySelector('header .mob_menu_btn'),
		mobMenu = document.querySelector('.mob_menu'),
		mobMenuCloseBtn = document.querySelector('.mob_menu .close_btn')

	if (mobMenuBtn) {
		mobMenuBtn.addEventListener('click', e => {
			e.preventDefault()

			mobMenuBtn.classList.toggle('active')
			BODY.classList.toggle('menu_open')
			mobMenu.classList.toggle('show')
		})
	}

	if (mobMenuCloseBtn) {
		mobMenuCloseBtn.addEventListener('click', e => {
			e.preventDefault()

			mobMenuBtn.classList.toggle('active')
			BODY.classList.toggle('menu_open')
			mobMenu.classList.toggle('show')
		})
	}


	// Маска ввода
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true,
			})
		})
	}


	// Залипание блока
	if (WW > 1023) {
		new hcSticky('.sticky', { top: 84 })
	}


	// Мини всплывающие окна
	const miniModalBtns = document.querySelectorAll('.mini_modal_btn'),
		miniModals = document.querySelectorAll('.mini_modal')

	miniModalBtns.forEach(el => {
		let eventName = ''

		el.classList.contains('on_hover')
			? eventName = 'mouseenter'
			: eventName = 'click'

		el.addEventListener(eventName, e => {
			e.preventDefault()

			const modalId = el.getAttribute('data-modal-id')

			if (el.classList.contains('active')) {
				el.classList.remove('active')
				miniModals.forEach(modal => modal.classList.remove('active'))

				if (is_touch_device()) BODY.style = 'cursor: default;'
			} else {
				miniModalBtns.forEach(btn => btn.classList.remove('active'))
				el.classList.add('active')

				miniModals.forEach(modal => modal.classList.remove('active'))

				const modal = document.getElementById(modalId)

				modal.classList.add('active')

				if (is_touch_device()) BODY.style = 'cursor: pointer;'
			}
		})
	})

	// Закрываем всплывашку при клике за её пределами
	document.addEventListener('click', e => {
		if (!e.target.closest('.modal_cont')) {
			miniModals.forEach(modal => modal.classList.remove('active'))
			miniModalBtns.forEach(btn => btn.classList.remove('active'))

			OVERLAY.classList.remove('show')

			if (is_touch_device()) BODY.style = 'cursor: default;'
		}
	})


	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs .tab_btn', function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			const $parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				$activeTabContent = $(activeTab),
				level = $(this).data('level')

			$parent.find('.tabs .tab_btn').removeClass('active')
			$parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			$activeTabContent.addClass('active')

			miniModals.forEach(modal => modal.classList.remove('active'))
			miniModalBtns.forEach(btn => btn.classList.remove('active'))

			OVERLAY.classList.remove('show')

			if (is_touch_device()) BODY.style = 'cursor: default;'

			// Mob. tabs
			if ($(this).closest('.mob_tabs')) {
				$(this).closest('.mob_tabs').find('.btn').html($(this).html())
			}
		}
	})

	if (locationHash && $('.tabs_container').length) {
		const $activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			$activeTabContent = $(locationHash),
			$parent = $activeTab.closest('.tabs_container'),
			level = $activeTab.data('level')

		$parent.find('.tabs .tab_btn').removeClass('active')
		$parent.find('.tab_content.' + level).removeClass('active')

		$activeTab.addClass('active')
		$activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Всплывающие окна
	$('.modal_btn').click(function (e) {
		e.preventDefault()

		let modalId = $(this).data('modal')

		if (!$('body').hasClass('modal_open')) {
			$('body').addClass('modal_open')
			$('.overlay').fadeIn(300)
			$(modalId).addClass('show')
		} else {
			$('.modal').removeClass('show')
			$(modalId).addClass('show')
		}
	})

	$('.overlay, .modal .close_btn').click(function (e) {
		e.preventDefault()

		$('.overlay').fadeOut(200)
		$('body').removeClass('modal_open')
		$('.modal').removeClass('show')
	})


	// Плавная прокрутка к якорю
	const scrollBtns = document.querySelectorAll('.scroll_btn')

	if (scrollBtns) {
		scrollBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				let anchor = element.getAttribute('data-anchor')

				document.getElementById(anchor).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			})
		})
	}


	// Подсветка якоря при видении блока
	inView.offset($(window).innerHeight() * 0.5)

	if ($('.anchor_block').length) {
		inView('.anchor_block')
			.on('enter', function (el) {
				let href = $(el).attr('id')

				$('.anchors .btn').removeClass('active')
				$('.anchors .btn[data-anchor=' + href + ']').addClass('active')
			})
			.on('exit', function (el) {
				let href = $(el).attr('id')

				$('.anchors .btn[data-anchor=' + href + ']').removeClass('active')
			})
	}


	if ($('.menu_anchor_block').length) {
		inView('.menu_anchor_block')
			.on('enter', function (el) {
				let href = $(el).attr('id')

				$('header .main_menu .item button').removeClass('hover')
				$('header .main_menu .item button[data-anchor=' + href + ']').addClass('hover')
			})
			.on('exit', function (el) {
				let href = $(el).attr('id')

				$('header .main_menu .item button[data-anchor=' + href + ']').removeClass('hover')
			})
	}


	// Товары на главной
	$('.products_block .all_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active')
		$('.products_block .hide_info').slideToggle(300)

		setTimeout(() => {
			// Залипание блока
			if (WW > 1023) {
				new hcSticky('.hide_info .delay_sticky', { top: 0 })
			}
		})
	})


	$('.product_info .buy .forced_reset label').click(function () {
		setTimeout(() => {
			$(this).find('input').prop('checked')
				? $(this).closest('.data').addClass('type2')
				: $(this).closest('.data').removeClass('type2')
		})
	})


	if (is_touch_device()) {
		const subMenus = document.querySelectorAll('header .main_menu .sub_menu')

		// Подменю на тач скрине
		$('header .main_menu .item > a.sub_link').addClass('touch_link')

		$('body').on('click', 'header .main_menu .item > a.sub_link', function (e) {
			const $dropdown = $(this).next()

			if ($dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				subMenus.forEach(el => el.classList.remove('show'))
				$dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		// Закрываем под. меню при клике за её пределами
		document.addEventListener('click', e => {
			if ($(e.target).closest('.main_menu').length === 0) {
				subMenus.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})
	}


	// Моб. подвал
	$('footer .menu .title').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})
})



window.addEventListener('load', () => {
	// Fix. header
	headerInit = true,
		windowOffsetTop = window.pageYOffset

	headerWrap.style.height = header.clientHeight + 'px'

	headerInit && window.scrollY > headerWrap.clientHeight
		? header.classList.add('fixed')
		: header.classList.remove('fixed')
})



window.addEventListener('scroll', function () {
	// Fix. header
	typeof headerInit !== 'undefined' && headerInit && window.scrollY > headerWrap.clientHeight
		? header.classList.add('fixed')
		: header.classList.remove('fixed')

	typeof headerInit !== 'undefined' && headerInit && window.scrollY > headerWrap.clientHeight && windowOffsetTop > window.pageYOffset
		? header.classList.add('show')
		: header.classList.remove('show')

	windowOffsetTop = window.pageYOffset


	// First section
	let scrolled = $(window).scrollTop(),
		nextbox = $('.calc').offset().top

	if (scrolled < nextbox) {
		$('.first_section .bg').css({ 'transform': 'translate3d(0, ' + scrolled * 0.5 + 'px ,0)' })
	}
})



window.addEventListener('resize', function () {
	let windowW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Моб. версия
		if (!firstResize) {
			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'

			firstResize = true
		} else {
			firstResize = false
		}


		// Fix. header
		headerInit = false

		setTimeout(() => {
			headerInit = true

			headerWrap.style.height = 'auto'
			headerWrap.style.height = header.clientHeight

			headerInit && window.scrollY > headerWrap.clientHeight
				? header.classList.add('fixed')
				: header.classList.remove('fixed')
		}, 100)


		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
	}
})