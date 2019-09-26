// import request
const Arequest = require('request');
// import cheerio
const cheerio = require('cheerio');
// import axios
const axios = require('axios');
// import the module amazon-search
const amazonSearch = require('../modules/amazon-search')


module.exports = function(app) {

	app.get('/', (req, res) => {

		console.log(' Inside of / ');
		res.send('Welcome');
	});

	app.get('/amazon/search/:search', (req, res) => {

		const search = req.params.search;

		
		const url = 'https://www.amazon.com.br/s?k=iphone&__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&ref=nb_sb_noss';

		axios.get(url)
				 .then(function (resp){
						let list = {
							'description' : 'none',
							'prices' : []
						};

						const html = resp.data;
						const selector1 = 'a.a-size-base';
						const selector2 = 'span[data-a-color="base"]';
						const selector3 = 'span.a-offscreen';  


						list['prices'] = amazonSearch.searchProduct(html, selector1, selector2, selector3);

						console.log(list['prices']);

					

						
						
	

				  })
				 .catch(function (error){
					 console.log(error);
				  });	



	
	});
}