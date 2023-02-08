/**
 * Title: Environments
 * Description: Handle all environment related things
 * Author: Shakhawat Salam (learner)
 * Date: 02/04/2022  
 */


//dependencies

//module scaffolding
const environment = {};

//staging
environment.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'hljjlljljljlkjlj',
    maxChecks: 5
};

//production
environment.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'dkjakjdkfjlajdkljfkj',
    maxChecks: 5
};



// determine which environment was passed

const currentEnvironment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';



//export corresponding environment object
const environmentToExport = typeof (environment[currentEnvironment]) === 'object' ? environment[currentEnvironment] : environment.staging;



//export module
module.exports = environmentToExport;