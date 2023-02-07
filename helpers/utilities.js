/**
 * Title: Utilities
 * Description: Important utility functions
 * Author: Shakhawat Salam (learner)
 * Date: 02/04/2022  
 */

//dependencies
const crypto = require('crypto');
const environment = require('./environment.js');

//module scaffolding
const utilities = {};

// parse JSON string to Object
utilities.parseJSON = (jsonString) => {
    let output;


    try {
        output = JSON.parse(jsonString);
    } catch (error) {
        output = {};
    };

    return output;


};


// hash string
utilities.hash = (str) => {
    if (typeof (str) === 'string' && str.length > 0) {
        // const hash = crypto.createHmac('sha256', environment.secretKey)
        //     .update(str)
        //     .digest('hex');
        const hash = crypto.createHmac('sha256', environment.secretKey).update(str).digest('hex');


        return hash;
    }
    return false;
}



// create random string
utilities.createRandomString = (strlength) => {
    let length = strlength;
    length = typeof (strlength) === 'number' && strlength > 0 ? strlength : false;

    if (length) {
        let possiblecharacters = 'abcdefghijklmnopqrstuvwsyz123456789';
        let output = '';

        for (let i = 1; i <= length; i += 1) {
            let randomCharacter = possiblecharacters.charAt(Math.floor(Math.random() * possiblecharacters.length));

            output += randomCharacter;
        }

        return output;
    };

    return false;

};


//export module
module.exports = utilities;