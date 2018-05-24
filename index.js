const telemetry = require('./telemetry');
const Device = require('./device');
const IoTHub = require('./iothub');
const Endpoint = require('./endpoint');
const uuid = require('uuid/v4');

let suffix = "f";

let devices = [new Device('Rasp pi'+suffix), new Device('Devkit'+suffix)];
let endpoints = [new Endpoint('endpoint1'+suffix), new Endpoint('endpoint2'+suffix)];
let iothub = new IoTHub('IoT Hub'+suffix);

let traceId = uuid();

async function sleep(ms) {
  return new Promise(r=>setTimeout(r,ms));
}

async function sendMessage() {
  for (let device of devices) {
    let dId = device.sendMessage(traceId);
    let rId = iothub.receiveMessage(traceId, dId);

    for (let endpoint of endpoints) {
      let dId2 = iothub.sendMessage(rId);
      endpoint.receiveMessage(traceId, dId2);
    }
    await sleep(500);
  }
}

setInterval(sendMessage, 3000);