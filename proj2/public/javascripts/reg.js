$(document).on('click','#regB',function(e) {
    e.preventDefault();
    var login = $('#input_username').val();
    var pass = $('#input_password').val();
    var name = $('#input_name').val();
    var surname=$('#input_surname').val();
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/registration',
        data: 'name='+name + '&surname='+surname + '&login=' + login + '&password=' + pass,
         success: function (data) {
             var str = data.another;
             $('.error').text(str);
             if(data.redirect=='/perfectgame')
               window.location=data.redirect;
         }
    });
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