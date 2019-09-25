// import request
const Arequest = require('request');
// import cheerio
const cheerio = require('cheerio');
// import axios
const axios = require('axios');


module.exports = function(app) {

	app.get('/', (req, res) => {

		console.log(' Inside of / ');
		res.send('Welcome');
	});

	app.get('/amazon/search/:search', (req, res) => {

		const search = req.params.search;

		//const url = `https://www.amazon.com.br/s?k=${search}&__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&ref=nb_sb_noss`;
		const url = 'https://www.amazon.com.br/s?k=iphone&__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&ref=nb_sb_noss';

		axios.get(url)
				 .then(function (resp){

						const $ = cheerio.load(resp.data);

						var list = {
							'description' : 'none',
							'prices' : []
						};

						// peguei os valores dos iphones 
					//	$('span.a-price span.a-offscreen').each(function(i, element) {
						$('a.a-size-base span[data-a-color="base"] span.a-offscreen').each(function(i, element) {
							let el = $(this);
							let prices = el.text();
							list['prices'][i] = prices;
							//console.log(list['prices']);
						})

						console.log(list['prices']);
						
	

				  })
				 .catch(function (error){
					 console.log(error);
				  });	



	
	});
}