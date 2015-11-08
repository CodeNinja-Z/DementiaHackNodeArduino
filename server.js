var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var r = require('rethinkdbdash')();
var async = require('async');
var bodyParser = require('body-parser');

require('./generateDatabase.js')(r, async);


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('./public/'));

io.on('connection', function(socket) {
  console.log('Client connected');
})

app.post('/schedule', function(req,res,next) {
  r.db('dementiahack').table('schedule').insert({
    id: req.body.id,
    day_of_week_1: req.body.day_of_week_1,
    day_of_week_2: req.body.day_of_week_2,
    day_of_week_3: req.body.day_of_week_3,
    day_of_week_4: req.body.day_of_week_4,
    day_of_week_5: req.body.day_of_week_5,
    day_of_week_6: req.body.day_of_week_6,
    day_of_week_7: req.body.day_of_week_7,
    time_of_day_1: req.body.time_of_day_1,
    time_of_day_2: req.body.time_of_day_2,
    time_of_day_3: req.body.time_of_day_3,
    time_of_day_4: req.body.time_of_day_4,
    date: new Date()
  })
  .run()
  .then(function(err) {
    res.send('Schedule Created!');
  })
});

app.get('/schedule/:id', function(req,res,next) {
  r.db('dementiahack').table('schedule').get(req.params.id)
  .run()
  .then(function(result) {
    res.send(result);
  });
});

app.get('/schedule', function(req,res,next) {
  r.db('dementiahack').table('schedule').orderBy({index: r.desc('date')}).limit(1)
  .run()
  .then(function(result) {
    res.send(result);
  })
})

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
    throw error;
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
        io.emit(id);
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

server.listen(3001);
