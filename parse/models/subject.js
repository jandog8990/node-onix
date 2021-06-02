
// Model for the wp_GENRES table
const mongoose = require('mongoose');
const _ = require('underscore');
const Schema = mongoose.Schema;

const subjectSchema = new Schema(
    {
        BISAC_SUBJECTS: [{type: String, unique: true, index: true}],  // BISAC standard 
        BIC_SUBJECTS: [{type: String, unique: true, index: true}],    // BIC standard
        BIC_EDUCATION: String,
        BIC_READING_LEVEL: String,
        KEYWORDS: {type: Array, default: []}    // KEYWORDS
    },
    {
        // set collection to wp_GENRES
        collection: 'SUBJECT_NEW'
    }
);

// TODO: Pre-save method for checking uniqueness of BISAC/BIC arrays
/*
subjectsSchema.pre('save', function(next) {
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

subjectSchema.index({BISAC_SUBJECTS: 1}, {unique: true}); 
subjectSchema.index({BIC_SUBJECTS: 1}, {unique: true}); 

// Export the Subjects model for API calls
module.exports = mongoose.model('Subject', subjectSchema);