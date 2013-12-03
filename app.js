// Dependencies
var express  = require("express");
var http     = require("http");
var jade     = require("jade");
var io       = require("socket.io");
var fs 	     = require("fs");

// Initializations
var app      = express();
var server   = http.createServer(app).listen(process.env.PORT || 5000);
var io       = io.listen(server);

var array    = new Array();


// Configure
app.configure(function() {
	// Set the view directory to /views
	app.set("views", __dirname + "/views");

	// Let's use the Jade templating language
	app.set("view engine", "jade");
	
	app.use(express.bodyParser());		
	app.use(express.cookieParser());
	app.use(express.session({ key : "mykey", secret: 'sypriscavpclient'}));
	
	// Routing Configurations
	app.use(app.router);
	app.use(express.static(__dirname + '/javascript'));
	app.use(express.static(__dirname + '/stylesheets'));
});


// Home Page
app.get("/", function(request, response) {
//response.end("hello");	
//response.send("test.html");
	response.render("home");
});

// Receive POST on Upload
app.post("/upload", function (req, res) {
	parseFile(req);
	res.redirect("/");
});

app.get("/about", function(request, response) {
	response.end("Welcome to the about page!");
});


// Socket IO
io.set("transports", ["websocket"]);  // Not sure what this does
io.set("log level", 0);               // Not sure what this does
io.sockets.on("connection", function (socket) {
	

});


