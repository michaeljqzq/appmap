const Telemetry = require('./telemetry');
const uuid = require('uuid/v4');

class Device {
  constructor(deviceId) {
    this.deviceId = deviceId;
    this.telemetry = new Telemetry();
    this.telemetry.setCloudRole(this.deviceId);
  }

  sendMessage(traceId) {
    let telemetry = this.telemetry;
    telemetry.setOperationId(traceId);

    let requestId = uuid();
    let dependencyId = uuid();

    telemetry.setOperationParentId(null);
    telemetry.client.trackRequest({
      id: requestId,
      name: "IoTHubIngress",
      duration: Math.random() * 300,
      resultCode: 200,
      success: true,
    });

    telemetry.setOperationParentId(requestId);
    telemetry.client.trackDependency({
      id: dependencyId,
      dependencyTypeName: "Http",
      target: "IoT Hub",
      name: "Server dependency",
      data: "mj-data",
      duration: 1,
      resultCode: 200,
      success: true,
    });
    telemetry.client.flush();
    return dependencyId;
  }
}

module.exports = Device;