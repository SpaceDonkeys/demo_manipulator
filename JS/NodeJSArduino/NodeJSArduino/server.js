var http = require('http');
var j5 = require("johnny-five");
var express = require("express");
var sock = require("ws");
//var serial = require('serialport');
var board = new j5.Board({
    port: "COM3"
});

var val;
board.on("ready", function () {
    var sensor = new j5.Sensor("A0");
    var led = new j5.Led(13);

    this.repl.inject({
        led: led
    });

    led.strobe(500);
    // Scale the sensor's data from 0-1023 to 0-10 and log changes
    sensor.on("change", function () {
        console.log(this.scaleTo(0, 10));
        val = this.fscaleTo(0, 10);
    });
});
var port = process.env.port || 1337;
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<p style=\"color:#009900\">Hello World\n</p>' + val);
}).listen(port);