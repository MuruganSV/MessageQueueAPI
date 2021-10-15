require("@babel/polyfill")
require("@babel/register")

var ExpressApp = require("./src/app");

module.exports = new ExpressApp().startServer();