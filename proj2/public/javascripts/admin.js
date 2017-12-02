function  onLoad() {
    $.ajax(
        {
            type: 'GET',
            url: 'http://localhost:3000/getList',
            success: function (data) {
                var list = $('#list')[0];
                for (var i = 0; i < data.length; i++)
                    list.options[i] = new Option(data[i].Tables_in_nodemysql);
            }
        }
    );
}
var flag = false;
var choice="";
var w,h;
$(document).on('change','#list',function(e){
    var l =$('#list')[0];
    choice = l.options[l.selectedIndex].text;
    console.log(choice);
    $.ajax(
         {
             type: 'POST',
             url: 'http://localhost:3000/getTable',
             data: 'choice='+choice,
             success: function(data){
                  h=0;
                 for (x in data) h++;

                  w = 0;
                 for (var key in data[0])
                     w++;
                 if(!flag) {
                     const table = document.createElement("table");
                     const tblbody = document.createElement("tbody");
                     for (let i = 0; i < h; i++) {
                         const row = document.createElement("tr");
                         var keys = Object.keys(data[i]);
                         for (let j = 0; j < w; j++) {
                             var key = keys[j];
                             // console.log(key);
                             let col = document.createElement("td");
                             if(key=='pic')
                              {
                                  $.ajax(
                                      {
                                          type: 'POST',
                                          data: 'row='+(i+1),
                                          url: 'http://localhost:3000/getPic',
                                          success: function(data){
                                              console.log(data);
                                              var code = "<img src=\"data:image/png;base64,"+data+"\">";

                                              col.innerHTML=code;
                                              //col.empty().append(code);
                                            //  col.src="data:image/png;base64,"+data;
                                          }
                                      }
                                  );

                              }
                              else
                             col.innerHTML = data[i][key];
                             //  col.addEventListener();
                             row.appendChild(col);
                         }
                         tblbody.appendChild(row);
                     }
                     table.appendChild(tblbody);
                     document.body.appendChild(table);
                     flag = true;
                 }
                 else{
                     const table = document.getElementsByTagName("table");
                     $('tbody').remove();
                     const tblbody=document.createElement("tbody");
                     for(let i=0; i<h;i++){
                         const row =document.createElement("tr");
                         var keys = Object.keys(data[i]);
                         for(let j=0;j<w;j++)
                         {
                             var key = keys[j];
                             let col =document.createElement("td");

                             if(key=='pic')
                             {
                                 $.ajax(
                                     {
                                         type: 'POST',
                                         data: 'row='+(i+1),
                                         url: 'http://localhost:3000/getPic',
                                         success: function(data){
                                             console.log(data);
                                             var code = "<img src=\"data:image/png;base64,"+data+"\">";

                                             col.innerHTML=code;
                                             //col.empty().append(code);
                                             //  col.src="data:image/png;base64,"+data;
                                         }
                                     }
                                 );

                             }
                             else
                             col.innerHTML = data[i][key];
                             row.appendChild(col);
                         }
                         tblbody.appendChild(row);

                     }
                     table[0].appendChild(tblbody);
                     document.body.appendChild(table[0]);
                 }


             }
         }
    );

});
$(document).on('click','td',function(e)	{
        //ловим элемент, по которому кликнули
        var t = e.target || e.srcElement;
        //получаем название тега
        var elm_name = t.tagName.toLowerCase();
        //если это инпут - ничего не делаем
        if(elm_name == 'input')	{return false;}
        var val = $(this).html();
        var code = '<input type="text" id="edit" value="'+val+'" />';
        $(this).empty().append(code);
        $('#edit').focus();
        $('#edit').blur(function()	{
            var val = $(this).val();
            $(this).parent().empty().html(val);
        });

});
$(document).on('click','#update',function(e){
    var data=[];
    var table = document.getElementsByTagName("table")[0];
    console.log(table);
     h = table.rows.length;
     w = table.rows[0].cells.length;
    console.log(h+" "+w);
    for(let i =0; i < h; i++)
    {
        var obj={

        }
        for(let j =0; j<w; j++)
        {
            obj[j]=table.rows[i].cells[j].innerHTML;
        }
        data[i]=obj;
    }
    console.log(data);

    $.ajax(
       {
           type: 'POST',
           url: 'http://localhost:3000/updateT',
           data:
               {
               table: JSON.stringify(data),
               name: choice,
               h: h,
               w: w
               },
           success: function(data){

           }
       }
   ) ;
});
