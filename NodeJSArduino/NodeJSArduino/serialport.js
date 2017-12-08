var SerialPort = require("serialport");
var portName = "COM3";
var serialport = new SerialPort(portName, {
    baudRate: 9600//,
    // Look for return and newline at the end of each data packet
    //parser: SerialPort.parsers.readline("\n")
});

serialport.on('open', function (err) {
    console.log('Serial Port open.');
    serialport.on('readable', function () {
        console.log(serialport.read().toString());
    });
    if (err) {
        console.log('Error when trying to open:' + err);
    }
});