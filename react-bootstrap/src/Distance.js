import React, { Component } from "react";
import "./GradientBorder.css";
import "./App.css";
const axios = require("axios");

async function get_coordinates(city) {
  var link =
    "http://dev.virtualearth.net/REST/v1/Locations/FR/" +
    `${city}` +
    "?&key=AorwfLV2yU2yLl5lbqedx5uijiss74Gz2Ng1196vCiElPM24qfdLbrjbIe8ra8Gh";
  const result = await axios.get(link);
  return result.data;
}

async function get_distance(laO, loO) {
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
          latitude: laO,
          longitude: loO
        }
      ],
      destinations: dest,
      travelMode: "driving"
    }
  });
  return result.data;
}
/*
var best_res = get_distance(latitude, longitude).then(value2 => {
    alert(value2);
  });
  */

export class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    var latitude = 0;
    var longitude = 0;
    var coordinates = get_coordinates(this.state.value).then(value => {
      latitude = value.resourceSets[0].resources[0].point.coordinates[0];
      longitude = value.resourceSets[0].resources[0].point.coordinates[1];

      var best_res = get_distance(latitude, longitude).then(value2 => {
        console.log(JSON.stringify(value2));
        var minimum = 100000;
        var position = -1;
        for (
          var time_value = 0;
          time_value < value2.resourceSets[0].resources[0].results.length;
          time_value++
        ) {
          if (
            minimum >
              value2.resourceSets[0].resources[0].results[time_value]
                .travelDuration &&
            value2.resourceSets[0].resources[0].results[time_value]
              .travelDuration != -1
          ) {
            minimum =
              value2.resourceSets[0].resources[0].results[time_value]
                .travelDuration;
            position = time_value;
          }
        }
        alert(
          "The closest bib and maitre restaurant is accessible at: " +
            dest_names[position]["Name"] +
            " restaurant after " +
            value2.resourceSets[0].resources[0].results[position]
              .travelDuration +
            " minutes driving !"
        );
      });
    });

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h2>Find the restaurant you dream of !</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Your city location:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>
          Note: Free MS api only set to work in France and approximates travel
          durations by using city centers.
        </p>
      </div>
    );
  }
}

