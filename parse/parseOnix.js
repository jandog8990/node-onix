var fs = require('fs');
var should = require('should');
var path = require('path');
var onix = require('../');
var libxml = require('libxmljs');
var xsd = require('xsd');
// var xsd2json = require('xsd2json');
var _ = require('lodash');

// Mongoose and database connection configs
const mongoose = require('mongoose');
const secrets = require('./secrets');
const db_url = secrets.db_url;

// DB Models for Mongo tables
var Book = require('./models/book');

var macXml = fs.readFileSync('./xml/MacmillanMetadata.xml', { encoding: 'utf-8' });
var onix21Xsd = fs.readFileSync('./ONIX2.1/ONIX_BookProduct_CodeLists.xsd', { encoding: 'utf-8' });
// var EPUBDIRECT = fs.readFileSync(path.join(__dirname, './fixtures/epubDirect.xml'), { encoding: 'utf-8' });

var xmlFeed = onix.parse(macXml, "2.1");

xsdFile = './ONIX2.1/ONIX_BookProduct_CodeLists.xsd';
xsd.fileToFlatJSON(xsdFile, function (err, xsdObject) {
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
});

function getValue(obj, searchKey) {
	return obj.hasOwnProperty(searchKey) ? obj[searchKey] : "";
}

// XSD processing
/*
xsd2json(xsdFile, function(err, schemaObject) {
	if (err) {
		console.error("XSD Error:");
		console.error(err);
		console.error("\n");
	}	
	console.log("Schema object read");	
	console.log(JSON.stringify(schemaObject, null, 2));
});
*/

/*
var xsdFeed = libxml.parseXmlString(onix21Xsd);
console.log("XSD Feed:");
console.log(xsdFeed);
console.log("\n");
*/

var products = xmlFeed.products;
var testBook = products[0];
console.log("JSON Test Book:");
console.log(testBook);
console.log("\n");
// console.log("JSON Stringify:");
// console.log(JSON.stringify(products[0], null, 4));
// console.log("\n");
console.log("Products len = " + products.length);
console.log("\n");

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

// Parse the XSD schema for 2.1 or 3.0


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
	let obj = testBook.id.find(o => o.type === 15);
	let isbn = obj.value;
	console.log("Object:"); console.log(obj); console.log("\n");

	var myBook = {
		ISBN: isbn
	}
});
*/