// Model NARRATOR table
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const narratorSchema = new Schema(
    {
        LASTNAME: String,
        FIRSTNAME: String,
        MI: String, 
        BIOGRAPHY: String,
    },
    {
        collection: 'NARRATOR'
    }
);

// Virtual for narrator's URL (routes for site)
narratorSchema.virtual('url').get(function() {
    return '/narrator/' + this._id;
});

// export Narrator model to the API
module.exports = mongoose.model('Narrator', narratorSchema);