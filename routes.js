/**
 * Title: Route
 * Description: Applecation Routes
 * Author: Shakhawat Salam (learner)
 * Date: 02/03/2022  
 */

//dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandlers.js');

const routes = {
    "sample": sampleHandler,
};

module.exports = routes;
