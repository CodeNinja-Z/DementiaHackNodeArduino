var SerialPort = require('serialport').SerialPort;
var Request = require('request');

var receivedData = "";
serialPort = new SerialPort('/dev/tty.usbmodem1411', {
  baudrate: 9600,
  // defaults for Arduino serial communication
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});

var fullData = "";

serialPort.open(function (error) {
  if ( error ) {
    console.log('failed to open: '+error);
  } else {
    console.log('Opened with Baudrate 9600');
    serialPort.on('data', function(data) {
      fullData += data;
      if (fullData.indexOf('|end|') > 0) {
        var i = fullData.indexOf('|end|');
        var response = fullData.substr(0, i);
        var res = response.replace('|end|', '');
        res = res.split('[');
        res = res[1].replace(']', '');
        res = res.split('=');
        var id = res[1];
        console.log("Response: " + id);
        fullData = "";
      }
    });
    serialPort.write("ls\n", function(err, results) {
      console.log('err ' + err);
      console.log('results ' + results);
    });
  }
});
