//var five = require("johnny-five");
const five = require("johnny-five");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const wektor=require("vektor");
var comport = "/dev/ttyACM0";//process.argv[2];
var board = new five.Board({
    port: comport
});
var sleep = require('sleep');
app.use(express.static(__dirname));
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/manipulator.html')
});

board.on("ready", function () {
    console.log("Arduino connected on " + comport);
    /* Póki płytka nie zgłosi gotowości, piny są niedostępne ! :/ */
    var initpin = new five.Pin(12);

    /*
*** definicja serw ***
*/
    var base = new five.Servo({
        id: "BaseServo",     // User defined id
        pin: 11,           // Which pin is it attached to?
        type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
        range: [0, 180],    // Default: 0-180
        fps: 100,          // Used to calculate rate of movement between positions
        invert: false,     // Invert all specified positions
        startAt: 90,       // Immediately move to a degree
        center: false,      // overrides startAt if true and moves the servo to the center of the range
    });
    var shoulder = new five.Servo({
        id: "ShoulderServo",     // User defined id
        pin: 10,           // Which pin is it attached to?
        type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
        range: [15, 165],    // Default: 0-180
        fps: 100,          // Used to calculate rate of movement between positions
        invert: false,     // Invert all specified positions
        startAt: 90,       // Immediately move to a degree
        center: false,      // overrides startAt if true and moves the servo to the center of the range
    });
    var elbow = new five.Servo({
        id: "ElbowServo",     // User defined id
        pin: 9,           // Which pin is it attached to?
        type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
        range: [0, 180],    // Default: 0-180
        fps: 100,          // Used to calculate rate of movement between positions
        invert: false,     // Invert all specified positions
        startAt: 90,       // Immediately move to a degree
        center: false,      // overrides startAt if true and moves the servo to the center of the range
    });
    var wristV = new five.Servo({
        id: "VerticalWristServo",     // User defined id
        pin: 6,           // Which pin is it attached to?
        type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
        range: [0, 180],    // Default: 0-180
        fps: 100,          // Used to calculate rate of movement between positions
        invert: false,     // Invert all specified positions
        startAt: 90,       // Immediately move to a degree
        center: false,      // overrides startAt if true and moves the servo to the center of the range
    });
    var wristT = new five.Servo({
        id: "TwistWristServo",     // User defined id
        pin: 5,           // Which pin is it attached to?
        type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
        range: [0, 180],    // Default: 0-180
        fps: 100,          // Used to calculate rate of movement between positions
        invert: false,     // Invert all specified positions
        startAt: 90,       // Immediately move to a degree
        center: false,      // overrides startAt if true and moves the servo to the center of the range
    });
    var gripper = new five.Servo({
        id: "GripperServo",     // User defined id
        pin: 3,           // Which pin is it attached to?
        type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
        range: [10, 73],    // Default: 0-180
        fps: 100,          // Used to calculate rate of movement between positions
        invert: false,     // Invert all specified positions
        startAt: 73,       // Immediately move to a degree
        center: false,      // overrides startAt if true and moves the servo to the center of the range
    });
    initpin.high();
    io.on('connection', function (client) {
        client.on('join', function (handshake) {
            console.log(handshake);
        });
    });

    function MoveArmToPos(baseAngle, shoulderAngle, elbowAngle, wristVAngle, wristTAngle, gripAngle) {
        base.to(baseAngle);
        shoulder.to(shoulderAngle);
        elbow.to(elbowAngle);
        wristV.to(wristVAngle);
        wristT.to(wristTAngle);
        gripper.to(gripAngle);
    }
    this.repl.inject({
      base: base,
      shoulder: shoulder,
      elbow: elbow,
      wristV: wristV,
      wristT: wristT,
      gripper: gripper
    });

    //sleep.sleep(2);
    //MoveArmToPos(90,90,90,90,90,73);
    //sleep.sleep(10);
    //MoveArmToPos(180,165,15,90,10);
    //sleep.sleep(10);
    //MoveArmToPos(90,90,90,90,90,73);
    console.log(base.value + " " + shoulder.value + " "+ elbow.value + " " + wristV.value +" "+wristT.value+" "+gripper.value);
    //wristT.sweep();
    //shoulder.to(165);
    //elbow.to(135);
    //gripper.to(73);
    //gripper.to(10);
    //sleep.sleep(10);
    //MoveArmToPos(180,165,15,90,10);

    client.on('move', function (data) {
        /*
        state.red = data.color === 'red' ? data.value : state.red;
        state.green = data.color === 'green' ? data.value : state.green;
        state.blue = data.color === 'blue' ? data.value : state.blue;

        // Set the new colors
        setStateColor(state);
        */
        client.emit('move', data);
        client.broadcast.emit('move', data);
    });
});
const port = process.env.PORT || 3000;

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);