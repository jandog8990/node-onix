var fs = require('fs');
var should = require('should');
var path = require('path');
var onix = require('../');
var xsd = require('xsd');
var _ = require('lodash');
const onixLookup = require("./onixKeyLookup");

// Mongoose and database connection configs
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const secrets = require('./secrets');
const db_url = secrets.db_url;

// XS2JS
const Xsd2JsonSchema = require('xsd2jsonschema').Xsd2JsonSchema;
const xs2js = new Xsd2JsonSchema();

// DB Models for Mongo tables
var Author = require('./models/author');
var Audio = require('./models/audio');
var Book = require('./models/book');
var BookPhotos = require('./models/book_photos');
var Narrator = require('./models/narrator');
var Subject = require('./models/subject');
var Publisher = require('./models/publisher');
var BookReview = require('./models/book_review');
var BookExtra = require('./models/book_extra');

const onixlookup = require('./onixKeyLookup');
const notification = require('../lib/codes/notification');
const onixKeyLookup = onixlookup.onixKeyLookup;
const dbLookup = require('./mongoLookup');
const tables = dbLookup.tables;
const { BOOK_TABLE, AUTHOR_TABLES, NARRATOR_TABLES,
	PUBLISHER_TABLE, SUBJECT_TABLES, BOOK_PHOTO_TABLES, AUDIO_TABLES, BOOK_EXTRA, BOOK_REVIEW } = tables;

// Read input files from the command line
var xmlFile = process.argv[2];
console.log("XML file = " + xmlFile);

var macXml = fs.readFileSync(xmlFile, { encoding: 'utf-8' });
var onix21Xsd = fs.readFileSync('./ONIX2.1/ONIX_BookProduct_CodeLists.xsd', { encoding: 'utf-8' });
// var onix30Xsd = fs.readFileSync('./ONIX3.0/ONIX_BookProduct_CodeLists.xsd', { encoding: 'utf-8' });
// var EPUBDIRECT = fs.readFileSync(path.join(__dirname, './fixtures/epubDirect.xml'), { encoding: 'utf-8' });

