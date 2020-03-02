const fs = require("fs");

var json = JSON.parse(fs.readFileSync("server/bib_res.json").toString());
var json2 = JSON.parse(fs.readFileSync("server/maitre_res.json").toString());

var liste = [];

for (var index = 0; index < json.length; index++) {
  for (var index2 = 0; index2 < json2.length; index2++) {
    if (
      json2[index2]["Name"].toLowerCase().replace(/ *\([^)]*\) */g, "") ==
      json[index]["Name"].toLowerCase()
    ) {
      liste.push({ Name: json[index]["Name"], Address: json[index]["Place"] });
    }
  }
}

var count = 1;

liste.forEach(element => {
  console.log(count + ": " + element["Name"]);
  count++;
});

require("fs").writeFile(
  "server/comparison_res.json",

  JSON.stringify(liste),

  function(err) {
    if (err) {
      console.error("Crap happens");
    }
  }
);
