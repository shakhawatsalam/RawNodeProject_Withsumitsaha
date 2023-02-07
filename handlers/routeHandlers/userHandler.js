/**
 * Title: User handler
 * Description:  Handler to handle user related routes.
 * Author: Shakhawat Salam (learner)
 * Date: 02/04/2022  
 */

//dependencies
const data = require('../../lib/data.js');
const { hash } = require('../../helpers/utilities.js');
const { parseJSON } = require('../../helpers/utilities.js');
const tokenHandler = require('./tokenHandler.js')




//module scaffolding 
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    };

};

handler._users = {};

// Users Post Method 'POST'/USER- CREATE USER
handler._users.post = (requestProperties, callback) => {
    const firstName = typeof (requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;

    const lastName = typeof (requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;

    const phone = typeof (requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;

    const password = typeof (requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    const tosAgreement =
        typeof (requestProperties.body.tosAgreement) === 'boolean' &&
            requestProperties.body.tosAgreement
            ? requestProperties.body.tosAgreement
            : false;

    console.log(firstName, lastName, phone, password, tosAgreement);

    if (firstName && lastName && phone && password && tosAgreement) {

        //make sure that the user does't not already exist 
        data.read('users', phone, (err1) => {
            if (err1) {
                let userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };

                //store the user to db
                data.create('users', phone, userObject, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'User was created successfully',
                        });
                    } else {
                        callback(500, { 'error': 'Could not create user!' });
                    }
                })

            } else {
                callback(500, {
                    error: 'There was a problem in server side',
                })
            }
        });

    } else {
        callback(400, {
            error: 'You Have a problem in your request',
        });
    }



};


// Users Get Method 'GET'/USER-READ USER
handler._users.get = (requestProperties, callback) => {

    //check the phone number is valid
    const phone = typeof (requestProperties.queryStringObject.phone) === 'string' && requestProperties.queryStringObject.phone.trim().length === 11 ? requestProperties.queryStringObject.phone : false;

    //
    if (phone) {
        // verify token
        let token = typeof (requestProperties.headersObject.token) === 'string' ? requestProperties.headersObject.token : false;

        tokenHandler._token.verify(token, phone, (tokenId) => {
            if (tokenId) {
                // lookup the user
                data.read('users', phone, (err, u) => {
                    const user = { ...parseJSON(u) };
                    if (!err && user) {
                        delete user.password;
                        callback(200, user);

                    } else {
                        callback(400, {
                            error: 'Requested user was not found!'
                        });
                    }
                })
            } else {
                callback(403, {
                    error: 'Authentication Failure!',
                })
            }
        });
    } else {
        callback(400, {
            error: 'Requested user was not found!'
        });
    }

};


// Users Put Method 'PUT'USER/-UPDATE USER
handler._users.put = (requestProperties, callback) => {
    //check the phone number is valid
    const phone = typeof (requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;

    const firstName = typeof (requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;

    const lastName = typeof (requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;

    const password = typeof (requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;


    if (phone) {
        if (firstName || lastName || password) {
            // lookup the user
            // verify token
            let token = typeof (requestProperties.headersObject.token) === 'string' ? requestProperties.headersObject.token : false;

            tokenHandler._token.verify(token, phone, (tokenId) => {
                if (tokenId) {
                    // lookup the user
                    data.read('users', phone, (err1, uData) => {
                        const userData = { ...parseJSON(uData) };
                        if (!err1 && userData) {
                            if (firstName) {
                                userData.firstName = firstName;
                            }

                            if (lastName) {
                                userData.lastName = lastName;
                            }

                            if (password) {
                                userData.password = hash(password);
                            }

                            //store to database or update to database
                            data.update('users', phone, userData, (err2) => {
                                if (!err2) {
                                    callback(200, {
                                        message: 'User was updated successfully',
                                    })
                                } else {
                                    callback(500, {
                                        error: 'There was a problem in the server side',
                                    });
                                }
                            });
                        } else {
                            callback(400, {
                                error: 'You Have a problem in your request',
                            });
                        }
                    });
                } else {
                    callback(403, {
                        error: 'Authentication Failure!',
                    })
                }
            });
        } else {
            callback(400, {
                error: 'You Have a problem in your request',
            });
        }
    } else {
        callback(400, {
            error: "Invalid phone number. Please try again!"
        })
    }


};

// @TODO: Authentication 
// Users delete Method 'DELETE'USER/-DELETE USER
handler._users.delete = (requestProperties, callback) => {
    //check the phone number is valid
    const phone = typeof (requestProperties.queryStringObject.phone) === 'string' && requestProperties.queryStringObject.phone.trim().length === 11 ? requestProperties.queryStringObject.phone : false;


    //
    if (phone) {
        // verify token
        let token = typeof (requestProperties.headersObject.token) === 'string' ? requestProperties.headersObject.token : false;

        tokenHandler._token.verify(token, phone, (tokenId) => {
            console.log(tokenId)
            if (tokenId) {
                //lookup the user
                data.read('users', phone, (err1, userData) => {
                    if (!err1 && userData) {
                        data.delete('users', phone, (err2) => {
                            if (!err2) {
                                callback(200, {
                                    message: 'User was successfully deleted',
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
                callback(403, {
                    error: 'Authentication Failure!',
                })
            }
        });
       
    } else {
        callback(400, {
            error: "There was a problem in your request"
        })
    }
};


module.exports = handler;