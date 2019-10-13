var express=require("express"); 
var bodyParser=require("body-parser"); 

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/gfg'); 
var db = mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("Connection succeeded"); 
}) 

var app = express() 
app.use(express.static(__dirname));

app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
	extended: true
})); 

app.post('/sign_up', function(req,res){ 
	var name = req.body.name; 
	var surname =req.body.surname; 
	var age = req.body.age; 
	var nationality =req.body.nationality; 

	var data = { 
		"name": name, 
		"surname": surname, 
		"age": age, 
		"nationality": nationality 
	} 
	db.collection('details').insertOne(data,function(err, collection){ 
		if (err) throw err; 
		console.log("Record inserted Successfully"); 
			
	}); 
		
	return res.redirect('signup_success.html'); 
}) 


app.get('/',function(req,res){ 
res.set({ 
	'Access-control-Allow-Origin': '*'
    }); 
return res.redirect('index.html'); 
}).listen(3000) 


console.log("Server listening at port 3000"); 
