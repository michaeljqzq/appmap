const Telemetry = require('./telemetry');
const uuid = require('uuid/v4');

class Endpoint {
  constructor(endpointId) {
    this.endpointId = endpointId;
    this.telemetry = new Telemetry();
    this.telemetry.setCloudRole(this.endpointId);
  }

  receiveMessage(traceId, dependencyId) {
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
}

module.exports = Endpoint;