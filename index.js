const express = require("express");

const bodyparser = require("body-parser");
var request =require("request");

const app = express();

app.use(bodyparser.urlencoded({ extended: true }))
app.get("/",function(req,res){
	res.sendFile(__dirname + "/index.html");
}); 
app.post("/",function(req,res){

var crypto=req.body.crypto;
var fiat=req.body.fiat;
var amount=req.body.amount;
var base="https://apiv2.bitcoinaverage.com/convert/global";
var option={
	url:"https://apiv2.bitcoinaverage.com/convert/global", 
	method:"GET",
	qs:{
		from:crypto,
		to:fiat,
		amount:amount
	}
};
var final=base+crypto+fiat;

request(option,function(error,response,body){

var data=JSON.parse(body);
var price=data.price;
var date=data.time;

res.write("<h1>current date is " +date+"</h1>");

res.write("<h1>" + amount + crypto + " is currently worth "+ price + fiat +"</h1>")

res.send();


});


});


app.listen(3000,function(){
	console.log("server started");
});