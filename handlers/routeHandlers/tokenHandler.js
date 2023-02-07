/**
 * Title: Token Handler
 * Description:  Handler to handle token related routs
 * Author: Shakhawat Salam (learner)
 * Date: 02/07/2022  
 */

//dependencies
const data = require('../../lib/data.js');
const { hash } = require('../../helpers/utilities.js');
const { createRandomString } = require('../../helpers/utilities.js');
const { parseJSON } = require('../../helpers/utilities.js');




//module scaffolding 
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._token[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    };

};

handler._token = {};

// TOKEN Post Method 'POST'/USER- CREATE TOKEN
handler._token.post = (requestProperties, callback) => {

    const phone = typeof (requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;

    const password = typeof (requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    if (phone && password) {
        data.read('users', phone, (err1, userData) => {
            let hashedpassword = hash(password);
            if (hashedpassword === parseJSON(userData).password) {
                let tokenId = createRandomString(20);
                let expires = Date.now() + 60 * 60 * 1000;
                let tokenObject = {
                    phone,
                    'id': tokenId,
                    expires
                };

                //store the token
                data.create('tokens', tokenId, tokenObject, (err2) => {
                    if (!err2) {
                        callback(200, tokenObject);
                    } else {
                        callback(500, {
                            error: "There was a problen in the server site!!",
                        })
                    }
                });
            } else {
                callback(400, {
                    error: "Password is not valid",
                })
            }
        });
    } else {
        callback(400, {
            error: "Your have a problem in your request",
        })
    }
};

// TOKEN Get Method 'GET'/USER-READ TOKEN
handler._token.get = (requestProperties, callback) => {

    //check the id is valid
    const id = typeof (requestProperties.queryStringObject.id) === 'string' && requestProperties.queryStringObject.id.trim().length === 20 ? requestProperties.queryStringObject.id : false;

    //
    if (id) {
        // lookup the token
        data.read('tokens', id, (err, tokenData) => {
            const token = { ...parseJSON(tokenData) };
            if (!err && token) {
                callback(200, token);
            } else {
                callback(400, {
                    error: 'Requested TOKEN was not found!'
                });
            }
        })
    } else {
        callback(400, {
            error: 'Requested TOKEN was not found!'
        });
    }
};


// Users Put Method 'PUT'USER/-UPDATE USER
handler._token.put = (requestProperties, callback) => {
    const id = typeof (requestProperties.body.id) === 'string' && requestProperties.body.id.trim().length === 20 ? requestProperties.body.id : false;

    const extend = typeof (requestProperties.body.extend) === 'boolean' && requestProperties.body.extend === true ? true : false;

    if (id && extend) {
        data.read('tokens', id, (err1, tokenData) => {
            let tokenObject = parseJSON(tokenData)
            if (tokenObject.expires > Date.now()) {
                tokenObject.expires = Date.now() + 60 * 60 * 1000;

                // store the updated token
                data.update('tokens', id, tokenObject, (err2) => {
                    if (!err2) {
                        callback(200)
                    } else {
                        callback(500, {
                            error: 'There was a server side error',
                        });
                    }
                })
            } else {
                callback(400, {
                    error: 'TOKEN already expired!'
                });
            }
        })
    } else {
        callback(400, {
            error: 'There was a problem in your request!'
        });
    }

};


// Users delete Method 'DELETE'USER/-DELETE USER
handler._token.delete = (requestProperties, callback) => {
    //check the token is valid
    const id = typeof (requestProperties.queryStringObject.id) === 'string' && requestProperties.queryStringObject.id.trim().length === 20 ? requestProperties.queryStringObject.id : false;


    //
    if (id) {
        //lookup the user
        data.read('tokens', id, (err1, tokenData) => {
            if (!err1 && tokenData) {
                data.delete('tokens', id, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'Token was successfully deleted',
                        })
                    } else {
                        callback(500, {
                            error: 'There was a server side error!!'
                        })
                    }
                });
            } else {
                callback(500, {
                    error: "There was a server side error!!"
                })
            }
        });
    } else {
        callback(400, {
            error: "There was a problem in your request"
        })
    }
};

//NORMAL VERIFY FUNCTION
handler._token.verify = (id, phone, callback) => {
    data.read('tokens', id, (err, tokenData) => {
  
        if (!err && tokenData) {
            if (parseJSON(tokenData).phone === phone && parseJSON(tokenData).expires > Date.now()) {

                callback(true);
            } else {
                callback(false);
            }
        } else {
            callback(false);
        }
    });
}


module.exports = handler;