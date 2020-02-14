const axios = require('axios');
const cheerio = require('cheerio');
var iconv = require('iconv-lite');


var res = [];

async function get_restaurants_by_page(page_nb) 
{
    var string_nb = String(page_nb);
    const result = await axios({
      method: 'post',
      url: 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult#',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: 'page='+string_nb+'&sort=undefined&request_id=ec830a0fb20e71279f65cd4fad4cb137&annuaire_mode=standard'
    });
    return result;
}

const parse = data => 
{
    //console.log("Here is the data to parse:\n" + data);
    var processed_data = iconv.decode(data,'windows-1252');

    var item = [];
    var item2 = [];

    const $ = cheerio.load(processed_data);
    
    $('.single_libel a').each((i, element) =>
    {
        item.push($(element).text().trim().replace(/(\B)[^ ]*/g,match =>(match.toLowerCase())).replace(/^[^ ]/g,match=>(match.toUpperCase())));
    });

    $('.fa-map-marker').each((i, element) =>
    {
        item2.push($(element).find('display').text().trim().replace(/(\B)[^ ]*/g,match =>(match.toLowerCase())).replace(/^[^ ]/g,match=>(match.toUpperCase())));
    });

    for(var index = 0; index < item.length; index++)
    {
        res.push({'Name':item[index]})
    }
    //console.log("Here is the result of parsing:\n" + res);
    return {res};
};

module.exports.scrapeRestaurant = async page_nb => 
{
    const result = await get_restaurants_by_page(page_nb);
    const {data, status} = result;
  
    if (status >= 200 && status < 300) {
        //console.log("Parsing data...")
        return parse(data);
    }
  
    console.error(status);
  
    return null;
};

/**
 * Get all France located Maitre restaurants
 * @return {Array} restaurants
 */
module.exports.get = () => {
  return [];
};

