$(document).ready(function(){
  initParallax();
  
  $('.frame').each(function() {
    $(this).addClass('start');
  });
  $("#ball").addClass('start');
  setTimeout(function(){
    snowStorm.start();
  },1500)
});

function initParallax(){
	var scene = document.getElementById('scene');
	var parallaxInstance = new Parallax(scene);
}


