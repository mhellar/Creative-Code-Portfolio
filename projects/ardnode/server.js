//load express lib
var express = require('express');
var bodyParser = require('body-parser');
var server = express.createServer();
server.use(bodyParser.urlencoded());

var five = require("johnny-five"),
  board, motor, led;
var led3;
var led6;
var led5;
var motor;
var ledrgb;


board = new five.Board();


board.on("ready", function() {
  // Create an Led on pin 13 and strobe it on/off
  // Optionally set the speed; defaults to 100ms
  led3 = new five.Led({
    // Use PWM pin 9 for fading example
    pin: 3
  });
  led6 = new five.Led({
    // Use PWM pin 9 for fading example
    pin: 6
  });
  led5 = new five.Led({
    // Use PWM pin 9 for fading example
    pin: 5
  });
  led10 = new five.Led({
    // Use PWM pin 9 for fading example
    pin: 10
  });
motor = new five.Motor({
  pin : 9
});
ledrgb = new five.Led.RGB({
    pins: {
      red: 3,
      green: 6,
      blue: 5
    }
  });




});



server.get('/', function(request, response) {
  response.render("index.ejs", "");
});

server.post('/', function(request, response) {
  board.on("ready", function() {
    led.strobe(100);
  });
  var func = request.body.func;

  console.log(request.body.func);
  //response.render("index.ejs", {"todos": todos});
  if (func === "lpulse") {
    console.log("l - pulse");
    led3.pulse();
    led6.pulse();
    led5.pulse();

  } else if (func === "lblink") {
    console.log("l - blink");
    led3.strobe(100);
    led5.strobe(100);
    led6.strobe(100);

  } else if (func === "lstrobe") {
    console.log("ls strobe - start");
    led10.strobe(100);
  } else if (func === "mstart") {
    console.log("m - start");
    motor.start(255);
  }
  else if (func === "mstop") {
    console.log("m - start");
    motor.stop();
  }
  else if (func === "lcolor1") {
    console.log("m - start");
    ledrgb.on();
    ledrgb.color("#FF0000");
  }
  else if (func === "lcolor2") {
    console.log("m - start");
    ledrgb.on();
    ledrgb.color("#0000FF");
  }
  else if (func === "lcolor3") {
    console.log("m - start");
    ledrgb.on();
    ledrgb.color("#FFFF00");
  }
  else if (func === "lcolor4") {
    console.log("m - start");
    ledrgb.on();
    ledrgb.color("#FF66FF");
  }

  else {}

});

//Point server to public folder
server.use(express.static("public"));

server.listen(8000);
