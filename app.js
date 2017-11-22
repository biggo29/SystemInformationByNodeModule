//var http = require('http'),
var fileSystem = require('fs'),
    path = require('path');
var si = require('systeminformation');

var express = require('express')
var app = express()

var test = {
    server: [
        'https://abcde.com/ws',
        'https://efghi.com/ws',
        'https://jklmn.com/ws',
        'https://opqrst.com/ws',
        'https://uvxxyz.com/ws'    ],
    model: "",
    enableDebugger: false,
    volume: "",
    graphicsCard: "",
    SdaSoftwareVersion: "",
    SerialNumber: "",
    MachineID: "",
    displayinfos: []
};
si.osInfo(function (data) {
    test.model = data.hostname;
})
si.graphics(function (data) {
    test.graphicsCard = data.controllers[1].model;
})
si.system(function (data) {
    if (test)
        test.SerialNumber = data.serial;
})
si.system(function (data) {
    test.MachineID = data.uuid;
})
si.graphics(function (data) {
    if (data.displays.length > 0) {
        for (var i = 0; i < data.displays.length; i++) {
            data.displays[i] = {
                "port": data.displays[i].connection,
                "model_name": data.displays[i].model,
                "active": data.displays[i].resolutionx + "x" + data.displays[i].resolutiony
            }
            return test.displayinfos = data.displays[i];
        }
    }
})


app.get('/', function (req, res) {
    res.send(test)
})
app.listen(3000)