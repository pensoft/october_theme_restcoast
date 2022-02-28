
var documentHasScroll = function() {
    return window.innerHeight <= document.body.offsetHeight;
};
// var keepFooter = function(documentHasScroll){
//     if (!document.getElementById("layout-footer")){
//         return;
//     }
//
//     if(documentHasScroll){
//         document.getElementById("layout-footer").classList.remove('fixed-bottom');
//     }else{
//         document.getElementById("layout-footer").classList.add('fixed-bottom');
//     }
// }



$(document).ready(function() {
	/* MENU */
	$('.navbar-nav').attr('id', 'menu'); // please don't remove this line
	$( '<div class="calendar-top"></div>' ).insertBefore( "#calendar" );
	$( '<div class="card-profile-top"></div>' ).insertBefore( ".card.profile.card-profile" );
	var divs = $(".card-profiles > div");
	for(var i = 0; i < divs.length; i+=2) {
		divs.slice(i, i+2).wrapAll( '<div class="col-xs" />');
	}


	var headerNavbar = $('#headerNavbar');
	var width100 = $('.width100');
	var innerWidth = $('body').innerWidth();
	headerNavbar.width(innerWidth);
	width100.width(innerWidth);


	$('body').on('click', '.work_packages .accordion-toggle', function () {
		if ($(this).next(".accordion-content").is(':visible')) {
			$(this).next(".accordion-content").slideUp(300);
			$(this).children().find(".plusminus").text('+');
			$(this).children(".plusminus").html('<span class="plus"></span>');
		} else {
			$(this).next(".accordion-content").slideDown(300);
			$(this).children().find(".plusminus").text('-');
			$(this).children(".plusminus").html('<span class="minus"></span>');
		}
	});

	$('.nav.nav-pills').removeAttr('id');


	$('.contact_info .card-body .body').each(function(){
		var countParagraphs = $(this).find('p').length;
		if(countParagraphs > 1){
			$(this).find('p').first().append('<div class="dorsal">Read more</div>');
			$(this).find('p:not(:first)').wrapAll( "<div class='toogle-contact-paragraphs'></div>" )
		}

	});

	$('.dorsal').click(function () {
		var link = $(this);
		link.parent().parent().find('.toogle-contact-paragraphs').slideToggle('slow', function() {
			if ($(this).is(':visible')) {
				link.text('Read less');
			} else {
				link.text('Read more');
			}
		});

	});

	//
	// $('.content-wrapper.news .content img').each(function(){
	// 	$(this).attr('id', 'myImg');
	// 	$(this).addClass('myImages');
	// });
	//
	// $('.content-wrapper.news').after('<div id=\"myModal\" class=\"modal\">\n' +
	// 	'  <span class=\"close_modal\">&times;</span>\n' +
	// 	'  <img class=\"modal-content\" id=\"img01\">\n' +
	// 	'  <div id=\"caption\"></div>\n' +
	// 	'</div>');


	$('.tabs').each(function(){
		// For each set of tabs, we want to keep track of
		// which tab is active and its associated content
		var $active, $content, $links = $(this).find('a');
		var speed = "fast";
		var activeTab = $(location.hash);
		// If the location.hash matches one of the links, use that as the active tab.
		// If no match is found, use the first link as the initial active tab.
		$active = $($links.filter("[href=\'"+location.hash+"\']")[0] || $links[0]);

		$active.addClass('active');

		$content = $($active[0].hash);

		// Hide the remaining content
		$links.not($active).each(function () {
			$(this.hash).hide();
		});

		if(activeTab.length){
			$content.slideDown(speed);
			//scroll to element
			$('html, body').animate({
				scrollTop:  activeTab.offset().top - $('header').height()
			}, speed);
		}

		// Bind the click event handler
		$(this).find("a").click(function (e) {
			if($(this).hasClass('active')) {
				$content.slideDown({
					scrollTop: $content.offset().top - $('header').height()
				}, speed);
				var screenSize = getScreenSize();
				if (screenSize.width < 800) {
					// scroll to element
					$('html, body').animate({
						scrollTop: $content.offset().top - $('header').height() + 300  // mobile
					}, speed);
				}else{
					//scroll to element icons top
					$('html, body').animate({
						scrollTop:  $content.offset().top - $('header').height() + 300
					}, speed);
				}
				e.preventDefault();
				return false;
			}
			// Make the old tab inactive.
			$active.removeClass('active');
			// $content.slideUp({
			// 	scrollTop: $content.offset().top - $('header').height() - $('.left_sidebar').height()
			// }, speed);
			$content.hide();

			// Update the variables with the new link and content
			$active = $(this);
			$content = $(this.hash);

			location.hash = $active[0].hash;

			// Make the tab active.
			$active.addClass('active');
			$content.slideDown({
				scrollTop: $content.offset().top - $('header').height()
			}, speed);
			var screenSize = getScreenSize();
			if (screenSize.width < 800) {
				// scroll to element
				$('html, body').animate({
					scrollTop: $content.offset().top - $('header').height() + 300 // mobile
				}, speed);
			}else{
				//scroll to element icons top
				$('html, body').animate({
					scrollTop:  $content.offset().top - $('header').height() + 300
				}, speed);
			}

			// Prevent the anchor\'s default click action
			e.preventDefault();
		});
	});


// 	// create references to the modal...
// 	var modal = document.getElementById('myModal');
// // to all images -- note I'm using a class!
// 	var images = document.getElementsByClassName('myImages');
// // the image in the modal
// 	var modalImg = document.getElementById("img01");
// // and the caption in the modal
// 	var captionText = document.getElementById("caption");
//
// // Go through all of the images with our custom class
// 	for (var i = 0; i < images.length; i++) {
// 		var img = images[i];
// 		// and attach our click listener for this image.
// 		img.onclick = function(evt) {
// 			modal.style.display = "block";
// 			modalImg.src = this.src;
// 			captionText.innerHTML = this.alt;
// 		}
// 	}
//
// 	var span = document.getElementsByClassName("close_modal")[0];
//
// 	span.onclick = function() {
// 		modal.style.display = "none";
// 	}

});



