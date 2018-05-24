const Telemetry = require('./telemetry');
const uuid = require('uuid/v4');

class IoTHub {
  constructor(iotHubId) {
    this.iotHubId = iotHubId;
    this.telemetry = new Telemetry();
    this.telemetry.setCloudRole(this.iotHubId);
  }

  receiveMessage(traceId, dependencyId, requestId2) {
    let telemetry = this.telemetry;
    telemetry.setOperationId(traceId);
    telemetry.setOperationParentId(dependencyId);
    let requestId = uuid();
    telemetry.client.trackRequest({
      id: requestId,
      name: "IoTHubIngress2",
      duration: Math.random() * 300,
      resultCode: 200,
      success: true,
    });
    telemetry.client.flush();
    return requestId;
  }

  sendMessage(requestId) {
    let telemetry = this.telemetry;
    telemetry.setOperationParentId(requestId);
    let dependencyId = uuid();
    telemetry.client.trackDependency({
      id: dependencyId,
      dependencyTypeName: "Http",
      target: "Endpoint",
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

module.exports = IoTHub;