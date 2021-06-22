// Model will use the wp_BOOKS table
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Join query for BOOKS and AUDIO tables
/*
const bookAudioList = db.wp_BOOKS.aggregate([ { $lookup: { from: "wp_AUDIO", localField: "ISBN", foreignField: "ISBN", as: "audio_list" } }, { $unwind: '$audio_list' }, { $sort: {  'audio_list.CHAPTER':1 } }, { $project: { "ISBN": 1, "TITLE": 1, "SUMMARY": 1, "audio_list.TITLE": 1, "audio_list.CHAPTER": 1, "audio_list.AUDIO_LOC": 1, "audio_list.NARRATOR": 1, "audio_list.DEMO_LOC": 1 } }, { $group: { _id: '$_id', ISBN: { $first: "$ISBN" }, TITLE: { $first: "$TITLE" }, SUMMARY: { $first: "$SUMMARY" }, 'audio_list': { $push: '$audio_list' } } } ] ).toArray();
*/

const bookSchema = new Schema(
	{
		// ISBN: { type: Number, default: null, required: true },
		ISBN: {type: Number},
		ISBN13: String,	
		TITLE: String,
		TITLE_ACRONYM: {type: String},
		TITLE_ABBREVIATED: String,	
		EDITION: Object,
		AUTHOR_ID: Number,	// user._id.toString() from other table
		AUTHORS: {type: Array, default: []},	// array of author ids	
		BIOGRAPHICAL_NOTE: String,	
		NARRATORS: {type: Array, default: []},	// array of narrator ids 
		GENRES: {type: Array, default: []},	// array of strings of genre ids 
		SUBJECTS: {type: Array},	
		AUDIENCE: String,	
		PUBLISHER_ID: Object, 
		PRICE: Number,
		COPYRIGHT_NAME: String,
		COPYRIGHT_YEAR: Object,
		SUMMARY: String,
		SHORT_SUMMARY: String,
		LONG_SUMMARY: String,	
		PHOTO_ID: Number,
		SEARCH_ID: String,
		NUM_CHAPTERS: Number,
		TOTAL_TIME: String,
		CREATED: {type: Date, default: Date.now},
		UPDATED: {type: Date, default: Date.now},
		PUBLICATION_DATE: {type: Date, default: Date.now},
		NOTIFICATION: String,		// checks the publication availability flag (TODO: Check notification and pub status)	
		PUBLISHING_STATUS: Boolean,	// checks publishing status flag	
		CITY_OF_PUBLICATION: String,
		SALES_RIGHTS: String 
	},
	{
		// set the collection to our wp_BOOKS table
		collection: 'BOOK_NEW'
	}
);
// function for linking multiple tables using aggregate and $lookup

// Virtual for book's URL
bookSchema.virtual('url').get(function() {
	return '/books/' + this._id;
});

// bookSchema.index({ISBN13: 1, TITLE: 1}, {unique: true});
bookSchema.index({TITLE: 1}, {unique: true});

// export the Books model for the API
module.exports = mongoose.model('Book', bookSchema); 
