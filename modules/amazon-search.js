// import the cheerio
const cheerio = require('cheerio');

function searchProduct(html, selector1, selector2, selector3){
 
  // carrego body da pagina no cheerio, '$' para usar a sitaxe de jquery'
  const $ = cheerio.load(html);
  let descriptions = [];
  
  // Pego a descrição dos produtos, atraves dos seletores passados 		
  $(selector1+' '+selector2+' '+selector3).each(function(i, element) {
    let el = $(this);
    let description = el.text();
    //console.log(description); 

    descriptions[i] = description; 

  })

  // retorno as descrições dos produtos
  return descriptions;
}

function searchProductPrice (html, selector4){

  // carrego body da pagina no cheerio, '$' para usar a sitaxe de jquery'
  const $ = cheerio.load(html);
  let prices = []; 
  
  $(selector4).each(function(i, element) {
    let el = $(this);

    // Pego o preço dos produtos
    prices[i] = el.find('.a-section.a-spacing-none.a-spacing-top-small a.a-link-normal > span[data-a-color="base"] > span.a-offscreen').text();

    // se o prices retornar vazio é pq o produto é de um vendedor externo.
    if(prices[i] == ''){  
        
      // pego o preço do vendedor externo.
      prices[i] = el.find('.a-section.a-spacing-none.a-spacing-top-mini .a-row span.a-color-base').text();   
    }
   
  })

  // retorno os preços
  return prices; 
}




module.exports = {
  searchProduct,
  searchProductPrice
}