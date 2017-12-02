//$('#loginB').on('click',function(e) {
$(document).on('click','#loginB',function(e) {
    e.preventDefault();
    var login = $('#input_username').val();
    console.log(login);
    var pass = $('#input_password').val();
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/check',
        data: 'login=' + login + '&password=' + pass,
        success: function (data) {
            var str = data.another;
            $('.error').text(str);
            console.log(data);
            if(data.redirect=='/perfectgame')
               document.location="http://localhost:3000/perfectgame";//= data.redirect;
            else if(data.redirect=='/admin')
                document.location="http://localhost:3000/admin";


        }
    });
});
$(document).on('click','#regB',function(e) {
    e.preventDefault();
    document.location="http://localhost:3000/register"; //= data.redirect

});
$(document).ready(function() {
    $(".username").focus(function () {
        $(".user-icon").css("left", "-48px");
    });
    $(".username").blur(function () {
        $(".user-icon").css("left", "0px");
    });

    $(".password").focus(function () {
        $(".pass-icon").css("left", "-48px");
    });
    $(".password").blur(function () {
        $(".pass-icon").css("left", "0px");
    });
});