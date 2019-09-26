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
						// const selector1 = 'a.a-size-base';
						// const selector2 = 'span[data-a-color="base"]';
						// const selector3 = 'span.a-offscreen';  

						const selector4 =  '.s-result-list.s-search-results.sg-row > .s-result-item' ;           //'a.a-link-normal';
						// const selector5 = '>';
						// const selector6 = 'span.a-size-medium';



						list['prices'] = amazonSearch.searchProductPrice(html, selector4);
						// list['description'] =	amazonSearch.searchProduct(html, selector4, selector5, selector6); 

					//	console.log(list['description']);

					

						
						
	

				  })
				 .catch(function (error){
					 console.log(error);
				  });	



	
	});
}