function encodeURIObject(data){
    return Object.keys(data).map(function (i) {
        return encodeURIComponent(i) + '=' + encodeURIComponent(data[i])
    }).join('&');
}

function appendProfile() {
    $(document).on('profile', function (e) {
        var headerNavbarNav = $('#headerNavbarNav');
        var li = '<li class="nav-item"><a href="/profile" target = "_self">Profile</a></li >';
        headerNavbarNav.find('>ul').append(li);
    });
}
function appendSignIn(){
    $(document).on('signin', function (e) {
        var headerNavbarLogin = $('#headerNavbarNav');
        var li = '<li class="nav-item sign-in"><a href="/login" target = "_self">Login</a></li >';
		headerNavbarLogin.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}

function appendSignOut() {
    $(document).on('signout', function (e) {
        var headerNavbarNav = $('#headerNavbarNav');
        var li = '<li class="nav-item  sign-in"><a data-request="onLogout" data-request-data="redirect: \'/\'">Logout</a></li >';
        headerNavbarNav.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}

function appendSearchAndSocialMedia(){
	var liSearch = '<li class="nav-item search_field"><a href=\"javascript: void(0);\" onclick=\"showSearchForm();\"></a></li>';
	// var liSocial = '<li class="nav-item social"><a href=\"https://www.facebook.com/BiCIKLProjectH2020\" target=\"_blank\" class=\"pr p-facebook big\" target=\"_blank\"></a><a href=\"https://twitter.com/BiCIKL_H2020\" target=\"_blank\" class=\"pr p-twitter big\" target=\"_blank\"></a></li>';
	var menu = $('#menuToggle');
	// menu.find('>ul').append(liSearch).append(liSocial);
	menu.find('>ul').append(liSearch);
}

function redirectAndRefresh(url){
	$(".tabs a").each(function() {
		this.href = window.location.hash;
	});
	window.open(url, '_blank');
	location.reload();
}

function isBreakpointLarge() {
    return window.innerWidth <= 991;
}

function showSearchForm(){
	$('#layout-header').toggleClass('full-width');
	$('#search').toggle();
}

function init() {
    window.addEventListener('resize', function () {
        if (isBreakpointLarge()) {
            $('#card-carousel').slick('unslick');
        } else {
            if (typeof cardCarousel === 'function') { 
                cardCarousel({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev pr p-back"/>',
                    nextArrow: '<i class="slick-next pr p-forward"/>',
                });
             }
        }
        // keepFooter(documentHasScroll());

    });
    document.addEventListener('DOMContentLoaded', function () {
        if (!isBreakpointLarge()) {
            if (typeof cardCarousel === 'function') { 
                cardCarousel({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev pr p-back"/>',
                    nextArrow: '<i class="slick-next pr p-forward"/>',
                });
            }
        }
		appendSearchAndSocialMedia()
        // keepFooter(documentHasScroll());

    });
    // appendProfile()
    appendSignIn()
    appendSignOut()
}

init()
