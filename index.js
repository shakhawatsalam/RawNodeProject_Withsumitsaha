/**
 * Title: Uptime Monitoring Application
 * Description: A RESTFuL Api to monitor up or down time user defined links
 * Author: Shakhawat Salam (learner)
 * Date: 02/03/2022  
 */

//dependenciss

const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes.js')

// app object - module scaffolding

const app = {};

//configuration
app.config = {
    port: 8080,
};

//create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`listening to port ${app.config.port}`);
    });
};

//handle Request Response
app.handleReqRes = handleReqRes;


//start the server
app.createServer();
