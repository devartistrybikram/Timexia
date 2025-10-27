$(document).ready(function(){
   $('.has-child > a, .has-grand-child > a').on('click', function(e) {
      e.preventDefault();
    });
});