
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
	var headerNavbar = $('#headerNavbar');
	var width100 = $('.width100');
	var innerWidth = $('body').innerWidth();
	headerNavbar.width(innerWidth);
	width100.width(innerWidth);


	$('body').on('click', '.work_packages .accordion-toggle', function () {
		if ($(this).next(".accordion-content").is(':visible')) {
			$(this).next(".accordion-content").slideUp(300);
			$(this).children(".plusminus").addClass('plus');
			$(this).children(".plusminus").removeClass('minus');
		} else {
			$(this).next(".accordion-content").slideDown(300);
			$(this).children(".plusminus").removeClass('plus');
			$(this).children(".plusminus").addClass('minus');
		}
	});

	$('.nav.nav-pills').removeAttr('id');


	$('.contact_info .card-body .body, .insider-info .card-body .body').each(function(){
		var countParagraphs = $(this).find('p').length;
		if(countParagraphs > 1) {
			$(this).find('p').first().append('<div class="dorsal">Read more</div>');
			$(this).find('p:not(:first)').wrapAll("<div class='toogle-contact-paragraphs'></div>")
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

	$('<div class="col-xs-12 col-sm-3 card internal no-border" style="margin-bottom: 15px">\n' +
		'<a class="folder-background" style="display:flex; background: url(https://promicon.eu/storage/app/media/pensoft/living-documents.svg) center center no-repeat; background-size: 100px; height: 200px" href="/internal-repository/living-documents" title="Living documents"></a>\n' +
		'<h3 class="card-header"><a href="/internal-repository/living-documents" title="Living documents" style="color: #fff;">Living documents</a></h3>\n' +
		'</div>').insertAfter($('.card.internal').last());

	$('<div class="col-xs-12 col-sm-3 card internal no-border" style="margin-bottom: 15px">\n' +
		'<a class="folder-background" style="display:flex; background: url(https://promicon.eu/storage/app/media/pensoft/Dissemination-report-forms.svg) center center no-repeat; background-size: 100px; height: 200px" href="/internal-documents/dissemination-report-forms" title="Dissemination report forms"></a>\n' +
		'<h3 class="card-header"><a href="/internal-documents/dissemination-report-forms" title="Dissemination report forms" style="color: #fff;">Dissemination report forms</a></h3>\n' +
		'</div>').insertAfter($('.card.internal').last());

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

// function initAccordeon(pElem) {
// 	$('body').on('click', '.accordion-toggle', function () {
// 		if ($(this).next(".accordion-content").is(':visible')) {
// 			$(this).next(".accordion-content").slideUp(300);
// 			$(this).children(".plusminus").html('<span class="plus"></span>');
// 		} else {
// 			$(this).next(".accordion-content").slideDown(300);
// 			$(this).children(".plusminus").html('<span class="minus"></span>');
// 		}
// 	});
// }

function isBreakpointLarge() {
    return window.innerWidth <= 991;
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
        // keepFooter(documentHasScroll());

    });
    // appendProfile()
    appendSignIn()
    appendSignOut()
}

init()
