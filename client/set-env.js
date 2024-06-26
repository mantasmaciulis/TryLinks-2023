const fs = require('fs');
const path = require('path');
require('dotenv').config();

const prodEnvPath = path.join(__dirname, 'src', 'environments', 'environment.prod.ts');
let envContent = fs.readFileSync(prodEnvPath, 'utf8');

envContent = envContent.replace(/\$\{AUTH_DOMAIN\}/g, process.env.AUTH_DOMAIN);
envContent = envContent.replace(/\$\{AUTH_CLIENT_ID\}/g, process.env.AUTH_CLIENT_ID);
envContent = envContent.replace(/\$\{AUTH_REDIRECT_URI\}/g, process.env.AUTH_REDIRECT_URI);
envContent = envContent.replace(/\$\{JWT_CHECK_AUDIENCE\}/g, process.env.JWT_CHECK_AUDIENCE);

fs.writeFileSync(prodEnvPath, envContent, 'utf8');

const devEnvPath = path.join(__dirname, 'src', 'environments', 'environment.dev.ts');
let envDevContent = fs.readFileSync(devEnvPath, 'utf8');

envDevContent = envDevContent.replace(/\$\{AUTH_DOMAIN\}/g, process.env.AUTH_DOMAIN);
envDevContent = envDevContent.replace(/\$\{AUTH_CLIENT_ID\}/g, process.env.AUTH_CLIENT_ID);
envDevContent = envDevContent.replace(/\$\{AUTH_REDIRECT_URI\}/g, process.env.AUTH_REDIRECT_URI);
envDevContent = envDevContent.replace(/\$\{JWT_CHECK_AUDIENCE\}/g, process.env.JWT_CHECK_AUDIENCE);

fs.writeFileSync(devEnvPath, envDevContent, 'utf8');