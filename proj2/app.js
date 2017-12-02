var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});

var userName;
var userSurname;
var userLogin;

const mysql = require('mysql');
app.use(bodyParser.json());
app.listen('3000', function() {
    console.log('Server started on port 3000');

});
let playerdb;

const rootdb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'nodemysql'
});
rootdb.connect(function(err){
    if(err){
        throw err;
    }
    console.log("root connected");
});
app.use(express.static(__dirname + '/public'));
app.use('/register', express.static(__dirname + '/register.html'));
app.use('/perfectgame', express.static(__dirname + '/perfectgame.html'));
app.use('/test', express.static(__dirname + '/test.html'));
app.use('/admin', express.static(__dirname + '/admin.html'));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});
app.post('/updateT', urlencodedParser, function(req,res){
    console.log(req.body);
     var tablename=req.body.name;
     var table = JSON.parse(req.body.table);
     console.log(table[0]);
    // console.log(obj);
     var h = req.body.h;
     var w = req.body.w;
//     console.log(req.body.'table[\'8[0]\']');
      var sql ='TRUNCATE TABLE '+tablename;
      var q =rootdb.query(sql, function(err,rows){
         if(err)
            throw err
        else
            {
             for (var i = 0; i < h; i++) {
                 var s = "\'";
                 for (var j = 0; j < w; j++) {
                     s += table[i][j] + "\',\'";
                 }
                 s = s.substring(0, s.length - 2);
                 //  console.log(s);
                 var sql = "insert into " + tablename + " values(" + s + ");";
                 var q = rootdb.query(sql, function (err, rows) {
                     if (err)
                         throw err;
                     else {
                     }
                 });
             }
         }


    });


});
app.get('/getList',function (req,res) {
    var sql = 'show tables from nodemysql';
    console.log(sql);
    var q=rootdb.query(sql,function (err,rows) {
        if(err)
            throw err
        else
        {
            console.log(rows);
           res.send(rows);
        }
    });
});

app.post('/getTable',urlencodedParser, function(req,res){
  //  console.log(req);
   var table = req.body.choice;
   var sql = 'select * from '+table;
   var q=rootdb.query(sql,function(err,rows){
       if(err)
           throw(err);
       else{
           res.send(rows);
       }
   });
});
app.get('/getQuest', function(req,res){
  var sql='select quest from test_film where id_quest=\'1\'';
  var q=playerdb.query(sql,function (err,rows) {
      if(err)
          throw(err);
      else {
          res.send(rows[0].quest);
      }
  })
});
app.post('/getPic',urlencodedParser, function(req,res)
{
    console.log(userName+" "+userSurname+" "+userLogin);
    var row = req.body.row;
    console.log(row);
    var sql ='select pic from test_film where id_quest=\''+row+'\'';
    var q = rootdb.query(sql, function(err,rows)
    {
        if (err)
            throw(err);
        else {
            var b64 = new Buffer(rows[0].pic).toString("base64");
            console.log(b64);
            res.writeHead(200, {'Content-Type': 'string'});
            res.end(b64);

        }
    });
    });
//});
app.post('/check',urlencodedParser, function(req ,res){
    var login =req.body.login;
    var sql='SELECT password from users where login=\''+req.body.login+'\';';
    console.log(sql);
        var q = rootdb.query(sql, function (err, rows) {
            if (err)
               throw err;
            else
            {
                try {
                    if (rows[0].password == req.body.password)
                    {
                        console.log("password is right");
                        userLogin=req.body.login;
                        var sql ='select name,surname from users where login=\''+userLogin+'\';';
                        console.log(userLogin);
                        var q = rootdb.query(sql,function(err,rows){
                            console.log(rows);
                            if(err)
                                throw err;
                            else {
                                userName = rows[0].name;
                                userSurname = rows[0].surname;
                            }

                        });
                        if(req.body.login!=='root')
                        {
                            console.log("ama playa");
                           // playerdb.disconnect();
                            playerdb = mysql.createConnection({
                                host: 'localhost',
                                user: 'player',
                                password: '123',
                                database: 'nodemysql'
                            });
                            playerdb.connect(function(err){
                                if(err){
                                    throw err;
                                }
                                console.log("player connected");
                            });
                            res.send({redirect:  '/perfectgame'});
                        }
                        else{
                            res.send({redirect: '/admin'});
                        }

                    }
                    else {
                        res.writeHead(200,{"Content-Type":"application/json"});
                        var json=JSON.stringify({another : "неверный пароль"});
                        res.end(json);
                    }
                }
                 catch(e){
                    res.writeHead(200,{"Content-Type":"application/json"});
                    var json=JSON.stringify({another : "неверный логин"});
                    res.end(json);
                }
            }
        });
   // console.log(" outer"+userLogin+" "+userName+" "+userSurname);
});
//console.log(" outer"+userLogin+" "+userName+" "+userSurname);
app.post('/registration',urlencodedParser, function(req ,res){
    var sql='select * from users where login=\''+req.body.login+'\';';
    userLogin = req.body.login;
    var password = req.body.password;
     userName = req.body.name;
    userSurname = req.body.surname;
    console.log(sql);
     var q = playerdb.query(sql, function (err, rows) {
        if (err)
            throw err;
         else {
             try {
                 var log=rows[0].login;
                 console.log("takoy login uje est");
                 res.writeHead(200,{"Content-Type":"application/json"});
                 var json=JSON.stringify({another : "такой логин уже есть, придумайте новый"});
                 res.end(json);
             }
            catch(e){
                 var nsql='insert into users (login,password, name,surname) values ('+'\''+userLogin+'\', \''+password+'\', \''+userName+'\', \''+userSurname+'\');';
                 console.log(nsql);
                 var nq=playerdb.query(nsql,function (err,rows){
                     if(err)
                         throw err;
                     else{
                         res.send({redirect:  '/perfectgame'});
                     }
                 });
             }
        }
     });
});
app.post('/film',urlencodedParser, function(req ,res){
    console.log(userName+" "+userSurname+" "+userLogin);

    res.writeHead(200,{"Content-Type":"application/json"});
    var json=JSON.stringify({title : "film",redirect :'/test'});
    res.end(json);

});


module.exports = app;
