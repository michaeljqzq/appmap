const appInsights = require('applicationinsights');
const http = require('http');
const fs = require('fs');

const instrumentKey = 'a75e659c-9cc6-4534-a024-7757ad917b4f';

appInsights.setup(instrumentKey);
let client = appInsights.defaultClient;
client.context.tags[appInsights.defaultClient.context.keys.cloudRole] = "SQL server4";

// appInsights.start();

const REQUEST_ID_2 = "23333333-2333-2333-2333-233333332335";

http.createServer((request, response) => {
  let {mj_trace_id, mj_d_id} = request.headers;
  client.context.tags[appInsights.defaultClient.context.keys.operationId] = mj_trace_id;
  client.context.tags[appInsights.defaultClient.context.keys.operationParentId] = mj_d_id;
  client.trackRequest({
    id: REQUEST_ID_2,
    name: "request in sql",
    duration: 329,
    resultCode: 200,
    success: true,
  });
  client.context.tags[appInsights.defaultClient.context.keys.operationParentId] = REQUEST_ID_2;
  client.trackDependency({
    dependencyTypeName: "Http",
    target: "api.twitter.com",
    name: "Sql dependency",
    data: "mj-data",
    duration: 1,
    resultCode: 200,
    success: true,
  });

  response.writeHeader(200, {
    "Content-Type": "application/json"
  });
  response.write("{x:1}");
  response.end();
}).listen(8002);

// const appInsights = require('applicationinsights');
// const http = require('http');
// const fs = require('fs');

// const instrumentKey = 'a75e659c-9cc6-4534-a024-7757ad917b4f';

// appInsights.setup(instrumentKey);
// let client = appInsights.defaultClient;
// client.context.tags[appInsights.defaultClient.context.keys.cloudRole] = "SQL server";

// http.createServer((request, response) => {
//   client.trackRequest({
//     name: "GET /storage",
//     url: "http://localhost:8002/storage",
//     duration: 329,
//     resultCode: 200,
//     success: Math.random() < 0.2 ? false: true,
//     contextObjects: {
//       [appInsights.defaultClient.context.keys.operationId]: "mj-op-id",
//       [appInsights.defaultClient.context.keys.operationParentId]: "mj-parent-id",
//     }
//   });

//   response.writeHeader(200, {
//     "Content-Type": "application/json"
//   });
//   response.write("{x:1}");
//   response.end();
// }).listen(8002);