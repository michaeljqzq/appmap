const appInsights = require('applicationinsights');
const http = require('http');
const fs = require('fs');
const request = require('request');

const instrumentKey = 'a75e659c-9cc6-4534-a024-7757ad917b4f';

appInsights.setup(instrumentKey);
let client = appInsights.defaultClient;
client.context.tags[appInsights.defaultClient.context.keys.cloudRole] = "Web server4";

const TRACE_ID = "2CA8C4F4-7362-48DF-A527-6F8A16132333";
const REQUEST_ID = "23333333-2333-2333-2333-233333332333";
const D_ID = "23333333-2333-2333-2333-233333332334";

client.context.tags[appInsights.defaultClient.context.keys.operationId] = TRACE_ID;

// appInsights.start();

http.createServer((req1, response) => {
  client.context.tags[appInsights.defaultClient.context.keys.operationParentId] = null;
  client.trackRequest({
    id: REQUEST_ID,
    name: "request in server",
    duration: 329,
    resultCode: 200,
    success: true,
  });
  client.context.tags[appInsights.defaultClient.context.keys.operationParentId] = REQUEST_ID;
  client.trackDependency({
    id: D_ID,
    dependencyTypeName: "Http",
    target: "SQL server4",
    name: "Server dependency",
    data: "mj-data",
    duration: 1,
    resultCode: 200,
    success: true,
  });
  let content = fs.readFileSync('./index.html', 'utf-8');
  request('http://localhost:8002/storage', {
    headers: {
      MJ_TRACE_ID: TRACE_ID,
      MJ_D_ID: D_ID,
    }
  }, (err, resp, body) => {
    response.writeHeader(200, {
      "Content-Type": "text/html"
    });
    content = content.replace("Hello world", "Hello world" + body);
    response.write(content);
    response.end();
  });

  request.post('http://localhost:8003/data', (err, resp, body) => {

  });

}).listen(8000);

// const appInsights = require('applicationinsights');
// const http = require('http');
// const fs = require('fs');
// const request = require('request');

// const instrumentKey = 'a75e659c-9cc6-4534-a024-7757ad917b4f';

// appInsights.setup(instrumentKey);
// let client = appInsights.defaultClient;
// client.context.tags[appInsights.defaultClient.context.keys.cloudRole] = "Web server";

// http.createServer((req1, response) => {
//   client.trackRequest({
//     name: "GET /",
//     url: "http://localhost:8000",
//     duration: 309,
//     resultCode: 200,
//     success: true
//   });

//   let content = fs.readFileSync('./index.html', 'utf-8');
//   request('http://localhost:8002/storage', (err, resp, body) =>{
//     response.writeHeader(200, {
//       "Content-Type": "text/html"
//     });
//     content = content.replace("Hello world", "Hello world" + body);
//     response.write(content);
//     response.end();
//   })

// }).listen(8000);