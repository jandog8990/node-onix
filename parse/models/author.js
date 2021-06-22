// Model will use the wp_AUTHOR table
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * TODO: Change this to be a CONTRIBUTOR table rather than AUTHOR
 * to encapsulate all types of contributors from Author, Artist to Editor.
 * This will involve all calls to the AUTHOR table and updating aggregates
 * and the main detail book page.
 */

//AUTHOR_ID: { type: Number, default: null, required: true },
const authorSchema = new Schema(
	{
		AUTHOR_ID: Number,
		LASTNAME: String, 
		FIRSTNAME: String, 
		MI: String, 
	    ARTIST: {type: Boolean, default: false},	// artist (art??) 
        GHOST: {type: Boolean, default: false},	// ghost author 
	    ADAPTED_BY: {type: Boolean, default: false},    // adapted by
	    EDITED_BY: {type: Boolean, default: false},    // edited by
		TRANSLATOR: {type: Boolean, default: false},	// translator
	    FOREWORD_BY: {type: Boolean, default: false},    // foreword by
	    AFTERWORD_BY: {type: Boolean, default: false},    // afterword by
	    COMPILED_BY: {type: Boolean, default: false},    // compiled by
        NICKNAME: String,	
		GENDER: String, 
		BIRTH_DATE: Object, 
		ADDRESS: String, 
		BIOGRAPHY: String,	// ONIX Biographical Note 
	},
	{
		// set collection to wp_AUDIO table
		collection: 'AUTHOR_NEW'
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
