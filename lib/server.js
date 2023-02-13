/**
 * Title: Server Library
 * Description: Server Related Files
 * Author: Shakhawat Salam (learner)
 * Date: 02/09/2022  
 */

//dependenciss

const http = require('http');
const { handleReqRes } = require('../helpers/handleReqRes.js');
const environment = require('../helpers/environment');
// const data = require('./lib/data');



// app server - module scaffolding

const server = {};





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
server.createServer = () => {
    const CreateServerVariable = http.createServer(server.handleReqRes);
    CreateServerVariable.listen(environment.port, () => {
        console.log(process.env.NODE_ENV);
        console.log(`listening to port ${environment.port}`);
    });
};

//handle Request Response
server.handleReqRes = handleReqRes;


//start the server
server.init = () => {
    server.createServer();
};


// export
module.exports = server;


