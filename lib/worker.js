/**
 * Title: Workers Library
 * Description: Worker Related Files
 * Author: Shakhawat Salam (learner)
 * Date: 02/09/2022  
 */

//dependenciss
const url = require('url');
const http = require('http');
const https = require('https');
const data = require('./data.js');
const { parseJSON } = require('../helpers/utilities.js');


// app worker - module scaffolding

const worker = {};


// lookup all the checks from database

worker.gatherAllChecks = () => {
    // get all the checks
    data.list('checks', (err1, checks) => {
        if (!err1 && checks && checks.length > 0) {
            checks.forEach(check => {
                // read the check data
                data.read('checks', check, (err2, originalCheckData) => {
                    if (!err2 && originalCheckData) {
                        // pass the data to he check validate
                        worker.validateCheckData(parseJSON(originalCheckData));

                    } else {
                        console.log('Error: Reading one of the checks data!!');
                    }
                })
            });
        } else {
            console.log('Error: could not find any checks to process!!');
        }
    });

}

// perform check 
worker.performCheck = (originalCheckData) => {
    // prepare the initial check outcome
    let checkOutCome = {
        'error': false,
        'responseCode': false
    };
    // mark the outcome has not been sent yet
    let outComeSent = false;
    // parse the hostname && full url from original data
    const parsedUrl = url.parse(originalCheckData.protocol + '://' + originalCheckData.url, true);
    const hostName = parsedUrl.hostname;
    const path = parsedUrl.path;


    // construct the request
    const requestDetails = {
        protocol: `${originalCheckData.protocol}`,
        hostname: hostName,
        method: originalCheckData.method.toUpperCase(),
        path,
        timeout: originalCheckData.timeoutSSeconds * 1000,
    };

    const protocolToUse = originalCheckData.protocol === 'http' ? http : https;

    let req = protocolToUse.request(requestDetails, (res) => {
        // grab the status of the response
        const status = res.statusCode;

        // update the check outcome and pass to the next process
        checkOutCome.responseCode = status;

        if (!outComeSent) {
            worker.processCheckOutcome(originalCheckData, checkOutCome);
            outComeSent = true;

        };

    });

    req.on('error', (e) => {
        let checkOutCome = {
            error: true,
            value: e,
        };
        // update the check outcome and pass to the next process
        if (!outComeSent) {
            worker.processCheckOutcome(originalCheckData, checkOutCome);
            outComeSent = true

        };
    });

    req.on('timeout', (e) => {
        let checkOutCome = {
            error: true,
            value: 'timeout',
        };
        // update the check outcome and pass to the next process
        if (!outComeSent) {
            worker.processCheckOutcome(originalCheckData, checkOutCome);
            outComeSent = true

        };
    })

    // req sent
    req.end();
};

// validate individual check data
worker.validateCheckData = (originalCheckData) => {
    const originalData = originalCheckData;

    if (originalCheckData && originalCheckData.id) {
        originalData.state = typeof (originalCheckData.state) === 'string' && ['up', 'down'].indexOf(originalCheckData.state) > -1 ? originalCheckData.state : 'down';


        originalData.lastChecked = typeof (originalCheckData.lastChecked) === 'number' && originalCheckData.lastChecked > 0 ? originalCheckData.lastChecked : false;


        // pass to the next process
        worker.performCheck(originalData);
    } else {
        console.log('Error: check was invalid or not properly formatted');
    }
};


// timer to execute the worker process once par minutes
worker.loop = () => {
    setInterval(() => {
        worker.gatherAllChecks();
    }, 1000 * 60);
};


//start the workers
worker.init = () => {

    // execute all the checks
    worker.gatherAllChecks();

    // call the loop so that checks continue
    worker.loop();
};


// export
module.exports = worker;


