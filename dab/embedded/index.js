var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyACM0', {
    baudRate: 115200
});

const termChar = '\n';

let packet = '';
let queue = null;

port.on('data', function (data) {
    // console.log('Data:', data.toString());
    packet += data.toString();
    if (packet.includes(termChar)) {
        console.log(packet);
        if (!queue) queue = packet;
        packet = '';

    }
});

const redis = require("redis");
const client = redis.createClient({
    "host": "35.229.77.174",
    "password": "myUnguessablePazzzzzword321"
});

client.on("error", function (err) {
    console.log("Error " + err);
});

setInterval(() => {
    client.publish('dab', queue);
    queue = null;
}, 1000);