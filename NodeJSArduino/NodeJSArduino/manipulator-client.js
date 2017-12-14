(function () {
    var socket = io.connect(window.location.hostname + ':' + 3000);

    socket.on('connect', function (data) {
        socket.emit('join', 'Client is connected!');
    });
    function emitValue(angles, e) {
        socket.emit('move', {
            angles: [baseAngle,shoulderAngle,elbowAngle,wristVAngle,wristTAngle,gripperAngle],
            value: e.target.value
        });
    }
    socket.on('move', function (data) {
        /*
        var color = data.color;
        document.getElementById(color).value = data.value;
        */
    });
});