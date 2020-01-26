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
//console.log(test);
//console.log(content2.prototype.includes("le baribal"));

