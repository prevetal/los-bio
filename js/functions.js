document.addEventListener("DOMContentLoaded", function () {
	// Есть ли поддержка тач событий или это apple устройство
	if (!is_touch_device() && !navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)) {
		document.documentElement.classList.add('custom_scroll')
	}


	// Ленивая загрузка
	const boxes = document.querySelectorAll('.lazyload, .animate')

	function scrollTracking(entries) {
		for (const entry of entries) {
			if (entry.intersectionRatio >= 0.2 && !entry.target.classList.contains('loaded')) {
				entry.target.src = entry.target.getAttribute('data-src')
				entry.target.classList.add('loaded')
			}

			if (entry.intersectionRatio >= 0.2 && entry.target.classList.contains('animate')) {
				entry.target.classList.add('animated')
			}
		}
	}

	const observer = new IntersectionObserver(scrollTracking, {
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	})

	boxes.forEach(element => observer.observe(element))


	// Установка ширины стандартного скроллбара
	document.documentElement.style.setProperty('--scroll_width', widthScroll() + 'px')


	// Моб. версия
	firstResize = false

	if (document.body.clientWidth < 375) {
		document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'

		firstResize = true
	}
})



// Вспомогательные функции
const setHeight = className => {
	let maxheight = 0

	className.each(function () {
		let elHeight = $(this).outerHeight()

		if (elHeight > maxheight) maxheight = elHeight
	})

	className.outerHeight(maxheight)
}


const is_touch_device = () => !!('ontouchstart' in window)


const widthScroll = () => {
	let div = document.createElement('div')

	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}



// FadeIn effect
function fadeIn(el) {
	if (!el.classList.contains('fadeIn')) {
		el.classList.remove('fadeOut')

		el.style.display = 'block'

		el.classList.add('fadeIn')
	}
}


// FadeOut effect
function fadeOut(el) {
	if (el.classList.contains('fadeIn')) {
		el.classList.remove('fadeIn')

		el.classList.add('fadeOut')

		setTimeout(() => el.style.display = 'none', 190)
	}
}



// SlideUp effect
const slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding'
	target.style.transitionDuration = duration + 'ms'
	target.style.boxSizing = 'border-box'
	target.style.height = target.offsetHeight + 'px'
	target.offsetHeight
	target.style.overflow = 'hidden'
	target.style.height = 0
	target.style.paddingTop = 0
	target.style.paddingBottom = 0
	target.style.marginTop = 0
	target.style.marginBottom = 0
	window.setTimeout(() => {
		target.style.display = 'none'
		target.style.removeProperty('height')
		target.style.removeProperty('padding-top')
		target.style.removeProperty('padding-bottom')
		target.style.removeProperty('margin-top')
		target.style.removeProperty('margin-bottom')
		target.style.removeProperty('overflow')
		target.style.removeProperty('transition-duration')
		target.style.removeProperty('transition-property')
	}, duration)
}


// SlideDown effect
const slideDown = (target, duration = 500) => {
	target.style.removeProperty('display')
	let display = window.getComputedStyle(target).display

	if (display === 'none')
		display = 'block'

	target.style.display = display
	let height = target.offsetHeight
	target.style.overflow = 'hidden'
	target.style.height = 0
	target.style.paddingTop = 0
	target.style.paddingBottom = 0
	target.style.marginTop = 0
	target.style.marginBottom = 0
	target.offsetHeight
	target.style.boxSizing = 'border-box'
	target.style.transitionProperty = "height, margin, padding"
	target.style.transitionDuration = duration + 'ms'
	target.style.height = height + 'px'
	target.style.removeProperty('padding-top')
	target.style.removeProperty('padding-bottom')
	target.style.removeProperty('margin-top')
	target.style.removeProperty('margin-bottom')
	window.setTimeout(() => {
		target.style.removeProperty('height')
		target.style.removeProperty('overflow')
		target.style.removeProperty('transition-duration')
		target.style.removeProperty('transition-property')
	}, duration)
}


// SlideToggle effect
const slideToggle = (target, duration = 500) => {
	if (window.getComputedStyle(target).display === 'none') {
		return slideDown(target, duration)
	} else {
		return slideUp(target, duration)
	}
}