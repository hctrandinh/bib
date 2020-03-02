const axios = require("axios");
const fs = require("fs");

var file = JSON.parse(
  fs.readFileSync("./src/assets/comparison_res.json").toString()
);
var cities = [];
var cities_wo_name = [];

async function get_coordinates(city) {
  var link =
    "http://dev.virtualearth.net/REST/v1/Locations/FR/" +
    `${city}` +
    "?&key=AorwfLV2yU2yLl5lbqedx5uijiss74Gz2Ng1196vCiElPM24qfdLbrjbIe8ra8Gh";
  const result = await axios.get(link);
  return result.data;
}

async function get_distance() {
  const result = await axios({
    method: "POST",
    url:
      "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?key=AorwfLV2yU2yLl5lbqedx5uijiss74Gz2Ng1196vCiElPM24qfdLbrjbIe8ra8Gh",
    headers: {
      "Content-Length": 450,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data: {
      origins: [
        {
          latitude: 47.6044,
          longitude: -122.3345
        },
        {
          latitude: 47.6731,
          longitude: -122.1185
        },
        {
          latitude: 47.6149,
          longitude: -122.1936
        }
      ],
      destinations: [
        {
          latitude: 45.5347,
          longitude: -122.6231
        },
        {
          latitude: 47.4747,
          longitude: -122.2057
        }
      ],
      travelMode: "driving"
    }
  });
  return result.data;
}

async function get_all_coordinates() {
  var index2 = 0;
  do {
    var link =
      "http://dev.virtualearth.net/REST/v1/Locations/FR/" +
      `${file[index2]["Address"]}` +
      "?&key=AorwfLV2yU2yLl5lbqedx5uijiss74Gz2Ng1196vCiElPM24qfdLbrjbIe8ra8Gh";
    var result = await axios.get(link);
    cities.push({
      Name: file[index2]["Name"],
      Latitude: result.data.resourceSets[0].resources[0].point.coordinates[0],
      Longitude: result.data.resourceSets[0].resources[0].point.coordinates[1]
    });
    cities_wo_name.push({
      latitude: result.data.resourceSets[0].resources[0].point.coordinates[0],
      longitude: result.data.resourceSets[0].resources[0].point.coordinates[1]
    });
    index2 = index2 + 1;
  } while (index2 < file.length);
}

get_all_coordinates().then(() => {
  fs.writeFile(
    "./src/assets/comparison_coordinates_res.json",

    JSON.stringify(cities),

    function(err) {
      if (err) {
        console.error("Crap happens");
      }
    }
  );

  fs.writeFile(
    "./src/assets/comparison_coordinates_no_name_res.json",

    JSON.stringify(cities_wo_name),

    function(err) {
      if (err) {
        console.error("Crap happens");
      }
    }
  );
});

//For testing:
/*
get_distance().then(value => {
  console.log(value.resourceSets[0].resources[0].results[0].travelDuration);
  console.log(JSON.stringify(value));
});

get_coordinates().then(value => {
  console.log(
    "Latitude: " + value.resourceSets[0].resources[0].point.coordinates[0]
  );
  console.log(
    "Longitude: " + value.resourceSets[0].resources[0].point.coordinates[1]
  );
});
*/

//To get city coordinates:
//http://dev.virtualearth.net/REST/v1/Locations/FR/Bordeaux?o=xml&key=AorwfLV2yU2yLl5lbqedx5uijiss74Gz2Ng1196vCiElPM24qfdLbrjbIe8ra8Gh
