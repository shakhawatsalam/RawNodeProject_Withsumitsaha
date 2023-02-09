/**
 * Title: Uptime Monitoring Application
 * Description: A RESTFuL Api to monitor up or down time user defined links
 * Author: Shakhawat Salam (learner)
 * Date: 02/03/2022  
 */

//dependenciss

const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes.js');
const environment = require('./helpers/environment');
// const data = require('./lib/data');
const { sendTwilioSms } = require('./helpers/notification.js');

// app object - module scaffolding

const app = {};



sendTwilioSms('01876288562', 'Hello world', (err) => {
    console.log(`this is the error`, err);
});

//configuration
//@TODO: pore moche dibo
// Create data
// data.create('test', 'newFile', { 'name': 'Banglsdesh', 'language': 'Bangla' }, function (err) {
//     console.log(`error was`, err);
// });

// Read Data
// data.read('test', 'newFile', function (err,data) {
//     console.log(`error was`, err, data);
// });


// Update Data
// data.update('test', 'newFile', { 'name': 'England', 'language':'english'}, function (err) {
//     console.log(`error was`, err);
// });

//Delete file
// data.delete('test', 'newFile', (err) => {
//     console.log(err);
// });





//create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(process.env.NODE_ENV);
        console.log(`listening to port ${environment.port}`);
    });
};

//handle Request Response
app.handleReqRes = handleReqRes;


//start the server
app.createServer();
