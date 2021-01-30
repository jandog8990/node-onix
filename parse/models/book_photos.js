// Model will use the wp_BOOK_PHOTOS table
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookPhotosSchema = new Schema(
	{
		//PHOTO_ID: { type: Number, default: null, required: true },
		PHOTO_ID: Number,
		PHOTO_DATE: Object, 
		PHOTO_LOC: String, 
		PHOTO_TYPE: Object, 
		DESCRIPTION: Object, 
		THUMBNAIL_LOC: String, 
		HQ_LOC: String,	
		LINK_TYPE: String,
	},
	{
		// set collection to wp_BOOK_PHOTOS table
		collection: 'wp_BOOK_PHOTOS'
	}
);

// export the Audio model for the API
//module.exports = mongoose.model('Audio', audioSchema, 'audio');
module.exports = mongoose.model('BookPhotos', bookPhotosSchema); 
