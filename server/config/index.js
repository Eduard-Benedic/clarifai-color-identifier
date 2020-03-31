const config = require("./config");

module.exports = {
  getDbConnectionString: function() {
    return `mongodb+srv://${config.username}:${config.password}@cluster0-snmef.mongodb.net/clarifai-colors`;
  },
  getSecret: function() {
    return config.secret;
  }
};
