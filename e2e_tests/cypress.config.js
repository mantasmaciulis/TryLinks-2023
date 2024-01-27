const { defineConfig } = require("cypress");
require('dotenv').config();


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.loginUrl = process.env.LOGIN_URL;
      config.env.username = process.env.USERNAME;
      config.env.password = process.env.PASSWORD;
      
      return config;
    },
  },
});
