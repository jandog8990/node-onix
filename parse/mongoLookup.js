module.exports = {
    tables: {
        // Table keys for each mongo table (makes it easier)
        BOOK_TABLE: "BOOK_TABLE",
        AUTHOR_TABLES: "AUTHOR_TABLES",
        NARRATOR_TABLES: "NARRATOR_TABLES",
        PUBLISHER_TABLE: "PUBLISHER_TABLE",
        GENRE_TABLES: "GENRE_TABLES",
        BOOK_PHOTO_TABLES: "BOOK_PHOTO_TABLES",
        AUDIO_TABLES: "AUDIO_TABLES",
    },
    bookFields: {
        // BOOK fields
        NOTIFICATION: "NOTIFICATION",
        PUBLISHING_STATUS: "PUBLISHING_STATUS",
        CITY_OF_PUBLICATION: "CITY_OF_PUBLICATION",
        PUBLICATION_DATE: "PUBLICATION_DATE",

    },
    publisherFields: {

        // PUBLISHER fields
        PUBLISHER_NAME: "PUBLISHER_NAME",
        SEARCH_ID: "SEARCH_ID",

    },
    contributorFields: {
        // AUTHOR/NARRATOR fields
        FIRSTNAME: "FIRSTNAME",
        LASTNAME: "LASTNAME",
        MI: "MI",
        BIOGRAPHY: "BIOGRAPHY",
        GHOST: "GHOST",
        TRANSLATOR: "TRANSLATOR"
    },
    genreFields: {
        // GENRE fields
        BISAC_SUBJECTS: "BISAC_SUBJECTS",
        BIC_SUBJECTS: "BIC_SUBJECTS",
        BIC_READING_LEVEL: "BIC_READING_LEVEL",
        KEYWORDS_KEY: "KEYWORDS",

    },
    mediaFields: {
        // MEDIA fields
        LINK_TYPE: "LINK_TYPE",
        AUDIO_LOC: "AUDIO_LOC",
        DEMO_LOC: "DEMO_LOC", 
        PHOTO_LOC: "PHOTO_LOC",
        THUMBNAIL_LOC: "THUMBNAIL_LOC",
        HQ_LOC: "HQ_LOC"
    }
}