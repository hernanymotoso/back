const cheerio = require('cheerio');


function searchProduct(html, selector1, selector2, selector3){
 
  
  const $ = cheerio.load(html);
      let descriptions = [];
  		// peguei os valores dos iphones 
					
      $(selector1+' '+selector2+' '+selector3).each(function(i, element) {
        let el = $(this);
        let description = el.text();
        //console.log(description); 

        descriptions[i] = description; 
        
        
      })

      // console.log(descriptions);
      return descriptions;
 
 


}

function searchProductPrice (html, selector4){
  const $ = cheerio.load(html);
  let prices = []; 
  
  $(selector4).each(function(i, element) {
    let el = $(this);

    prices[i] = el.find('.a-section.a-spacing-none.a-spacing-top-small a.a-link-normal > span[data-a-color="base"] > span.a-offscreen').text();

    if(prices[i] == ''){    
      prices[i] = el.find('.a-section.a-spacing-none.a-spacing-top-mini .a-row span.a-color-base').text();   
    }
   
  })

  return prices; 
}




module.exports = {
  searchProduct,
  searchProductPrice
}