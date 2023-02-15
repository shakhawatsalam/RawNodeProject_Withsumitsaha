/**
 * Title: Project Initial File
 * Description: Initial file to start the node server and workers 
 * Author: Shakhawat Salam (learner)
 * Date: 02/09/2022  
 */

const server = require('./lib/server.js');
const workers = require('./lib/worker.js');
const { sendTwilioSms } = require('./helpers/notification');
// const data = require('./lib/data');

// app object - module scaffolding

const app = {};


sendTwilioSms('01876288562', 'test', (err) => {
    console.log(`this is ${err}`);
})

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



app.init = () => {
    // start the server
    server.init();
    // start the workers
    workers.init()
}


app.init();


// export the app

module.exports = app;