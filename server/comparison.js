const fs = require('fs') 

var json = JSON.parse(fs.readFileSync('server/bib_res.json').toString());
var json2 = JSON.parse(fs.readFileSync('server/maitre_res.json').toString());

//console.log(json);
//console.log(json2);

var liste = [];

console.log('la mýtairie (annabelle baumert)'.includes('la mýtairie'));

for(var index = 0; index < json.length; index++)
{
    //console.log(index);
    for(var index2 = 0; index2 < json2.length; index2++)
    {
        //console.log(json2[index2]['Name'].toLowerCase())
        //console.log(json[index]['Name'].toLowerCase())
        //Put to lower case + erasing words between (). Then check if includes words...
        if(json2[index2]['Name'].toLowerCase().replace(/ *\([^)]*\) */g, "") == (json[index]['Name'].toLowerCase()))
        {
            liste.push(json[index]['Name']);
        }
    }
}

var count = 1;

liste.forEach(element => {
    console.log(count + ": " + element);
    count++;
});

//Old version
/*
const fs = require('fs') 

var content1 = fs.readFileSync('server/bib_res.txt')
content1 = content1.toString();
content1 = content1.toLowerCase();
console.log(content1); 

var content2 = fs.readFileSync('server/maitre_res.txt')
content2 = content2.toString();
content2 = content2.toLowerCase();
console.log(content2); 

var test = content1.split(",");
var index = 0;
test.forEach(element => {
    element = element.replace('\"', '');
    element = element.replace('[', '');
    element = element.replace(']', '');
    element = element.substring(0, element.length - 1)
    if(content2.includes(element))
    {
        console.log(index + ": " + element);
        index = index + 1;
    }
});
*/
//console.log(test);
//console.log(content2.prototype.includes("le baribal"));

