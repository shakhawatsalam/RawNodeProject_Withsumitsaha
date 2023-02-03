/**
 * Title: Handle Request Response
 * Description: Handle Request and Response
 * Author: Shakhawat Salam (learner)
 * Date: 02/03/2022  
 */


//module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
    //request handling

    //get the url and parse it 
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.path;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryString = parsedUrl.query;
    const headersObject = req.headers;

    const decoder = new StringDecoder('utf-8');
    let realData = '';
    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        // response handle
        res.end('Hello World');
    });


    // console.log(req); 



    // response handle
    res.end('Hello World');
};


module.exports = handler;