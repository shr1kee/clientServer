$(document).on('click','#filmB',function(e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/film',
        success: function (data) {
            var str = data.another;
            $('.error').text(str);
            var title=data.title;
            if(data.redirect=='/test') {
                window.location='/test?title='+title;
               // window.location = data.redirect;
            }
        }
    });
});

