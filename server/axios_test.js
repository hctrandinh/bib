const axios = require('axios');
const cheerio = require('cheerio');

/*
axios.get('http://webcode.me').then(resp => {

    console.log(resp.data);
});

async function makeGetRequest() {
  
    let res = await axios.get('http://webcode.me');
  
    let data = res.data;
    console.log(data);
  }
  
  makeGetRequest();

  async function makeHeadRequest() {
  
    let res = await axios.head('http://webcode.me');
    
    console.log(`Status: ${res.status}`)
    console.log(`Server: ${res.headers.server}`)
    console.log(`Date: ${res.headers.date}`)
  }
  
  makeHeadRequest();

  async function makeRequest() {

    const config = {
        method: 'get',
        url: 'http://webcode.me'
    }

    let res = await axios(config)

    console.log(res.status);
}

makeRequest();

async function makeRequest2() {

    const config = {
        method: 'get',
        url: 'http://webcode.me',
        headers: { 'User-Agent': 'Console app' }
    }

    let res = await axios(config)

    console.log(res.request._header);
}

makeRequest2();

async function getNumberOfFollowers() {
  
    let res = await axios.get('https://api.github.com/users/janbodnar');
    
    let nOfFollowers = res.data.followers;
    let location = res.data.location;
  
    console.log(`# of followers: ${nOfFollowers}`)
    console.log(`Location: ${location}`)
  }
  
  getNumberOfFollowers();

  async function makePostRequest() {

    let res = await axios.post('https://jsonplaceholder.typicode.com/posts');

    console.log(`Status code: ${res.status}`);
    console.log(`Status text: ${res.statusText}`);
    console.log(`Request method: ${res.request.method}`);
    console.log(`Path: ${res.request.path}`);

    console.log(`Date: ${res.headers.date}`);
    console.log(`Data: ${res.data}`);
}

makePostRequest();

const fs = require('fs');

var config = {
    responseType: 'stream'
};

let url = 'https://images.dog.ceo/breeds/setter-english/n02100735_4870.jpg';

async function getImage() {

    let resp = await axios.get(url, config);
    resp.data.pipe(fs.createWriteStream('image.jpg'));
}

getImage();



async function makeRequests() {

    let [u1, u2] = await Promise.all([
        axios.get('https://api.github.com/users/janbodnar'),
        axios.get('https://api.github.com/users/symfony')
    ]);

    console.log(`Jan Bodnar: ${u1.data.created_at}`);
    console.log(`Symfony: ${u2.data.created_at}`);
}

makeRequests();
*/

var res = [];

async function get_restaurants_by_page(page_nb) 
{
    var string_nb = String(page_nb);
    const result = await axios({
      method: 'post',
      url: 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult#',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: 'page='+string_nb+'&sort=undefined&request_id=ec830a0fb20e71279f65cd4fad4cb137&annuaire_mode=standard'
    });
    return result;
}

const parse = data => 
{
    const $ = cheerio.load(data);
    $('single_libel a').each((i, element) =>
    {
        var item = $(element).text;
        res.push(item);
    });
    console.log(res);
    return {res};
};

module.exports.scrapeRestaurant = async page_nb => 
{
    const result = await get_restaurants_by_page(page_nb);
    const {data, status} = result;
  
    if (status >= 200 && status < 300) {
      return parse(data);
    }
  
    console.error(status);
  
    return null;
};

get_restaurants_by_page(149)
/*
console.log("Data...\n");
console.log(data);
console.log("\n...End data.");
*/