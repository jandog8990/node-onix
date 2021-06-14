// Model for the BOOK_REVIEW table
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookReviewSchema = new Schema(
    {
        ISBN13: String, 
        REVIEW_QUOTE: String,
        REVIEW_PREVIOUS_EDITION: String,
        REVIEW_TEXT: String,
        PROMOTIONAL_HEADLINE: String, 
        PREVIOUS_REVIEW_QUOTE: String, 
        AUTHOR_COMMENTS: String,
    },
    {
        // set collection to wp_GENRES
        collection: 'BOOK_REVIEW_NEW'
    }
);

// Export the Genre model for API calls
module.exports = mongoose.model('BookReview', bookReviewSchema);