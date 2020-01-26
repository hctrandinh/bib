const axios = require('axios');
const cheerio = require('cheerio');


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
    const $ = cheerio.load(data);
    $('.single_libel a').each((i, element) =>
    {
        var item = $(element).text();
        res.push(item);
    });
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

