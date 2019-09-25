//import express
const express = require('express');
// import consign
const consign = require('consign');
// import bodyParser
const bodyParser = require('body-parser');



module.exports = function() {

	const app = express();
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());  // ver se sera necessario depois 
    
  consign().include('controllers').into(app);

	return app;

}