const fs = require('fs');
const path = require('path');
require('dotenv').config();

const prodEnvPath = path.join(__dirname, 'src', 'environments', 'environment.prod.ts');
let envContent = fs.readFileSync(prodEnvPath, 'utf8');

envContent = envContent.replace(/\$\{AUTH_DOMAIN\}/g, process.env.AUTH_DOMAIN);
envContent = envContent.replace(/\$\{AUTH_CLIENT_ID\}/g, process.env.AUTH_CLIENT_ID);
envContent = envContent.replace(/\$\{AUTH_REDIRECT_URI\}/g, process.env.AUTH_REDIRECT_URI);

fs.writeFileSync(prodEnvPath, envContent, 'utf8');
