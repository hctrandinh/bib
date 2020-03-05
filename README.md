# BIB

The project is divided into two parts:

The first one is the data scrapping part and we will quickly show you how to use it. We scrap data for restaurants from the guide michelin and maitre restaurant websites. We thus have two different files which gives the basic functions to get our datas.

Here are both codes:

michelin.js

```javascript
const axios = require("axios");
const cheerio = require("cheerio");

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

  //return { res };

  return check;
};

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

module.exports.get = () => {
  return [];
};
```

And thus, michelin.js gives you a way to returns a result with this form (sample):

```json
[
  { "Name": "Le Rousseau", "Cuisine": "Actuelle", "Place": "Grenoble" },
  {
    "Name": "Les 3 Faisans",
    "Cuisine": "Cuisine moderne",
    "Place": "Saint-Savin"
  },
  {
    "Name": "La Table du Sommelier",
    "Cuisine": "Cuisine moderne",
    "Place": "Albi"
  },
  {
    "Name": "Au Bouchon Breton",
    "Cuisine": "Cuisine traditionnelle",
    "Place": "Dinard"
  }
 ]
```

maitre.js

```javascript
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

```

maitre.js works similarly but instead of a get, it uses a post request. Both are built so that when parsing is done, it allows the script to know when a parsing result is null thus stopping the scrapping if reaching an empty page. This allows us to avoid entering raw values to check website pages.

Note: we need here to do a little character conversion to avoid ASCII like characters, using iconv-lite library on top of our parsing.

Here is a sample result with just the names needed because when we then compare the result of both searching, all we need was already scrapped when getting bib restaurants:

```json
[
  { "Name": "Le Temps D'M (mathias )" },
  { "Name": "Brasserie La Choulette (alain Dhaussy)" },
  {
    "Name": "Scev Lequart Et Fils  Champagne Laurent Lequart (laurent Lequart)"
  },
  { "Name": "Domaine de la Jobeline (pierre Maillet)" },
  { "Name": "Les Pyrenees (patrick Abadie)" }
]
```
Comparison is done using the comparison.js script and it returns matching results between both .json files. It then saves in a .json file our results.

How to use the scraping part:

1)

Place yourself inside your bib folder.

2)
Use the following command to scrap datas from both websites:

```bash
$ node ./server/sandbox.js
```

3)
And finally use the following command to do the comparison.

```bash
$ node ./server/comparison.js
```


React:
1)Go to ./react-web/react_bootstrap
2)Yarn start
Notice: I generated the localisation (longitude/latitude) of all my scrapping results with BingMap.js script and copy/pasted the raw data inside my distance.js file as I had some issues with manipulating it from another file in coordination with react. So only your localisation is fetched from microsoft map api each time you make a request and also the distance between your city and all raw coordinates. Results are then compared and the page displays the best result.

React pages:

Home page:
![img1](./img/01.png)

Bib restaurants:
![img2](./img/02.png)

Maitre restaurants:
![img3](./img/03.png)

Filtering with both:
![img4](./img/04.png)

Nearest restaurant page:
![img5](./img/05.png)

Example with your localization at dijon:
![img6](./img/06.png)