var dest = [
  { latitude: 48.81407165527344, longitude: -3.443769931793213 },
  { latitude: 48.81407165527344, longitude: -3.443769931793213 },
  { latitude: 43.50257110595703, longitude: 1.4112900495529175 },
  { latitude: 42.72085189819336, longitude: 1.8390400409698486 },
  { latitude: 42.72085189819336, longitude: 1.8390400409698486 },
  { latitude: 49.84539031982422, longitude: 2.270289897918701 },
  { latitude: 49.84539031982422, longitude: 2.270289897918701 },
  { latitude: 48.81945037841797, longitude: 7.280399799346924 },
  { latitude: 49.029518127441406, longitude: 7.714580059051514 },
  { latitude: 47.3848991394043, longitude: -1.030269980430603 },
  { latitude: 48.09370040893555, longitude: 7.307040214538574 },
  { latitude: 48.640621185302734, longitude: 2.326659917831421 },
  { latitude: 47.16611862182617, longitude: 0.23795999586582184 },
  { latitude: 47.08232879638672, longitude: -2.0344600677490234 },
  { latitude: 45.07027816772461, longitude: 4.837609767913818 },
  { latitude: 46.7459716796875, longitude: -1.1142300367355347 },
  { latitude: 43.59048080444336, longitude: 6.300610065460205 },
  { latitude: 43.59048080444336, longitude: 6.300610065460205 },
  { latitude: 48.09865188598633, longitude: -4.206620216369629 },
  { latitude: 44.916168212890625, longitude: 5.657559871673584 },
  { latitude: 45.59130096435547, longitude: 6.456699848175049 },
  { latitude: 45.59130096435547, longitude: 6.456699848175049 },
  { latitude: 45.59130096435547, longitude: 6.456699848175049 },
  { latitude: 48.81435012817383, longitude: 7.788680076599121 },
  { latitude: 48.81435012817383, longitude: 7.788680076599121 },
  { latitude: 43.120208740234375, longitude: 6.131010055541992 },
  { latitude: 47.25973129272461, longitude: -0.07940000295639038 },
  { latitude: 43.35641860961914, longitude: -1.5491100549697876 },
  { latitude: 48.85717010498047, longitude: 2.341399908065796 },
  { latitude: 49.64046859741211, longitude: -1.6160800457000732 },
  { latitude: 47.50693130493164, longitude: 6.862810134887695 },
  { latitude: 47.50693130493164, longitude: 6.862810134887695 },
  { latitude: 48.85717010498047, longitude: 2.341399908065796 },
  { latitude: 48.85717010498047, longitude: 2.341399908065796 },
  { latitude: 43.767601013183594, longitude: 1.7518600225448608 },
  { latitude: 45.1840705871582, longitude: 0.7232000231742859 },
  { latitude: 48.5513801574707, longitude: -0.5082100033760071 },
  { latitude: 47.519378662109375, longitude: -2.300139904022217 },
  { latitude: 49.41944885253906, longitude: 0.23287999629974365 },
  { latitude: 49.41944885253906, longitude: 0.23287999629974365 },
  { latitude: 49.41944885253906, longitude: 0.23287999629974365 },
  { latitude: 43.70024871826172, longitude: 7.277740001678467 },
  { latitude: 43.550048828125, longitude: 5.032959938049316 },
  { latitude: 43.550048828125, longitude: 5.032959938049316 },
  { latitude: 48.81945037841797, longitude: 7.280399799346924 },
  { latitude: 45.07027816772461, longitude: 4.837609767913818 },
  { latitude: 48.07204818725586, longitude: 2.134929895401001 },
  { latitude: 47.457759857177734, longitude: -0.6583999991416931 },
  { latitude: 49.600563049316406, longitude: 1.1127519607543945 },
  { latitude: 44.229740142822266, longitude: 4.932040214538574 },
  { latitude: 46.65663146972656, longitude: 4.672249794006348 },
  { latitude: 45.693790435791016, longitude: -0.3251200020313263 },
  { latitude: 45.693790435791016, longitude: -0.3251200020313263 },
  { latitude: 48.85717010498047, longitude: 2.341399908065796 },
  { latitude: 43.60803985595703, longitude: 2.242110013961792 },
  { latitude: 50.953189849853516, longitude: 1.853659987449646 },
  { latitude: 46.62184143066406, longitude: 2.45194411277771 },
  { latitude: 43.120208740234375, longitude: 6.131010055541992 },
  { latitude: 49.18436813354492, longitude: -0.3610900044441223 },
  { latitude: 49.18436813354492, longitude: -0.3610900044441223 },
  { latitude: 45.92498016357422, longitude: 6.8714799880981445 },
  { latitude: 47.639251708984375, longitude: 6.863659858703613 },
  { latitude: 48.09865188598633, longitude: -4.206620216369629 },
  { latitude: 47.75017166137695, longitude: -3.366849899291992 },
  { latitude: 43.092891693115234, longitude: 2.6192901134490967 }
];

