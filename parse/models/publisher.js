// Model will use the wp_PUBLISHER table
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publisherSchema = new Schema(
	{
		PUBLISHER_NAME: {type: String, required: true, unique: true},
		COUNTRY: String,
		YEAR: Number,
		SEARCH_ID: String,	
		PHOTO_LOC: String,
		THUMBNAIL_LOC: String,
	},
	{
		// set the collection to wp_PUBLISHER
		collection: 'PUBLISHER_NEW'
	}
);

// export the Publisher model for the API
module.exports = mongoose.model('Publisher', publisherSchema);
