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
  var item = [];
  var item2 = [];
  var item3 = [];

  $('.card__menu-image a').each((i, element) =>
  {
    item.push($(element).attr('aria-label').substring(5));
  });
  $('.card__menu-footer--price').each((i, element) =>
  {
    item2.push($(element).text().trim());
  });
  $('.card__menu-footer--location').each((i, element) =>
  {
    item3.push($(element).text().trim());
  });
  for(var index = 0; index < item.length; index++)
  {
    res.push({'Name':item[index], 'Cuisine':item2[index], 'Lieu':item3[index]})
  }

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
