(function () {
    var socket = io.connect(window.location.hostname + ':' + 3000);

    socket.on('connect', function (data) {
        socket.emit('join', 'Client is connected!');
    });
});