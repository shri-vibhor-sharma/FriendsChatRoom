var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs= require('fs');
var username;


app.get('/chat', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

app.get('/register', function (req, res) {
  res.sendFile(__dirname+'/'+'register.html');
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
    fs.appendFile('./tmp/users.txt','user:'+response.first_name+'\n',function(err){
        console.log(err);
    });
    
   // res.send('Hello Mr.'+response.first_name+' your Request has been registerd with us safely'+
     //       'click- http://localhost:3000/chat');
    //res.end(JSON.stringify(response));
    res.redirect('./chat'+'?varname='+username);
    
});

io.on('connection', function(socket){
    io.emit('user_connected',username);
    //write the users connected log to a text file
   
  socket.on('chat_message', function(msg){
      var message=msg+"\n";
       fs.appendFile("./tmp/users.txt",message+"\r\n",function(err){
       if(err){
           console.log(err);
       } 
    });
      
      io.emit('chat_message', msg);
      
    console.log(username + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});