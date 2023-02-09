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
    maxChecks: 5,
    twilio: {
        fromPhone: '+13203320542 ',
        accountSid: 'ACb1a72ce866604c6d401177b6967eb774',
        authToken: '07fefbe53dab381cfcfc36cb3d6c9317'

    }
};

//production
environment.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'dkjakjdkfjlajdkljfkj',
    maxChecks: 5,
    twilio: {
        fromPhone: '+8801876288562',
        accountSid: 'ACb1a72ce866604c6d401177b6967eb774',
        authToken: '07fefbe53dab381cfcfc36cb3d6c9317'

    }
};



// determine which environment was passed

const currentEnvironment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';



//export corresponding environment object
const environmentToExport = typeof (environment[currentEnvironment]) === 'object' ? environment[currentEnvironment] : environment.staging;



//export module
module.exports = environmentToExport;