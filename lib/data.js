/**
 * Title: Not Found Handler
 * Description:  404 Not Found Handler
 * Author: Shakhawat Salam (learner)
 * Date: 02/03/2022  
 */


//dependencies
const fs = require('fs');
const path = require('path');
const { clearScreenDown } = require('readline');


const lib = {};


//base directory of the data folder
lib.basedir = path.join(__dirname, '/../.data/');


//write data to file
lib.create = function (dir, file, data, callback) {
    //open file for writing
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            // convert data object to string
            const stringData = JSON.stringify(data);

            //writ data to file and then close it
            fs.writeFile(fileDescriptor, stringData, function (err2) {
                if (!err2) {
                    fs.close(fileDescriptor, function (err3) {
                        if (!err3) {
                            callback(false);
                        } else {
                            callback("Error Closing the new file!");
                        }
                    });
                } else {
                    callback('Error writing to new file');
                }
            })

        } else {
            callback('Could not create now file, it may already exists!');
        }
    });
};




//read data  from file

lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    });
};


//update existing file
lib.update = (dir, file, data, callback) => {
    //====>file open for writing
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            // convert the data to string
            const stringData = JSON.stringify(data);

            // truncate the file
            fs.ftruncate(fileDescriptor, (err1) => {
                if (!err1) {
                    // write to the file and close it 
                    fs.write(fileDescriptor, stringData, (err2) => {
                        if (!err2) {
                            //close the file
                            fs.close(fileDescriptor, (err3) => {
                                if (!err3) {
                                    callback(false);
                                } else {
                                    callback('Error closing the file');
                                }
                            });
                        } else {
                            callback('Error writing to file');
                        }
                    })
                } else {
                    callback('Error truncating file!');
                }
            })
        } else {
            callback(`Error updating. File may not exist`);
        }
    })
};


//delete existing file
lib.delete = (dir, file, callback) => {
    //unlink file
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false)
        } else {
            callback('Error Deleting File');
        }
    });
};


// list all the items in a directory
lib.list = (dir, callback) => {
    fs.readdir(`${lib.basedir + dir}/`, (err, fileNames) => {
        if (!err && fileNames && fileNames.length > 0) {
            const trimmedFilesNames = [];
            fileNames.forEach(fileName => {
                trimmedFilesNames.push(fileName.replace('.json', ''));
            });
            callback(false, trimmedFilesNames);
        } else {
            callback('Error reading directory');
        }
    });
};

module.exports = lib;

