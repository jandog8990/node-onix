module.exports = {
    // check Array.isArray() for imported objects
    
    // Key lookup for ONIX Elements to Types, Values, Etc in the XSD Schema 
    onixKeyLookup: {
        // This will be a map from Keys to Functions for each object type 
        notification: {
            1: "early", // show book 
            3: "advanced-confirmation", // book ready
            4: "confirmed", // book ready
            5: "update",
            88: "test-update",  // test processing (disregard data)
            89: "test-record"   // test record (disregard data)
        },   // List 1 (notification types) 
        publishingStatus: {
            0: "unspecified",
            1: "cancelled", // don't show book
            2: "forthcoming",   // not yet published (show expected date)
            3: "postponed", // indefinite
            4: "active",    // active published show book
            5: "dne",   // does not exist (no longer available)
            6: "out-of-stock",
            7: "out-of-print",
            8: "inactive",
            9: "unknown",
            10: "not-available",
            11: "not-available",
            12: "not-available",
            13: "not-available",
            14: "not-available",
            15: "not-available",
            16: "not-available",
            17: "not-available",    // 10-17 withdrawn and not available
        }, // List 64 (publishing status) 
        id: {   // type/value keys
            type: {
                1: "proprietary",
                2: "isbn-10",
                3: "gtin-13",
                15: "isbn-13"
            }
        }, // List 5 (product ids)
        cityOfPublication: {},  // function should assign string
        publicationDate: {},    // func assigns UTC date (check db date elements)
        title: {    // type/text/subtitle keys 
            type: {
                0: "undefined",
                1: "full-title",    // full title 
                2: "issn-title",
                4: "title-acronym",
                5: "abbreviated",
            }
        },  // List 15 (title type) 
        contributors: { // check for arrays (keys: role/name/nameInverted) 
            role: { // there could be other roles like forward and intro
                "A01": "author",
                "A02": "ghost-author",
                "A09": "created-by",
                "E03": "narrator",
                "E07": "read-by",   // as in audiobook
            } 
        },   // List 17 (contributor code ie author) 
        subjects: { // is array , keys: identifier/code/heading 
            identifier: {   
                10: "bisac-subject",    // bisac genre category "/" delimited https://www.bisg.org/complete-bisac-subject-headings-2013-edition
                11: "bisac-region",     // region of the book (categories based on published area??)
                12: "bic-subject",      // bic genre categories https://bic.org.uk/files/pdfs/101201%20bic2.1%20complete%20rev.pdf
                13: "bic-geography",    // again geo tagging
                14: "bic-language",     // language qualifier
                15: "bic-time-period",  // time period for BIC std
                16: "bic-education",    // educational purpose
                17: "bic-reading-level",
                20: "keywords", // multiple keywords and phrases (not usually shown)
            }
        },   // List 26 (main subject id ie genres)
        audiences: {    // is array, type/value keys
            type: {
                1: "General/trade",
                2: "Children/juvenile",
                3: "Young adult",
                4: "Primary/secondary",
                5: "College/higher education",
                6: "Professional/scholarly",
                7: "ELT/ESL",   // english as a second language
                8: "Adult education",
                9: "Second language teaching" 
            }
        },  // List28 (intended audience) 
        medias: {   // is array, keys: type/linkType/link 
            type: {
                1: "Whole product",
                4: "Image: front cover",    // digital cover (std quality)
                6: "Image: front cover HQ", // high quality 
                7: "Image: front cover thumb",  // thumb can be used for app
                8: "Image: contributor(s)", // place this in wp_BOOK_PHOTOS.CONTRIBUTOR
                30: "Audio segment: unspecified",
                41: "Audio: author presentation/commentary",
                42: "Audio: author interview",
                43: "Audio: author reading",
                44: "Audio: sample content",
                45: "Audio: promotional material",
                46: "Audio: review",
                47: "Audio: other commentary/discussion"
            }, 
            linkType: {
                1: "url",
                2: "doi",
                3: "purl",
                4: "urn",
                5: "ftp-address",
                6: "filename"
            }
            
        }, // List 38-40 (image/audio/video file type, format, link type)
        supply: {}, // List58 (keys: prices is the main key)
        texts: {    // is array, keys: type/content (NOTE: all text is given in HTML parse??)
            type: {
                1: "Main description",  // Main summary
                2: "Short description",
                3: "Long description",
                4: "Table of contents",
                5: "Review quote",
                6: "Review previous edition",
                7: "Review text",   // full text of a review
                8: "Review quote",
                9: "Promotional headline",
                10: "Previous review quote",
                11: "Author comments",
                13: "Biographical note",    // author bio
                14: "Reading Group description",
                15: "Reading Group discussion question",
                16: "Competing titles", // could be important for recommendations
                23: "Excerpt from book",
                24: "First chapter",
                28: "Description for teachers/educators",
                40: "Author interview",
                42: "Commentary / discussion",
                43: "Short description for series",
                44: "Long description for series",
            }
        },  // List 33 (Text type code ie main summary)
        imprint: {},   // keys: "name" keyPublisher name??
        publisher: {},  // keys: "role/name" Publisher name and role (seems more legit)
        salesRights: {  // is array, keys: type
            type: {
                0: "unknown",
                1: "exclusive rights in specified countries or territories",
                2: "non-exclusive rights in specified countries or territories",
                3: "not for sale in specified countries or territories",
            }
        } // List 46 (sales rights type code)
    } 
}