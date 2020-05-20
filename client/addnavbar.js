$(document).ready(function () {
    let markup = '<div id="navbar"></div>'
    $('body').prepend(markup);
    $('#navbar').load('navbar.html');
});