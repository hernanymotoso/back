const cheerio = require('cheerio');


function searchProduct(html, selector1, selector2, selector3){
  
  const $ = cheerio.load(html);
      let descriptions = [];
  		// peguei os valores dos iphones 
					
      $(selector1+' '+selector2+' '+selector3).each(function(i, element) {
        let el = $(this);
        let description = el.text();
        descriptions[i] = description; 
        
      })

      return descriptions;




}

function searchProductPrice (html, selector4){
  const $ = cheerio.load(html);
  //let descriptions = [];
 // // peguei os valores dos iphones 
      
  $(selector4).each(function(i, element) {
    console.log(i);
    console.log(element);  
    // let el = $(this);
    // let description = el.text();
    // descriptions[i] = description; 
    
  })

  //return descriptions;



}




module.exports = {
  searchProduct,
  searchProductPrice
}