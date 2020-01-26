/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const maitre = require('./maitre');

var restaurants = null;
var restaurants2 = null;
var searchLink = 'https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/'

async function sandbox (searchLink) {
  try {
    //console.log(`🕵️‍♀️  browsing ${searchLink} source`);
    restaurants = await michelin.scrapeRestaurant(searchLink);
    //console.log("done")

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function sandbox2 (page_nb) {
  try {
    //console.log(`🕵️‍♀️  browsing ${page_nb} page`);
    restaurants2 = await maitre.scrapeRestaurant(page_nb);
    //console.log('done');

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

//const [,, searchLink] = process.argv;


for(var index = 1; index < 31; index++)
{
  var url = searchLink + `${index}`;
  sandbox(url);
}


var delayInMilliseconds = 10000; //10 seconds.

console.log("Waiting 10 seconds to get all results from michelin.")

setTimeout(function() {
  console.log(restaurants);
  require('fs').writeFile(

    'server/bib_res.txt',

    JSON.stringify(restaurants["res"]),

    function (err) {
        if (err) {
            console.error('Crap happens');
        }
    }
);
}, delayInMilliseconds);


//_______________________________________________


for (var nb_page = 1; nb_page < 150; nb_page++)
{
  sandbox2(nb_page);
}

delayInMilliseconds = 20000; //20 seconds.

console.log("Waiting 20 seconds to get all results from maitre restaurant.")

setTimeout(function() {
  console.log(restaurants2["res"]);
  require('fs').writeFile(

    'server/maitre_res.txt',

    JSON.stringify(restaurants2["res"]),

    function (err) {
        if (err) {
            console.error('Crap happens');
        }
    }
);
}, delayInMilliseconds);

