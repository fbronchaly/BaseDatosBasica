'use strict';

const { Storage } = require('@google-cloud/storage');
const config = require('../config/config');
const path = require('path');
var Promise = require("bluebird");
const fs = require('fs');
const axios = require('axios');


const storage = new Storage({
    projectId: 'PROJECT_ID',
    keyFilename: './config.json'
});



var getPrivateUrl = (bucketName, gcsFileName, config) => new Promise((resolve, reject) => {
    config = config || {};

    /*// If you don't pass config, it will set read as the default action and 1 day from current time as the expiry time.
    _.defaults(config, {
        action: 'read',
        expires: moment().add(1, 'day').format(),
    });*/

    const bucket = storage.bucket(bucketName);
    const file = bucket.file(gcsFileName);

    file.getSignedUrl(config, (err, res) => {
        if (err) {
            return reject(err);
        }

        resolve(res);

        axios({
                method: 'get',
                url: res,
                responseType: 'stream'


            }).then(function(response) {


                console.log('Google cloud: Mapa localizado y enviado');


            })
            .catch(function(error) {
                console.log('Google Cloud: No existe el archivo:' + error);




            });

    });
});

module.exports = {

    getPrivateUrl
};