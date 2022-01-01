var winnus = require("winnus");

var device = winnus.getDevices()[0];
winnus.connect(device, function(data) {
  console.log("Got data "+JSON.stringify(data));
});
winnus.write("Hello\r");
setTimeout(function() {
  winnus.disconnect();
}, 1000);