(function () {
    var socket = io.connect(window.location.hostname + ':' + 3000);

    var baseSlider = document.getElementById('base');
    var shoulderSlider = document.getElementById('shoulder');
    var elbowSlider = document.getElementById('elbow');
    var wristVSlider = document.getElementById('wristV');
    var wristTSlider = document.getElementById('wristT');
    var gripper = document.getElementById('gripper');

    function emitValue(color, e) {
        socket.emit('move', {
            joint: joint,
            value: e.target.value
        });
    }
    baseSlider.addEventListener('change', emitValue.bind(null, 'base'));
    shoulderSlider.addEventListener('change', emitValue.bind(null, 'shoulder'));
    elbowSlider.addEventListener('change', emitValue.bind(null, 'elbow'));
    wristVSlider.addEventListener('change', emitValue.bind(null, 'wristV'));
    wristTSlider.addEventListener('change', emitValue.bind(null, 'wristT'));
    gripper.addEventListener('change', emitValue.bind(null, 'gripper'));


    socket.on('connect', function (data) {
        socket.emit('join', 'Client is connected!');
    });
    socket.on('move', function (data) {
        var joint = data.joint;
        document.getElementById(joint).value = data.value;
    });
});