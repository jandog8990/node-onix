module.exports = {
    tables: {
        // Table keys for each mongo table (makes it easier)
        BOOK_TABLE: "BOOK_TABLE",
        AUTHOR_TABLES: "AUTHOR_TABLES",
        NARRATOR_TABLES: "NARRATOR_TABLES",
        PUBLISHER_TABLE: "PUBLISHER_TABLE",
        SUBJECT_TABLES: "SUBJECT_TABLES",
        BOOK_PHOTO_TABLES: "BOOK_PHOTO_TABLES",
        AUDIO_TABLES: "AUDIO_TABLES",
        BOOK_REVIEW_TABLES: "BOOK_REVIEW_TABLES",
        BOOK_EXTRA_TABLES: "BOOK_EXTRA_TABLES"
    },
    bookFields: {
        // BOOK fields
        NOTIFICATION: "NOTIFICATION",
        PUBLISHING_STATUS: "PUBLISHING_STATUS",
        CITY_OF_PUBLICATION: "CITY_OF_PUBLICATION",
        PUBLICATION_DATE: "PUBLICATION_DATE",
        SUMMARY: "SUMMARY",
        SHORT_SUMMARY: "SHORT_SUMMARY",
        LONG_SUMMARY: "LONG_SUMMARY",
        BIOGRAPHICAL_NOTE: "BIOGRAPHICAL_NOTE"
    },
    bookReviewFields: {
        REVIEW_QUOTE: "REVIEW_QUOTE",
        REVIEW_PREVIOUS_EDITION: "REVIEW_PREVIOUS_EDITION", 
        REVIEW_TEXT: "REVIEW_TEXT", 
        PROMOTIONAL_HEADLINE: "PROMOTIONAL_HEADLINE", 
        PREVIOUS_REVIEW_QUOTE: "PREVIOUS_REVIEW_QUOTE", 
        AUTHOR_COMMENTS: "AUTHOR_COMMENTS"
    },
    bookExtraFields: {
        GROUP_DISCUSSION: "GROUP_DISCUSSION",
        GROUP_DISCUSSION_QUESTION: "GROUP_DISCUSSION_QUESTION",
        EXCERPT: "EXCERPT",
        COMMENTARY: "COMMENTARY",
        FIRST_CHAPTER: "FIRST_CHAPTER",
        AUTHOR_INTERVIEW: "AUTHOR_INTERVIEW"
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
    subjectFields: {
        // SUBJECT fields
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