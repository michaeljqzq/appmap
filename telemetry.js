const appInsights = require('applicationinsights');
const http = require('http');

const instrumentKey = 'a75e659c-9cc6-4534-a024-7757ad917b4f';

class Telemetry {
  constructor() {
    appInsights.setup(instrumentKey);
    this.client = new appInsights.TelemetryClient(instrumentKey);
  }
  setCloudRole(role) {
    this.client.context.tags[appInsights.defaultClient.context.keys.cloudRole] = role;
  }

  setOperationParentId(id) {
    this.client.context.tags[appInsights.defaultClient.context.keys.operationParentId] = id;
  }

  setOperationId(id) {
    this.client.context.tags[appInsights.defaultClient.context.keys.operationId] = id;
  }
}

module.exports = Telemetry;