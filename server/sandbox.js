/* eslint-disable no-console, no-process-exit */
const michelin = require("./michelin");
const maitre = require("./maitre");

//const [,, searchLink] = process.argv;
var restaurants = null;
var restaurants2 = null;

async function get_bib_resto() {
  try {
    restaurants = await michelin.scrapeRestaurant("");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function get_maitre_resto() {
  try {
    restaurants2 = await maitre.scrapeRestaurant("");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

get_bib_resto().then(() => {
  console.log(restaurants);
  console.log("Bib search done !");
  require("fs").writeFile(
    "server/bib_res.json",

    JSON.stringify(restaurants["res"]),

    function(err) {
      if (err) {
        console.error("Crap happens");
      }
    }
  );
});

get_maitre_resto().then(() => {
  console.log(restaurants2);
  console.log("Maitre search done !");
  require("fs").writeFile(
    "server/maitre_res.json",

    JSON.stringify(restaurants2["res"]),

    function(err) {
      if (err) {
        console.error("Crap happens");
      }
    }
  );
});