// Local MongoDB connection
console.log("db_url = " + db_url);
mongoose.connect(db_url, {
	useCreateIndex: true,
	autoIndex: true,
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
// var xmlFeed = onix.parse(macXml, "3.0");

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
async function processOnixJson(onixJson, xsdJson) {
	console.log("ONIX Json:");
	console.log(onixJson);	
	console.log("\n");	

	var products = onixJson.products;
	var testBook = products[0];

	console.log("Process ONIX Json data:");
	console.log("Products len = " + products.length);
	console.log("\n");

	// TODO: Loop through all products and attache the XSD CodeLists for search
	console.log("JSON Test Book:");
	console.log(testBook);
	console.log("\n");

	// TODO: Loop through all books and feed to the update objects
	//for (var ii = 0; ii < 1; ii++) {
	for (var ii = 0; ii < products.length; ii++) {
		const book = products[ii];
		console.log("BOOK[ " + ii + " ]");
		console.log(book["title"]);
		console.log("\n");

		// loop through object and look up the code lists
		var mongoBook = {};
		var mongoAuthors = [];	// array of objs as there could be mult authors
		var mongoNarrators = [];	// array of objs as there could be mult narrators 
		var mongoPublisher = {};
		var mongoSubjects = [];
		var mongoBookPhotos = [];
		var mongoAudioTables = [];
		var mongoBookReviews = [];
		var mongoBookExtras = [];
		var mongoSubject = {};

		// table to edit when looking up the role, type and identifier
		var tablesToEdit = {
			BOOK_TABLE: mongoBook,
			AUTHOR_TABLES: mongoAuthors,
			NARRATOR_TABLES: mongoNarrators,
			PUBLISHER_TABLE: mongoPublisher,
			SUBJECT_TABLES: mongoSubjects,
			BOOK_PHOTO_TABLES: mongoBookPhotos,
			AUDIO_TABLES: mongoAudioTables,
			BOOK_REVIEW_TABLES: mongoBookReviews,
			BOOK_EXTRA_TABLES: mongoBookExtras
		}
		updateObjects(book, tablesToEdit, mongoBook, mongoAuthors,
			mongoNarrators, mongoPublisher, mongoSubjects, mongoBookPhotos,
			mongoAudioTables, mongoBookReviews, mongoBookExtras);


		// Update the SUBJECT table since it has all fields for one table
		for (const obj of mongoSubjects) {
			for (var key in obj) {
				mongoSubject[key] = obj[key];
			}
		}

		// Update the BOOK_PHOTOS with the ISBN13 from the main book 
		ISBN13 = mongoBook.ISBN13;
		for (const obj of mongoBookPhotos) {
			obj["ISBN13"] = ISBN13;
		}

		// First show the updates to the tables
		console.log("Book Table:");
		console.log(mongoBook);
		console.log("\n");

		console.log("Authors:");
		console.log(mongoAuthors);
		console.log("\n");

		console.log("Narrators:");
		console.log(mongoNarrators);
		console.log("\n");

		console.log("Publisher:");
		console.log(mongoPublisher);
		console.log("\n");

		console.log("Subject Table:");
		console.log(mongoSubject);
		console.log("\n");

		console.log("Book Photos:");
		console.log(mongoBookPhotos);
		console.log("\n");

		console.log("Audio Tables:");
		console.log(mongoAudioTables);
		console.log("\n");

		console.log("Book Reviews:");
		console.log(mongoBookReviews);
		console.log("\n");

		console.log("Book Extras:");
		console.log(mongoBookExtras);
		console.log("\n");

		// INSERT new collections into the mongo db 
		/*	
		try {
			await insertMongoCollections(mongoBook, mongoAuthors, mongoNarrators, mongoPublisher,
				mongoSubject, mongoBookPhotos, mongoAudioTables, mongoBookReviews, mongoBookExtras);
		} catch (err) {
			console.error(err.message);
		}
		*/

		// Test for checking a BOOK can be queried
		/*	
		ISBN = 9374281;
		updateMongoCollection(ISBN);
		*/
	}
	process.exit(0);	
}

/**
 * Update the specified table with fields to insert into the DB 
 * @param {*} book 
 * @param {*} tablesToEdit 
 * @param {*} bookTable 
 * @param {*} authorTables 
 * @param {*} narratorTables 
 * @param {*} publisherTable 
 * @param {*} subjectTables 
 */
function updateObjects(book, tablesToEdit, bookTable, authorTables,
	narratorTables, publisherTable, subjectTables, bookPhotoTables,
	audioTables, bookReviewTables, bookExtraTables) {

	// check Array.isArray() for imported objects
	for (key in book) {
		var bookField = book[key];
		var isArray = Array.isArray(bookField);
		//console.log("Book key = " + key);
		//console.log("Book field = " + bookField);
		//console.log("\n");

		// Check the field type Number, String, Object, Array
		if (isArray) {

			// loop through the array and process the objects
			for (var i = 0; i < bookField.length; i++) {
				// for each field object process and update tables accordingly	
				var fieldObj = bookField[i];

				// TODO: here depending on the type we need to create new objects
				checkUpdateObjectTable(key, fieldObj, tablesToEdit);
			}
		} else {
			// check the type of the field
			var fieldType = typeof bookField;

			// Call the notification function
			if (key == "notification") {
				onixKeyLookup[key][bookField](bookTable,
					authorTables, narratorTables);
			} else {

				if (onixKeyLookup[key] != undefined && onixKeyLookup[key] != null) {

					// Check the field type for Object vs Primitive types
					if (fieldType == "object") {

						// check for the publisher since it's a single key object
						if (key == "publisher") {
							var publisherName = bookField["name"];
							onixKeyLookup[key](publisherName, publisherTable);
						} else {

							// Get the length of the object and parse
							var objSize = getObjectSize(bookField);

							if (objSize == 0) {
								// This block will take care of single key/value pair in the fields
								onixKeyLookup[key](bookField, bookTable, authorTables, narratorTables);
							} else {

								// Object is a hashmap - process type and update mongo table 
								if (key == "title") {
									checkUpdateObjectTable(key, bookField, tablesToEdit);
								}
							}
						}
					} else {
						// This block will take care of simple key/value pairs in the fields
						onixKeyLookup[key](bookField, bookTable, authorTables, narratorTables);
					}
				}
			}
		}
	}
}

async function insertMongoCollections(mongoBook, mongoAuthors, mongoNarrators, mongoPublisher,
	mongoSubject, mongoBookPhotos, mongoAudioTables, mongoBookReviews, mongoBookExtras) {

	try {
		/*	
		ISBN = 9374281;
		const bookResult = await Book.findOne({ 'ISBN': ISBN }, { SUMMARY: 0 });//function (err, book) {
		console.log("Book Mongo:");
		console.log(bookResult);
		console.log("\n");
		*/

		// Save the AUTHOR tables to the DB	
		var authorIds = [];	// received from mongo after insertion	
		const authorResult = await Author.insertMany(mongoAuthors); 
		console.log("Author Result:");
		console.log(authorResult);
		console.log("\n");
		for (const obj of authorResult) {
			authorIds.push(new ObjectId(obj["_id"]));
		}
		console.log("Author ids:");
		console.log(authorIds);
		console.log("\n");

		// Save the NARRATOR tables to the DB	
		var narratorIds = [];	// received from mongo after insertion	
		const narratorsResult = await Narrator.insertMany(mongoNarrators);
		console.log("Narrators Result:");
		console.log(narratorsResult);
		console.log("\n");
		for (const obj of narratorsResult) {
			narratorIds.push(new ObjectId(obj["_id"]));
		}
		console.log("Narrator ids:");
		console.log(narratorIds);
		console.log("\n");

		// Save the PUBLISHER table to the DB
		const publisherResult = await Publisher.create(mongoPublisher);
		console.log("Publisher Result:");
		console.log(publisherResult);
		console.log("\n");
		var publisherId = new ObjectId(publisherResult["_id"]);
		console.log("Publisher id:");
		console.log(publisherId);
		console.log("\n");

		// Save the SCHEMA tables to the DB
		const subjectResult = await Subject.create(mongoSubject);
		console.log("Subject Result:");
		console.log(subjectResult);
		console.log("\n");
		var subjectId = new ObjectId(subjectResult["_id"]);
		console.log("Subject id:");
		console.log(subjectId);
		console.log("\n");

		// Save the BOOK_PHOTOS to the DB
		var bookPhotoIds = [];	// received from mongo after insertion	
		const bookPhotosResult = await BookPhotos.insertMany(mongoBookPhotos);
		console.log("Book Photos Result:");
		console.log(bookPhotosResult);
		console.log("\n");
		for (const obj of bookPhotosResult) {
			bookPhotoIds.push(new ObjectId(obj["_id"]));
		}
		console.log("BookPhotos Result:");
		console.log(bookPhotosResult);
		console.log("\n");

		// update the BOOK table with AUTHOR_IDS array and everything else
		mongoBook.AUTHORS = authorIds;
		mongoBook.NARRATORS = narratorIds;
		mongoBook.PUBLISHER_ID = publisherId;
		mongoBook.SUBJECTS = new Array(subjectId);
		console.log("Mongo Book Creation:");
		console.log(mongoBook);
		console.log("\n");
		const bookResult = await Book.create(mongoBook);
		console.log("Book Result:");
		console.log(bookResult);
		console.log("\n");

		console.log("STORAGE SUCCESSFUL! -> EXIT()")
		//process.exit(0);
		return 0;
	} catch (err) {
		console.error("Mongo err:", err);
		process.exit(1);
	}
}


/**
 * Update the MongoTable using the object and book fields/keys 
 * @param {*} mainKey 
 * @param {*} bookField 
 * @param {*} tablesToEdit 
 */
function checkUpdateObjectTable(mainKey, bookField, tablesToEdit) {
	// bookTable, authorTables, narratorTables, publisherTable) {

	// 1: First find type, identifier, role
	var typeKeys = ["role", "type", "identifier"];
	var mongoTable;
	var fieldToEdit;
	var editTable = false;
	for (var tt in typeKeys) {
		var typeKey = typeKeys[tt];

		if (typeKey in bookField) {
			var subVal = bookField[typeKey];
		
			//TODO: Needed for checking missing keys in the onixKeyLookup script
		    /*	
            console.log("mainKey = " + mainKey);	
			console.log("typeKey = " + typeKey);	
			console.log("subVal = " + subVal);
			console.log("\n");
            */

			var tableKeyArray = onixKeyLookup[mainKey][typeKey][subVal]();

			if (tableKeyArray.length != 0) {
				mongoTable = tablesToEdit[tableKeyArray[0]];
				fieldToEdit = tableKeyArray[1];
				editTable = true;
			}
			delete bookField[typeKey];
			break;
		}
	}

	// now loop through the remaining keys and update table if needed
	if (editTable) {
		for (var subKey in bookField) {
			var eval = bookField[subKey];
			if (subKey in onixKeyLookup[mainKey]) {
				onixKeyLookup[mainKey][subKey](mongoTable, fieldToEdit, eval);
			}
		}
	}
}

// Check the size of the Object
function getObjectSize(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
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

		process.exit();
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
