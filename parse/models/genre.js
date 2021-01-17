// Model for the wp_GENRES table
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema(
    {
        NAME: String,
        SEARCH_ID: String,
        PHOTO_LOC: String
    },
    {
        // set collection to wp_GENRES
        collection: 'wp_GENRES'
    }
);

// Export the Genre model for API calls
module.exports = mongoose.model('Genre', genreSchema);