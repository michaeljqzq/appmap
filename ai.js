const appInsights = require('applicationinsights');
const http = require('http');
const fs = require('fs');
const request = require('request');

const instrumentKey = 'a75e659c-9cc6-4534-a024-7757ad917b4f';

appInsights.setup(instrumentKey);
let client = appInsights.defaultClient;
client.context.tags[appInsights.defaultClient.context.keys.cloudRole] = "AI";

// appInsights.start();

http.createServer((req1, response) => {
  response.end();
}).listen(8004);