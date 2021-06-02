// Model for the wp_GENRES table
const mongoose = require('mongoose');
const _ = require('underscore');
const Schema = mongoose.Schema;

const genreSchema = new Schema(
    {
        NAME: String,
        SEARCH_ID: String,
        PHOTO_LOC: String,
    },
    {
        // set collection to wp_GENRES
        collection: 'GENRES_NEW'
    }
);

// TODO: Pre-save method for checking uniqueness of BISAC/BIC arrays
/*
genreSchema.pre('save', function(next) {
    console.log("GENRE SCHEMA SAVE!"); 
    let sample = this;
    console.log("BISAC_SUBJECTS:"); 
    sample.BISAC_SUBJECTS = _.uniq(sample.BISAC_SUBJECTS, function(i) {
        console.log("I id = " + i);
        return (i._id) ? i._id.toString() : i;
    });
    console.log("\n")
    sample.BIC_SUBJECTS = _.uniq(sample.BIC_SUBJECTS, function(i) {
        return (i._id) ? i._id.toString() : i; 
    });

    console.log("BISAC_SUBJECTS = " + sample.BISAC_SUBJECTS);
    return next();
});
*/

/*
genreSchema.index({BISAC_SUBJECTS: 1}, {unique: true}); 
genreSchema.index({BIC_SUBJECTS: 1}, {unique: true}); 
*/

// Export the Genre model for API calls
module.exports = mongoose.model('Genre', genreSchema);