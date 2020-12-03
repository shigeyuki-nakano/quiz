const fs = require('fs');
const path = require('path');
const [, , mode] = process.argv;
const projectPath = path.dirname(__dirname);
const firebaseSettingsPath = path.resolve(projectPath, '.firebase-config.js');
let envFileName;

if(mode === "development") {
    envFileName = '.env.development';
} else if (mode === "production") {
    envFileName = '.env';
} else {
    console.error('ERROR: You must to specify an option "development" or "production" in second arg');
    process.exit(1);
}

if( ! fs.existsSync(firebaseSettingsPath)) {
    console.error(`ERROR: Please prepare a file with firebase keys information in ${firebaseSettingsPath}`);
    process.exit(1);
}

if(fs.existsSync(path.resolve(projectPath, envFileName))) {
    console.error(`ERROR: You must to rename ${envFileName} in ${projectPath}`);
    process.exit(1);
}

const firebaseSettings = require(firebaseSettingsPath);

ENV_INFO = `
FIREBASE_API_KEY='${firebaseSettings.apiKey}'
FIREBASE_AUTH_DOMAIN='${firebaseSettings.authDomain}'
FIREBASE_DATABASE_URL='${firebaseSettings.databaseURL}'
FIREBASE_PROJECT_ID='${firebaseSettings.projectId}'
FIREBASE_STORAGE_BUCKET='${firebaseSettings.storageBucket}'
FIREBASE_MESSAGING_SENDER_ID='${firebaseSettings.messagingSenderId}'
FIREBASE_APP_ID='${firebaseSettings.appId}'
FIREBASE_MEASUREMENT_ID='${firebaseSettings.measurementId}'
`

const TRIMMED_ENV_INFO = ENV_INFO.trim();

try {
    fs.writeFileSync(envFileName, TRIMMED_ENV_INFO);
    console.log(`Congrats! ${envFileName} was successfully generated!`)
} catch (e) {
    console.error(e);
}