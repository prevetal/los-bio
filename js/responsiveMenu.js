; (function ($) {

	// Options
	const defaults = {
		containerClass: 'menu',
		itemClass: 'item',
		minItems: 2,
		linkText: 'Ещё',
		linkTextAll: '<span></span>'
	}


	$.fn.responsiveMenu = function (options) {
		if (this.length === 0) return this

		// Support multiple elements
		if (this.length > 1) {
			this.each(function () {
				$(this).responsiveMenu(options)
			})

			return this
		}

		// Create a namespace to be used throughout the plugin
		const menu = {},
			el = this,
			$el = $(this)


		// Return if menu is already initialized
		if ($el.data('responsiveMenu')) return


		/**
		 * ===================================================================================
		 * = PRIVATE FUNCTIONS
		 * ===================================================================================
		*/
		const init = () => {
			// Merge user-supplied options with the defaults
			menu.settings = $.extend({}, defaults, options)

			// Set container element
			menu.$container = $('.' + menu.settings.containerClass)

			// Set width
			menu.containerWidth = menu.$container.width()

			// Set heights
			menu.containerHeight = menu.$container.height()
			menu.menuHeight = $el.height()

			// Set link more
			menu.$linkMore = $('<button class="more_btn">' + menu.settings.linkText + '</button>')

			// Set dropdown
			menu.$dropdown = $('<div class="dropdown"></div>')

			// Set window width
			menu.windowW = $(window).width()

			// Call Reduce
			reduceMenu()

			// Add the resize call to the window
			$(window).on('resize', resizeWindow)

			// Add 'initialized' class
			setTimeout(() => menu.$container.addClass('initialized'))
		}


		// Window resize event
		const resizeWindow = () => {
			// Update heights
			menu.containerHeight = menu.$container.height()
			menu.menuHeight = $el.height()

			// Сalling the method depending on the direction
			$(window).width() < menu.windowW
				// Call Reduce
				? reduceMenu()
				// Call Increase
				: increaseMenu()

			// Update window width
			menu.windowW = $(window).width()
		}


		// Reduce method
		const reduceMenu = (e) => {
			if (menu.menuHeight > menu.containerHeight) {
				// Move last item to dropdown
				const lastItem = $el.find('> .' + menu.settings.itemClass + ':last'),
					lastItemHtml = lastItem.prop('outerHTML')

				lastItem.remove()

				// Add more link
				if (!$el.find('.more_btn').length) {
					$el.append(menu.$linkMore)

					// Add click actions to the more btn
					menu.$linkMore.on('click', clickMoreLink)
				}

				// Set dropdown
				menu.$dropdown.prepend(lastItemHtml)
				$el.append(menu.$dropdown)

				// Update height
				menu.menuHeight = $el.height()

				// Call Reduce
				setTimeout(() => reduceMenu(), 50)
			}

			// Minimum display
			if ($el.find('> .' + menu.settings.itemClass).length < menu.settings.minItems) {
				$el.find('> .' + menu.settings.itemClass).each(function () {
					// Move last item to dropdown
					const lastItem = $el.find('> .' + menu.settings.itemClass + ':last'),
						lastItemHtml = lastItem.prop('outerHTML')

					lastItem.remove()

					// Set dropdown
					menu.$dropdown.prepend(lastItemHtml)
				})

				// Set dropdown
				$el.append(menu.$dropdown)

				// Change link more text
				menu.$linkMore.html(menu.settings.linkTextAll)
			}
		}


		// Increase method
		const increaseMenu = (e) => {
			if ($el.find('.more_btn').length) {
				// Move first item from dropdown
				const firstItem = menu.$dropdown.find('> *:first'),
					firstItemHtml = firstItem.prop('outerHTML')

				firstItem.remove()

				$el.find('.more_btn').before(firstItemHtml)

				// Checking the link more is needed
				if (!menu.$dropdown.find('> *').length) $el.find('.more_btn, .dropdown').remove()

				// Update height
				menu.menuHeight = $el.height()

				// Minimum display
				if ($el.find('> .' + menu.settings.itemClass).length < menu.settings.minItems) {
					// Call Increase
					increaseMenu()
				} else {
					menu.menuHeight <= menu.containerHeight
						// Call Increase
						? increaseMenu()
						// Call Reduce
						: reduceMenu()
				}
			}
		}


		// Add click action
		const clickMoreLink = () => {
			if (!menu.$linkMore.hasClass('active')) {
				menu.$linkMore.addClass('active')
				menu.$dropdown.fadeIn(300).addClass('show')
			} else {
				menu.$linkMore.removeClass('active')
				menu.$dropdown.fadeOut(200).removeClass('show')
			}
		}


		/**
		 * ===================================================================================
		 * = PUBLIC FUNCTIONS
		 * ===================================================================================
		*/
		el.update = () => {
			// Update heights
			menu.containerHeight = menu.$container.height()
			menu.menuHeight = $el.height()

			// Сalling the method depending on the direction
			menu.$container.width() < menu.containerWidth
				// Call Reduce
				? reduceMenu()
				// Call Increase
				: increaseMenu()
		}


		/**
		 * ===================================================================================
		 * = INIT PLUGIN
		 * ===================================================================================
		*/
		init()

		$el.data('responsiveMenu', this)

		// Returns the current jQuery object
		return this
	}
})(jQuery)