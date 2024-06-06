jQuery(document).ready(function(){
   
  $('.custom_menu_toggle').on('click', function(){
  	$(document.documentElement).addClass("mobile_menu_open");
  })
  $('.custom_menu_overlay, .cancel').on('click', function(){
  	$(document.documentElement).removeClass("mobile_menu_open");
  })
  
  

  $("#BackToTop").click(function () {
     $("html, body").animate({scrollTop: 0}, 1000);
  });
  
  $(window).on('scroll', function(){
  	var scrolltopVal = $(window).scrollTop();
    if(scrolltopVal > 100) {
    	$("#BackToTop").fadeIn();
    } else {
    	$("#BackToTop").fadeOut();
    }
  });
  

});