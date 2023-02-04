/**
 * Title: User handler
 * Description:  Handler to handle user related routes.
 * Author: Shakhawat Salam (learner)
 * Date: 02/04/2022  
 */

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
     
};

// Users Get Method
handler._users.get = (requestProperties, callback) => {
    callback(200);
};

// Users Put Method
handler._users.put = (requestProperties, callback) => {

};

// Users delete Method 
handler._users.delete = (requestProperties, callback) => {

};


module.exports = handler;