// read hymn json object from file and console log the json object
// Usage: node test_extract.js [hymn number]

// command line arguments
var args = process.argv.slice(2);
hymn = args[0];

var fs = require('fs');
var path = require('path');
var jsonPath = path.join(__dirname, 'hymns-json', `${hymn}.json`);

var text = fs.readFileSync(jsonPath, 'utf8');
var data = JSON.parse(text);
console.log(data);