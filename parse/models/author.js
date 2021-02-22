// Model will use the wp_AUTHOR table
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//AUTHOR_ID: { type: Number, default: null, required: true },
const authorSchema = new Schema(
	{
		AUTHOR_ID: Number,
		LASTNAME: String, 
		FIRSTNAME: String, 
		MI: String, 
		GHOST: {type: Boolean, default: false},	// ghost author 
		TRANSLATOR: {type: Boolean, default: false},	// translator 
		NICKNAME: String,	
		GENDER: String, 
		BIRTH_DATE: Object, 
		ADDRESS: String, 
		BIOGRAPHY: String,	// ONIX Biographical Note 
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

// Create index for both LASTNAME & FIRSTNAME to ensure uniqueness
authorSchema.index({LASTNAME: 1, FIRSTNAME: 1}, {unique: true});

// export the Audio model for the API
//module.exports = mongoose.model('Audio', audioSchema, 'audio');
module.exports = mongoose.model('Author', authorSchema); 
