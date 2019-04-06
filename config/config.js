'use strict';

const nconf = (module.exports = require('nconf'));
const path = require('path');

nconf
// 1. Command-line arguments
    .argv()
    // 2. Environment variables
    .env([
        'CLOUD_BUCKET'
    ])
    // 3. Config file
    .file({ file: path.join(__dirname, 'config.json') })
    // 4. Defaults
    .defaults({
        // Typically you will create a bucket with the same name as your project ID.
        CLOUD_BUCKET: 'prueba-pp',
        PROJECT_ID: 'rayos-214316'
    });





// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Vencimiento del Token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = '48h';


// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://fjcapelo:Aitornacho66@ds243212.mlab.com:43212/database1';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

// ============================
//  Google Client ID
// ============================
process.env.CLIENT_ID = process.env.CLIENT_ID || '219758474264-vh1bibcphgvbc32km508lubtqkanikf1.apps.googleusercontent.com';
process.env.YOUR_CLIENT_ID = process.env.YOUR_CLIENT_ID || 'AIzaSyBNtD9D_96Y88nf9IHcRsQkt9o-7caOWHQ';

//Servicio AEMET

//mongoose.connect('mongodb://Franchesco:Francisco19661966@ds131373.mlab.com:31373/mapasaemet');

// ============================
//  Google Client ID
// ============================



const GOOGLE_CLOUD_PROJECT_ID = "rayos-214316"; // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = 'path-to-the-private-key'; // Replace with the path to the downloaded private key