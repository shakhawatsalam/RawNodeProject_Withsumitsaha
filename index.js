/**
 * Title: Uptime Monitoring Application
 * Description: A RESTFuL Api to monitor up or down time user defined links
 * Author: Shakhawat Salam (learner)
 * Date: 02/03/2022  
 */

//dependenciss

const http = require('http');

// app object - module scaffolding

const app = {};

//configuration
app.config = {};

//create server
app.createServer = () => {
    const server = http.createServer(handleReqRes);
};

//handle Request Response
app.handleReqRes = (req, res) => {
    // response handle
    res.end('Hello World');
};
