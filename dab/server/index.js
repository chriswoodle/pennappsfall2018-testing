const redis = require("redis");
const client = redis.createClient({
    "host": "35.229.77.174",
    "password": "myUnguessablePazzzzzword321"
});

client.on("error", function (err) {
    console.log("Error " + err);
});

client.subscribe('dab');

client.on("message", function (channel, message) {
    console.log("sub channel " + channel + ": " + message);
});