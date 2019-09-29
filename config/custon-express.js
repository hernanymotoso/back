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

	/** Setar as variaveis 'view engine' e 'views' do express (passar o ejs e o caminho das view) */
	app.set('view engine', 'ejs');
	app.set('views', './views');
	
  // Incluindo a pasta controllers no app "Meio q um autoload".  
  consign().include('controllers').into(app);

	return app;

}