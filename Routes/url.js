const ex = require("express");
const {handleGenerateNewUrl,handleAnalytics} = require("../Controllers/url");
const Router = ex.Router();

Router.post("/",handleGenerateNewUrl);

Router.get("/analytics/:shortId",handleAnalytics);

module.exports = Router;
