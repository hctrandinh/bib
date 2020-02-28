//To use: node server/sandbox.js
const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */

//Results of scraping is kept here:
var res = [];

const parse = data => {
  const $ = cheerio.load(data);

  //Names
  var item = [];
  //Cuisines
  var item2 = [];
  //Places
  var item3 = [];
  //Used to check if something has been found.
  var check = "";

  //Scrap names
  $(".card__menu-image a").each((i, element) => {
    item.push(
      $(element)
        .attr("aria-label")
        .substring(5)
    );
    check = $(element)
      .attr("aria-label")
      .substring(5);
  });
  //Scrap cuisines
  $(".card__menu-footer--price").each((i, element) => {
    item2.push(
      $(element)
        .text()
        .trim()
    );
  });
  //Scrap places
  $(".card__menu-footer--location").each((i, element) => {
    item3.push(
      $(element)
        .text()
        .trim()
    );
  });
  //Construct our JSON result
  for (var index = 0; index < item.length; index++) {
    res.push({ Name: item[index], Cuisine: item2[index], Place: item3[index] });
  }

  //const name = $('.card__menu-image a').attr('aria-label');
  //const experience = $('#experience-section > ul > li:nth-child(2)').text();
  //return { res };

  return check;
};

/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.scrapeRestaurant = async url => {
  var info = "";
  var page_nb = 1;
  do {
    console.log("Searching bib page: " + page_nb);
    url = "https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/";
    url = url + `${page_nb}`;
    const response = await axios(url);
    const { data, status } = response;
    if (status >= 200 && status < 300) {
      info = parse(data);
    }
    page_nb = page_nb + 1;
  } while (info != "");

  if (res != null) {
    return { res };
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
