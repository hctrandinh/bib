//To use: node server/sandbox.js https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/
const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */

var links = [];
var res = [];
const parse = data => {
  const $ = cheerio.load(data);
  //let firstElem = $('.restaurant-details__heading--title').get()[0]
  
  $('.card__menu-image a').each((i, element) =>
  {
    var item = $(element).attr('aria-label');
    res.push(item.substring(5));
  });
  //const name = $('.card__menu-image a').attr('aria-label');
  //const experience = $('#experience-section > ul > li:nth-child(2)').text();

  return {res};
};


/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.scrapeRestaurant = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parse(data);
  }

  console.error(status);

  return null;
};

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = () => {
  return [];
};
