// Model will use the BOOK_EXTRA table for more book metadata
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Join query for BOOKS and AUDIO tables

const bookExtraSchema = new Schema(
    {
        ISBN13: String, 
        GROUP_DISCUSSION: String,
        GROUP_DISCUSSION_QUESTION: String,
        EXCERPT: String,
        COMMENTARY: String,
        FIRST_CHAPTER: String,
        AUTHOR_INTERVIEW: String
    },
    {
        collection: 'EXTRA_NEW'
    }
);

// export the Book extra model for the API
module.exports = mongoose.model('BookExtra', bookExtraSchema); 