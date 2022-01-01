const Hs100Api = require('hs100-api');
//const Hs100Api = require('./tplink-smarthome-api');

const client = new Hs100Api.Client();
//const client = new Client();


const lightplug =client.getPlug({host:'192.168.230.203'});
lightplug.getInfo().then(console.log);

var last = true;
setInterval(()=>{
    last = !last;
    lightplug.setPowerState(last);

},1000);