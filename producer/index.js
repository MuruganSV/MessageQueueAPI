require("@babel/register");
require("@babel/polyfill");

var ExpressApp = require("./src/app");

module.exports = new ExpressApp().startServer();