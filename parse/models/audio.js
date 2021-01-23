// Model will use the wp_AUDIO table
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const audioSchema = new Schema(
	{
		//AUDIO_ID: { type: Number, default: null, required: true },
		AUDIO_ID: Number,
		TITLE: String,
		AUDIO_TYPE: String,
		AUDIO_SIZE: Object,
		PLAYTIME: Object,
		AUDIO_LOC: String,
		LANGUAGE: Object,
		NARRATOR: String,
		PRICE: Object,
		AUTHOR_ID: Number,
		GENRE_ID: Object,
		CONDUCTOR: String,
		CHAPTER: Object,
		DATE: {type: Date, default: Date.now},
		CREATED: {type: Date, default: Date.now},
		UPDATED: {type: Date, default: Date.now},
		COMPANY: String,
		COMPANY_URL: String,
		ISBN: Number,
		DEMO_LOC: String,
        PHOTO_ID: Object,
        DURATION: Number
	},
	{
		// set collection to wp_AUDIO table
		collection: 'wp_AUDIO'
	}
);

// export the Audio model for the API
//module.exports = mongoose.model('Audio', audioSchema, 'audio');
module.exports = mongoose.model('Audio', audioSchema); 
