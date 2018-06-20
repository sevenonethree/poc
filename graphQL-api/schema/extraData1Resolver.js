var http = require("axios");
const settings = require("../configSettings.js");


exports.resolver = {
  Query: {
    extraData1(root, context) {
      return http.get(settings.restAPI1BaseUrl);
    }
  }
};
