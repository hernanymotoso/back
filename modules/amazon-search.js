const cheerio = require('cheerio');


function searchProduct(html, selector1, selector2, selector3){
  
  const $ = cheerio.load(html);
      let prices = [];
  		// peguei os valores dos iphones 
					
      $(selector1+' '+selector2+' '+selector3).each(function(i, element) {
        let el = $(this);
        let price = el.text();
        prices[i] = price; 
        
      })

      return prices;




}




module.exports = {
  searchProduct
}