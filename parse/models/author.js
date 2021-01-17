// Model will use the wp_AUTHOR table
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema(
	{
		//AUTHOR_ID: { type: Number, default: null, required: true },
		AUTHOR_ID: Number,
		MI: String, 
		LASTNAME: String, 
		FIRSTNAME: String, 
		NICKNAME: String, 
		GENDER: String, 
		BIRTH_DATE: Object, 
		ADDRESS: String, 
		BIOGRAPHY: String, 
	},
	{
		// set collection to wp_AUDIO table
		collection: 'wp_AUTHOR'
	}
);

// Virtual for author's URL (handled in routes)
authorSchema.virtual('url').get(function() {
	return '/author/' + this._id;
});

// export the Audio model for the API
//module.exports = mongoose.model('Audio', audioSchema, 'audio');
module.exports = mongoose.model('Author', authorSchema); 
