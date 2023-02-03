/**
 * Title: Sample Handler
 * Description:  Sample Handler
 * Author: Shakhawat Salam (learner)
 * Date: 02/03/2022  
 */

//module scaffolding 
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(200, {
        message : 'This is a sample url',
    });
};



module.exports = handler;