module.exports = {
    // Key lookup for ONIX Elements to Types, Values, Etc in the XSD Schema 
    onixKeyLookup: {
        // This will be a map from Keys to Functions for each object type 
        notification: {},   // List 1 (notification types) 
        publishingStatus: {}, // List 64 (publishing status) 
        id: {}, // List 5 (product ids)
        cityOfPublication: {},
        publicationDate: {},
        title: {},  // List 15 (title type) 
        contributors: {},   // List 17 (contributor code ie author) 
        subjects: {},   // List 26 (main subject id ie genres)
        medias: {}, // List 38-40 (media file type, format, link type)
        supply: {}, // List58 (prices and type codes)
        texts: {},  // List 33 (Text type code ie main summary)
        imprint: {},   // Publisher name??
        publisher: {},  // Publisher name and role (seems more legit)
        salesRights: {} // List 46 (sales rights type code)
    } 
}