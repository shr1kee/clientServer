var urlCreator = window.URL || window.webkitURL;
function  onLoad() {
    var param=window.location.href.split("?")[1].split("=")[1];
  // $('h1').text(param);
   $.ajax(
       {
           type: 'POST',
           data: 'row='+1,
           url : 'http://localhost:3000/getPic',
           success:function(data){
               $('#pic')[0].src="data:image/png;base64,"+data;

           }

       }
   );
   $.ajax(
       {
           type: 'GET',
           url: 'http://localhost:3000/getQuest',
           success:function (data) {
               $('h1').text(data);
           }
       }
   );
}
$(document).on('click','#choiceB',function(e) {
    var radios = document.getElementsByTagName('input');
    var value;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].type === 'radio' && radios[i].checked) {
            // get value, set checked flag or do whatever you need to
            value = radios[i].value;
        }
    }
    console.log(value);
    e.preventDefault();

})
