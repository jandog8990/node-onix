// Model for the wp_GENRES table
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema(
    {
        NAME: String,
        SEARCH_ID: String,
        PHOTO_LOC: String,
        BISAC_SUBJECTS: {type: Array, default: []},  // BISAC standard 
        BIC_SUBJECTS: {type: Array, default: []},    // BIC standard
        BIC_EDUCATION: String,
        BIC_READING_LEVEL: String,
        KEYWORDS: {type: Array, default: []}    // KEYWORDS
    },
    {
        // set collection to wp_GENRES
        collection: 'wp_GENRES'
    }
);

// Export the Genre model for API calls
module.exports = mongoose.model('Genre', genreSchema);