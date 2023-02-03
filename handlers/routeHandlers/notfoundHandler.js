/**
 * Title: Not Found Handler
 * Description:  404 Not Found Handler
 * Author: Shakhawat Salam (learner)
 * Date: 02/03/2022  
 */

//module scaffolding 
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
    callback(404, {
        message: 'Your requested URL is not found'
    })
};



module.exports = handler;