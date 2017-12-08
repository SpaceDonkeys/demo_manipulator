//var five = require("johnny-five");
const five = require("johnny-five");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
var comport = process.argv[2];
var board = new five.Board({
    port: comport
});





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
    //servo.center();


    // Inject the `servo` hardware into
    // the Repl instance's context;
    // allows direct command line access
    /*this.repl.inject({
      servo: servo
    });*/


    // min()
    //
    // set all servos to the minimum degrees
    // defaults to 0
    //
    // eg. servos.min();

    // max()
    //
    // set all servos to the maximum degrees
    // defaults to 180
    //
    // eg. servos.max();

    // to( deg )
    //
    // set all servos to deg
    //
    // eg. servos.to( deg );

    // step( deg )
    //
    // step all servos by deg
    //
    // eg. servos.step( -20 );

    // stop()
    //
    // stop all servos
    //
    // eg. servos.stop();

    // each( callbackFn )
    //
    // Execute callbackFn for each active servo instance
    //
    // eg.
    // servos.each(function( servo, index ) {
    //
    //  `this` refers to the current servo instance
    //
    // });

});