var dest_names = [
  {
    Name: "La Maison de Marie",
    Latitude: 48.81407165527344,
    Longitude: -3.443769931793213
  },
  {
    Name: "Le Manoir du Sphinx",
    Latitude: 48.81407165527344,
    Longitude: -3.443769931793213
  },
  {
    Name: "Le Bellevue",
    Latitude: 43.50257110595703,
    Longitude: 1.4112900495529175
  },
  {
    Name: "Le Chalet",
    Latitude: 42.72085189819336,
    Longitude: 1.8390400409698486
  },
  {
    Name: "Le Chalet",
    Latitude: 42.72085189819336,
    Longitude: 1.8390400409698486
  },
  {
    Name: "La Bonne Auberge",
    Latitude: 49.84539031982422,
    Longitude: 2.270289897918701
  },
  {
    Name: "La Bonne Auberge",
    Latitude: 49.84539031982422,
    Longitude: 2.270289897918701
  },
  {
    Name: "Au Vieux Moulin",
    Latitude: 48.81945037841797,
    Longitude: 7.280399799346924
  },
  {
    Name: "Au Cheval Blanc",
    Latitude: 49.029518127441406,
    Longitude: 7.714580059051514
  },
  {
    Name: "La Closerie des Roses",
    Latitude: 47.3848991394043,
    Longitude: -1.030269980430603
  },
  {
    Name: "La Taverne Alsacienne",
    Latitude: 48.09370040893555,
    Longitude: 7.307040214538574
  },
  {
    Name: "La Table d'Antan",
    Latitude: 48.640621185302734,
    Longitude: 2.326659917831421
  },
  {
    Name: "Au Chapeau Rouge",
    Latitude: 47.16611862182617,
    Longitude: 0.23795999586582184
  },
  {
    Name: "L'Artimon",
    Latitude: 47.08232879638672,
    Longitude: -2.0344600677490234
  },
  {
    Name: "Maison Gambert",
    Latitude: 45.07027816772461,
    Longitude: 4.837609767913818
  },
  {
    Name: "L'Embellie",
    Latitude: 46.7459716796875,
    Longitude: -1.1142300367355347
  },
  {
    Name: "La Table",
    Latitude: 43.59048080444336,
    Longitude: 6.300610065460205
  },
  {
    Name: "La Table",
    Latitude: 43.59048080444336,
    Longitude: 6.300610065460205
  },
  {
    Name: "Comptoir des Voyageurs",
    Latitude: 48.09865188598633,
    Longitude: -4.206620216369629
  },
  {
    Name: "Voyages des sens",
    Latitude: 44.916168212890625,
    Longitude: 5.657559871673584
  },
  {
    Name: "La Fleur de Sel",
    Latitude: 45.59130096435547,
    Longitude: 6.456699848175049
  },
  {
    Name: "La Fleur de Sel",
    Latitude: 45.59130096435547,
    Longitude: 6.456699848175049
  },
  {
    Name: "La Fleur de Sel",
    Latitude: 45.59130096435547,
    Longitude: 6.456699848175049
  },
  {
    Name: "Le Jardin",
    Latitude: 48.81435012817383,
    Longitude: 7.788680076599121
  },
  {
    Name: "Le Jardin",
    Latitude: 48.81435012817383,
    Longitude: 7.788680076599121
  },
  {
    Name: "La Colombe",
    Latitude: 43.120208740234375,
    Longitude: 6.131010055541992
  },
  {
    Name: "L'Escargot",
    Latitude: 47.25973129272461,
    Longitude: -0.07940000295639038
  },
  {
    Name: "Ttotta",
    Latitude: 43.35641860961914,
    Longitude: -1.5491100549697876
  },
  {
    Name: "Au Bon Accueil",
    Latitude: 48.85717010498047,
    Longitude: 2.341399908065796
  },
  {
    Name: "Le Vauban",
    Latitude: 49.64046859741211,
    Longitude: -1.6160800457000732
  },
  {
    Name: "Au Fil des Saisons",
    Latitude: 47.50693130493164,
    Longitude: 6.862810134887695
  },
  {
    Name: "Au Fil des Saisons",
    Latitude: 47.50693130493164,
    Longitude: 6.862810134887695
  },
  {
    Name: "Chez Michel",
    Latitude: 48.85717010498047,
    Longitude: 2.341399908065796
  },
  {
    Name: "Chez Michel",
    Latitude: 48.85717010498047,
    Longitude: 2.341399908065796
  },
  {
    Name: "Le Colvert",
    Latitude: 43.767601013183594,
    Longitude: 1.7518600225448608
  },
  {
    Name: "L'Atelier",
    Latitude: 45.1840705871582,
    Longitude: 0.7232000231742859
  },
  {
    Name: "Au Bon Accueil",
    Latitude: 48.5513801574707,
    Longitude: -0.5082100033760071
  },
  {
    Name: "Auberge des Deux Magots",
    Latitude: 47.519378662109375,
    Longitude: -2.300139904022217
  },
  {
    Name: "La Fleur de Sel",
    Latitude: 49.41944885253906,
    Longitude: 0.23287999629974365
  },
  {
    Name: "La Fleur de Sel",
    Latitude: 49.41944885253906,
    Longitude: 0.23287999629974365
  },
  {
    Name: "La Fleur de Sel",
    Latitude: 49.41944885253906,
    Longitude: 0.23287999629974365
  },
  {
    Name: "La Merenda",
    Latitude: 43.70024871826172,
    Longitude: 7.277740001678467
  },
  {
    Name: "Le Rabelais",
    Latitude: 43.550048828125,
    Longitude: 5.032959938049316
  },
  {
    Name: "Le Rabelais",
    Latitude: 43.550048828125,
    Longitude: 5.032959938049316
  },
  {
    Name: "Au Cheval Blanc",
    Latitude: 48.81945037841797,
    Longitude: 7.280399799346924
  },
  {
    Name: "Le Quai",
    Latitude: 45.07027816772461,
    Longitude: 4.837609767913818
  },
  {
    Name: "Le Lancelot",
    Latitude: 48.07204818725586,
    Longitude: 2.134929895401001
  },
  {
    Name: "Auberge de la Roche",
    Latitude: 47.457759857177734,
    Longitude: -0.6583999991416931
  },
  {
    Name: "Auberge du Moulin",
    Latitude: 49.600563049316406,
    Longitude: 1.1127519607543945
  },
  {
    Name: "Coteaux et Fourchettes",
    Latitude: 44.229740142822266,
    Longitude: 4.932040214538574
  },
  {
    Name: "La Griotte",
    Latitude: 46.65663146972656,
    Longitude: 4.672249794006348
  },
  {
    Name: "La Maison",
    Latitude: 45.693790435791016,
    Longitude: -0.3251200020313263
  },
  {
    Name: "La Maison",
    Latitude: 45.693790435791016,
    Longitude: -0.3251200020313263
  },
  {
    Name: "Pomze",
    Latitude: 48.85717010498047,
    Longitude: 2.341399908065796
  },
  {
    Name: "La Part des Anges",
    Latitude: 43.60803985595703,
    Longitude: 2.242110013961792
  },
  {
    Name: "Histoire Ancienne",
    Latitude: 50.953189849853516,
    Longitude: 1.853659987449646
  },
  {
    Name: "Au Colombier",
    Latitude: 46.62184143066406,
    Longitude: 2.45194411277771
  },
  {
    Name: "L'Arum",
    Latitude: 43.120208740234375,
    Longitude: 6.131010055541992
  },
  {
    Name: "Le Dauphin",
    Latitude: 49.18436813354492,
    Longitude: -0.3610900044441223
  },
  {
    Name: "Le Dauphin",
    Latitude: 49.18436813354492,
    Longitude: -0.3610900044441223
  },
  {
    Name: "La Maison Carrier",
    Latitude: 45.92498016357422,
    Longitude: 6.8714799880981445
  },
  {
    Name: "Les Capucins",
    Latitude: 47.639251708984375,
    Longitude: 6.863659858703613
  },
  {
    Name: "Ar Maen Hir",
    Latitude: 48.09865188598633,
    Longitude: -4.206620216369629
  },
  {
    Name: "Le Tire Bouchon",
    Latitude: 47.75017166137695,
    Longitude: -3.366849899291992
  },
  {
    Name: "Le Bastion",
    Latitude: 43.092891693115234,
    Longitude: 2.6192901134490967
  }
];

/*
//Note: Act like a return.
export const Distance = () => (
  <div>
    <h2>Distance</h2>
    <form onSubmit={this.handleSubmit}>
      <label htmlFor="username">Enter username</label>
      <input id="username" name="username" type="text" />

      <label htmlFor="email">Enter your email</label>
      <input id="email" name="email" type="email" />

      <label htmlFor="birthdate">Enter your birth date</label>
      <input id="birthdate" name="birthdate" type="text" />

      <button>Send data!</button>
    </form>
  </div>
);
*/
