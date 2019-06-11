const config = require('./config');

module.exports = {
  plugins: {
    "posthtml-expressions": {
      locals: {
        title: config.title || "",
        favicon: config.favicon || ""
      }
    }
  }
};