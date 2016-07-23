var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var username;


app.get('/chat', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

app.get('/register.html', function (req, res) {
  res.sendfile(__dirname+'/'+'register.html');
});

//app.get('/', function (req, res) {
//  res.sendfile(__dirname+'/'+'register.html');
//});

app.get('/process_get',function(req,res){
    var response={
        first_name:req.query.first_name,
        last_name:req.query.last_name
    };
    username=response.first_name;
    console.log(response);
    
   // res.send('Hello Mr.'+response.first_name+' your Request has been registerd with us safely'+
     //       'click- http://localhost:3000/chat');
    //res.end(JSON.stringify(response));
    res.redirect('./chat'+'?varname='+username);
    
});

io.on('connection', function(socket){
    io.emit('user_connected',username);
  socket.on('chat_message', function(msg){
      io.emit('chat_message', msg);
      
    console.log(username + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});