$(document).ready(function(){
  initParallax();
  $("#container").addClass("start");
 // $("#ball").addClass('start');
  setTimeout(function(){
    //snowStorm.start();
  },1500)
});

function initParallax(){
  var scene = $('#scene').get(0);
  var parallaxInstance = new Parallax(scene,{
    pointerEvents: true
  });
}


