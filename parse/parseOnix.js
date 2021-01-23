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
var Author = require('./models/author');
var Book = require('./models/book');
var Narrator = require('./models/narrator');

const onixlookup = require('./onixKeyLookup');
const notification = require('../lib/codes/notification');
const onixKeyLookup = onixlookup.onixKeyLookup;

var macXml = fs.readFileSync('./xml/MacmillanMetadata.xml', { encoding: 'utf-8' });
var onix21Xsd = fs.readFileSync('./ONIX2.1/ONIX_BookProduct_CodeLists.xsd', { encoding: 'utf-8' });
// var EPUBDIRECT = fs.readFileSync(path.join(__dirname, './fixtures/epubDirect.xml'), { encoding: 'utf-8' });

// Local MongoDB connection
console.log("db_url = " + db_url);
mongoose.connect(db_url, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}).then(({ db: abantu }) => console.log('Connected to ${abantu}'))
	.catch(err => console.error(err));

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

// Parse the input onix xml file
var xmlFeed = onix.parse(macXml, "2.1");

const convertedSchemas = xs2js.processAllSchemas({
	schemas: { 'onix.xsd': onix21Xsd }
});
const jsonSchema = convertedSchemas['onix.xsd'].getJsonSchema();

// printJsonSchema(jsonSchema);

// Process the ONIX XML Feed
processOnixJson(xmlFeed, jsonSchema);

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
	var testBook = products[1];

	console.log("Process ONIX Json data:");
	console.log("Products len = " + products.length);
	console.log("\n");

	// TODO: Loop through all products and attache the XSD CodeLists for search
	console.log("JSON Test Book:");
	console.log(testBook);
	console.log("\n");

	// loop through object and look up the code lists
	console.log("Test Book keys:")
	var mongoBook = {};
	var mongoAuthor = {};
	var mongoNarrator = {};	
	for (key in testBook) {
		var fieldVal = testBook[key];
		console.log("------------------------------------------");
		console.log("Book field:");
		console.log("key = " + key);
		console.log("field is Array = " + Array.isArray(fieldVal));
		console.log("field value:");
		console.log(fieldVal);
		console.log("\n");

		// Call the notification function
		if (key == "notification") {
			var notificationReturn = onixKeyLookup[key][fieldVal]();
			console.log("Notification return = " + notificationReturn + "\n");
		}	

		if (key == "cityOfPublication") {
			var cityPub = onixKeyLookup[key](fieldVal);
			console.log("City of pub = " + JSON.stringify(cityPub));
		}
		
		console.log("Onix Key/Val:");
		var onixKeyVal = onixKeyLookup[key];
		console.log(onixKeyVal);
		console.log("\n");

		// check what type of field
	}

	// Lookup the key value pairs
	/*	
	console.log("ONIX Key Lookup:");
	console.log(onixLookup.onixKeyLookup);
	console.log("\n");
	*/

	// Query the database and INSERT new document to a collection
	ISBN = 9374281;
	updateMongoCollection(ISBN);

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

// TEST: Find book
function updateMongoCollection(ISBN) {
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
		/*	
		let obj = book.id.find(o => o.type === 15);
		let isbn = obj.value;
		console.log("Object:"); console.log(obj); console.log("\n");

		var myBook = {
			ISBN: isbn
		}
		*/
	});
}

function printJsonSchema(jsonSchema) {
	console.log("JSON Schema Keys:");
	for (key in jsonSchema) {
		console.log(key);
	}
	console.log(jsonSchema['description']);
	console.log("\n");
	var properties = jsonSchema["properties"];
	var definitions = jsonSchema["definitions"];
	console.log("\n");
	console.log(definitions["List2"]);
	console.log("\n");
}