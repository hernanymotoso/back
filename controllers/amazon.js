// import cheerio
const cheerio = require('cheerio');
// import axios
const axios = require('axios');
// import the module amazon-search
const amazonSearch = require('../modules/amazon-search');
// import excel4node
const excell = require('excel4node');

module.exports = function(app) {
	global.data;

	app.get('/', (req, res) => {
 
		res.render('index', {dados : {}, exported: false}); 
		//res.send('Welcome'); 
	});

	app.post('/amazon/search', (req, res) => {  
		const searchForm =req.body;

		const search = searchForm.search;  
		// console.log(search);
	
		const url = `https://www.amazon.com.br/s?k=${search}&__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&ref=nb_sb_noss`;
		// console.log(url)
		
		axios.get(url)
				 .then(function (resp){ 
						let list = {
							'descriptions' : [],  
							'prices' : [] 
						};

						// Get the html of request  
						const html = resp.data;

						// Selectors for get the description
						const selector1 = '.s-result-item';
					  const selector2 = 'a.a-link-normal >';
						const selector3 = 'span.a-size-medium';  

						// Selector for get the price
						const selector4 =    '.s-result-list > .s-result-item';   

						list['descriptions'] =	amazonSearch.searchProduct(html, selector1, selector2, selector3); 
						list['prices'] = amazonSearch.searchProductPrice(html, selector4);
				
						// console.log(list['description']);
						// console.log(list['prices']);

					 	// res.send(list);
					  global.data = list;
					  res.render('index', {dados: list, exported : false});
						
				  })
				 .catch(function (error){
					 console.log(error);
					});	
					

	});

	app.post('/amazon/save', (req, res) => {

		const data = global.data;

		// Creating an hash for the name of file
		let hash = Date.now();
		hash = hash+Math.floor(Math.random() * 1000);


		// Criando uma nova instancia da class Workbook
		const wb = new excell.Workbook();

		// Adicionando uma aba na planilha. 
		const ws = wb.addWorksheet('Produtos');

		// Header style of the spreadsheet
		const styleHeader = wb.createStyle({
			font: {
				color: '#000000',
				size: 14,
				bold: true,
				width: '900px'
			}
		});
		// Body Style of the spreadsheet
		const style = wb.createStyle({
			font: {
				color: '#000000',
				size: 12,
				width: '900px'
			}
		});
		
		// Aqui estou criando um index para as linhas da planilha, o "+1" depois 
		// do data.descriptions.length é para adc mais 1 index pq a primeira linha
		// da planilha vai ser estática onde vou colocar o cabeçario   "Descrição" e "Preço" 
		let indexRowsExcell = [];
		for (let i = 2; i <= data.descriptions.length+1; i++) {
			indexRowsExcell.push(i);
		}	

		// Set the header of the spreadsheet.
	  ws.cell(1,1).string('Descrições').style(styleHeader);
	  ws.cell(1,2).string('Preço').style(styleHeader);
	

		// Set the value of the width
		ws.column(1).setWidth(100);
		
		
		for (let i = 0; i < indexRowsExcell.length; i++) {
			
			// Defining the body of the spreadsheet with the data.
			ws.cell(indexRowsExcell[i],1).string(data.descriptions[i]).style(style);
			ws.cell(indexRowsExcell[i],2).string(data.prices[i]).style(style);	
			
		}	

		// Creating the file in defaul folder
		wb.write('./storage/'+hash+'.xlsx');

		res.render('index', {dados: data, exported: true});

	});

}