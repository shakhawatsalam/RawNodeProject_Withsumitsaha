/**
 * Title: Route
 * Description: Applecation Routes
 * Author: Shakhawat Salam (learner)
 * Date: 02/03/2022  
 */

//dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandlers.js');
const { userHandler } = require('./handlers/routeHandlers/userHandler.js');
const { tokenHandler } = require('./handlers/routeHandlers/tokenHandler.js');
const { checkHandler } = require('./handlers/routeHandlers/checkHandler.js');

const routes = {
    "sample": sampleHandler,
    "user": userHandler,
    "token": tokenHandler,
    "check" : checkHandler
};

module.exports = routes;
