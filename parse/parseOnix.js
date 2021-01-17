var fs = require('fs');
var should = require('should');
var path = require('path');
var onix = require('../');
const mongoose = require('mongoose');

var EPUBDIRECT = fs.readFileSync('../test/fixtures/MacmillanMetadata.xml', { encoding: 'utf-8' });
// var EPUBDIRECT = fs.readFileSync(path.join(__dirname, './fixtures/epubDirect.xml'), { encoding: 'utf-8' });

var feed = onix.parse(EPUBDIRECT, "2.1");
var products = feed.products;
console.log("JSON Raw:");
console.log(products[0]);
console.log("\n");
// console.log("JSON Stringify:");
// console.log(JSON.stringify(products[0], null, 4));
// console.log("\n");
console.log("Products len = " + products.length);
console.log("\n");
        // console.log(onix.create(feed));

// Atlas MongoDB connection
const configDB = require('./config');
const mongoUri = configDB.get("MONGO_URI");
console.log("\nMongo URI:");
console.log(mongoUri);
console.log("\n");
mongoose.connect(mongoUri, { 
    reconnectTries: 80,
    reconnectInterval: 1000, 
    useCreateIndex: true, 
    useNewUrlParser: true 
},  (err, client) => {
	if (err) {
		console.log("Mongoose Connect Err:");
		console.log(err);
		console.log("\n");
	}
	console.log("Mongoose mLab Connect Successful!\n");
});