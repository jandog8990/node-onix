var fs = require('fs');
var should = require('should');
var path = require('path');

var onix = require('../');

var EPUBDIRECT = fs.readFileSync('../test/fixtures/MacmillanMetadata.xml', { encoding: 'utf-8' });
// var EPUBDIRECT = fs.readFileSync(path.join(__dirname, './fixtures/epubDirect.xml'), { encoding: 'utf-8' });

var feed = onix.parse(EPUBDIRECT, "2.1");
var products = feed.products;
console.log(JSON.stringify(products, null, 4));
console.log("\n");
console.log("Products len = " + products.length);
console.log("\n");
        // console.log(onix.create(feed));