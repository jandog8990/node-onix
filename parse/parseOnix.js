var fs = require('fs');
var should = require('should');
var path = require('path');
var onix = require('../');
var xsd = require('xsd');
var _ = require('lodash');
const onixLookup = require("./onixKeyLookup");

// Mongoose and database connection configs
const mongoose = require('mongoose');
const secrets = require('./secrets');
const db_url = secrets.db_url;

// XS2JS
const Xsd2JsonSchema = require('xsd2jsonschema').Xsd2JsonSchema;
const xs2js = new Xsd2JsonSchema();

// DB Models for Mongo tables
var Book = require('./models/book');
const onixKeyLookup = require('./onixKeyLookup');

var macXml = fs.readFileSync('./xml/MacmillanMetadata.xml', { encoding: 'utf-8' });
var onix21Xsd = fs.readFileSync('./ONIX2.1/ONIX_BookProduct_CodeLists.xsd', { encoding: 'utf-8' });
// var EPUBDIRECT = fs.readFileSync(path.join(__dirname, './fixtures/epubDirect.xml'), { encoding: 'utf-8' });

var xmlFeed = onix.parse(macXml, "2.1");

const convertedSchemas = xs2js.processAllSchemas({
	schemas: {'onix.xsd': onix21Xsd}
});
const jsonSchema = convertedSchemas['onix.xsd'].getJsonSchema();
console.log("JSON Schema:");
console.log(JSON.stringify(jsonSchema, null, 2));
console.log("\n");

console.log("JSON Schema Keys:");
for(key in jsonSchema) {
	console.log(key);
}
console.log(jsonSchema['description']);
console.log("\n");
var properties = jsonSchema["properties"];
var definitions = jsonSchema["definitions"];
console.log("\n");
console.log(definitions["List2"]);
console.log("\n");

// Process the ONIX XML Feed
processOnixJson(xmlFeed, jsonSchema);

// Lookup the key value pairs
console.log("ONIX Key Lookup:");
console.log(onixLookup.onixKeyLookup);
console.log("\n");

// Converts XSD File to JSON Schema type (this didnt expand objects in the XSD Schema)
/*
xsdFile = './ONIX2.1/ONIX_BookProduct_CodeLists.xsd';
xsd.fileToFlatJSON(xsdFile, function (err, xsdObject) {
xsd.stringToFlatJSON(onix21Xsd, function (err, xsdObject) {
	if (err) {
		console.error("XSD Error:");
		console.error(err);
		console.error("\n");
	}

	var matchVal = getValue(xsdObject, "xs:List138");
	console.log("Matched val:");
	console.log(matchVal);
	console.log("\n");

	// read the json file and pass xsdObject
	processOnixJson(xmlFeed, xsdObject);
});
function getValue(obj, searchKey) {
	console.log("GET VALUE!");	
	return obj.hasOwnProperty(searchKey) ? obj[searchKey] : "";
}
*/

/**
 * Process the json data onix xml feed 
 * @param {*} jsonData - parsed onix source 
 * @param {*} xsdSchema - xsd schema for code list 
 */
function processOnixJson(onixJson, xsdJson) {
	var products = onixJson.products;
	var testBook = products[0];

	console.log("Process ONIX Json data:");
	console.log("Products len = " + products.length);
	console.log("\n");

	// TODO: Loop through all products and attache the XSD CodeLists for search
	console.log("JSON Test Book:");
	console.log(testBook);
	console.log("\n");

	// loop through object and look up the code lists
	console.log("Test Book keys:")	
	for (key in testBook) {
		console.log(key);
	}
	console.log("\n");

	// console.log("JSON Stringify:");
	// console.log(JSON.stringify(products[0], null, 4));
	// console.log("\n");

	// Loop through the lists (restriction is 1??)
	/*	
	console.log("XSD List 1:");
	var xsd1 = getValue(xsdSchema, "xs:List1");
	console.log(xsd1);
	console.log("\n");

	// loop through the keys of the schema
	console.log("Schema Keys:");	
	Object.keys(xsdSchema).forEach(function(key, index) {
		console.log(key + " : " + index);
	});	
	console.log("\n");
	*/
}

// Local MongoDB connection
/*
console.log("db_url = " + db_url);
mongoose.connect(db_url, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}).then(({ db: abantu }) => console.log('Connected to ${abantu}'))
	.catch(err => console.error(err));
*/

// Atlas MongoDB connection
/*
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
*/

// TEST: Find book
/*
ISBN = 9374281;
Book.findOne({ 'ISBN': ISBN }, { SUMMARY: 0 }, function (err, book) {
	if (err) {
		console.error("Find error:");
		console.error(err);
		console.error("\n");
	}

	console.log("Book find:");
	console.log(book);
	console.log("\n");

	// Build up a book using the ONIX parsed file
	let obj = book.id.find(o => o.type === 15);
	let isbn = obj.value;
	console.log("Object:"); console.log(obj); console.log("\n");

	var myBook = {
		ISBN: isbn
	}
});
*/