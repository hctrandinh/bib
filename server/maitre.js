const axios = require("axios");
const cheerio = require("cheerio");
//To correct most of String conversions.
var iconv = require("iconv-lite");

var res = [];

const parse = data => {
  var processed_data = iconv.decode(data, "windows-1252");

  var item = [];
  var item2 = [];
  var check = "";

  const $ = cheerio.load(processed_data);

  $(".single_libel a").each((i, element) => {
    item.push(
      $(element)
        .text()
        .trim()
        .replace(/(\B)[^ ]*/g, match => match.toLowerCase())
        .replace(/^[^ ]/g, match => match.toUpperCase())
    );
    check = $(element)
      .text()
      .trim()
      .replace(/(\B)[^ ]*/g, match => match.toLowerCase())
      .replace(/^[^ ]/g, match => match.toUpperCase());
  });

  /*
    var doc = new dom().parseFromString(data)
    var title = xpath.select('//*[@id="zoneAnnuaire_layout"]/div[3]/div[2]/div[3]/div[1]/div[2]/div[2]/div/div[1]/div', doc).toString()
    console.log(title)
    */

  for (var index = 0; index < item.length; index++) {
    res.push({ Name: item[index] });
  }

  for (var index2 = 0; index2 < item2.length; index2++) {
    res.push({ Adresse: item2[index2] });
  }
  //return { res };
  return check;
};

async function get_restaurants_by_page(page_nb) {
  var string_nb = String(page_nb);
  const result = await axios({
    method: "post",
    url: "https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult#",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data:
      "page=" +
      string_nb +
      "&sort=undefined&request_id=ec830a0fb20e71279f65cd4fad4cb137&annuaire_mode=standard"
  });
  return result;
}

module.exports.scrapeRestaurant = async url => {
  var info = "";
  var page_nb = 1;
  do {
    console.log("Searching maitre page: " + page_nb);
    const response = await get_restaurants_by_page(page_nb);
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
 * Get all France located Maitre restaurants
 * @return {Array} restaurants
 */
module.exports.get = () => {
  return [];
};
