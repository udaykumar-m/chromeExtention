$(document).ready(function() {
    $('.joke').hide();
    $('.spinner').hide();
    $('.spinner').show(300);
    var currentHour = new Date().getHours();
    var greeting;
    if (currentHour >= 5 && currentHour < 12) {
      greeting = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = 'Good Afternoon';
    } else if (currentHour >= 18 && currentHour < 22) {
      greeting = 'Good Evening';
    } else {
      greeting = 'Good Night';
    }
    $('.greeting').text(greeting);
});