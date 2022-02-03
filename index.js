/**
 * Open and close gallery items in a lightbox
 */

const displayGalleryItem = () => {
	const gallery = document.querySelector( '.gallery' );
	const galleryItems = gallery.querySelectorAll( '.gallery__item' );
	const lightbox = gallery.querySelector( '.gallery__lightbox' );
	const lightboxImg = lightbox.querySelector( 'img' );
	const close = lightbox.querySelector( 'button' );

	for ( const item of galleryItems) {
		item.addEventListener( 'click', () => {
			const itemSrc = item.querySelector( 'img' ).getAttribute( 'src' );
			const itemAlt = item.querySelector( 'img' ).getAttribute( 'alt' );

			lightbox.classList.add( 'gallery__lightbox--visible' );
			lightboxImg.setAttribute( 'src', itemSrc );
			lightboxImg.setAttribute( 'alt', itemAlt );
			lightbox.removeAttribute( 'aria-hidden' );
			close.removeAttribute( 'tabindex' );
		} )
	};

	const closeImage = () => {
		lightbox.classList.remove( 'gallery__lightbox--visible' );
		lightbox.setAttribute( 'aria-hidden', 'true' );
		close.setAttribute( 'tabindex', '-1' );		
	}

	close.addEventListener( 'click', closeImage );

	document.addEventListener( 'keydown', ( event ) => {
		if ( 'Escape' === event.key ) {
			closeImage()
		}
	} );
}

/**
 * Open and close dropdown menu by keyboard (for screen reader users)
 */

const toggleDropdownMenu = () => {
	const menuItems = document.querySelectorAll( '.top-bar__menu-item--has-children' );

	for ( const item of menuItems ) {
		const button = item.querySelector( 'button' );
		const submenu = item.querySelector( '.top-bar__submenu' );

		button.addEventListener( 'click', () => {
			submenu.classList.toggle( 'top-bar__submenu--visible' );
			if ( 'false' === button.getAttribute( 'aria-expanded' ) ) {
				button.setAttribute( 'aria-expanded', 'true' );
			} else {
				button.setAttribute( 'aria-expanded', 'false' );
			}
		} )
	}
}

/**
 * Toggle hamburger menu and submenu by item click
 */

const toggleMobileMenu = () => {

	const hamburger = document.querySelector( '.top-bar__hamburger' );
	const menu = document.querySelector( '.top-bar nav' );
	const menuItems = document.querySelectorAll( '.top-bar__menu-item--has-children' );

	if ( hamburger && menu ) {

		hamburger.addEventListener( 'click', () => {
			menu.style.display = 'block' !== menu.style.display ? 'block' : 'none';
			if ( 'false' === hamburger.getAttribute( 'aria-expanded' ) ) {
				hamburger.setAttribute( 'aria-expanded', 'true' );
			} else {
				hamburger.setAttribute( 'aria-expanded', 'false' );
			}

			for ( const item of menuItems ) {
				item.classList.toggle( 'top-bar__menu-item--has-children-mobile' );
			}
			
			const mobileMenuItems = document.querySelectorAll( '.top-bar__menu-item--has-children-mobile' );

			for ( const item of mobileMenuItems ) {
				const submenu = item.querySelector( '.top-bar__submenu' );
				const link = item.getElementsByTagName( 'a' )[0];

				link.setAttribute( 'aria-haspopup', 'true' );

				item.addEventListener( 'click', () => {
					submenu.classList.toggle( 'top-bar__submenu--visible' );

					if ( 'false' === link.getAttribute( 'aria-expanded' ) ) {
						link.setAttribute( 'aria-expanded', 'true' );
					} else {
						link.setAttribute( 'aria-expanded', 'false' );
					}
				} )
			}
		} )


	}
}

window.addEventListener( 'DOMContentLoaded', displayGalleryItem );
window.addEventListener( 'DOMContentLoaded', toggleDropdownMenu );
window.addEventListener( 'DOMContentLoaded', toggleMobileMenu );
