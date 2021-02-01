const { KEYWORDS } = require("../lib/codes/subject");
const dbLookup = require('./mongoLookup');

// import the tables and field objects
const { BOOK_TABLE, AUTHOR_TABLES, NARRATOR_TABLES, PUBLISHER_TABLE, GENRE_TABLES, BOOK_PHOTO_TABLES, AUDIO_TABLES, BOOK_EXTRA_TABLES, BOOK_REVIEW_TABLES} = dbLookup.tables;
const { NOTIFICATION, PUBLISHING_STATUS, CITY_OF_PUBLICATION, PUBLICATION_DATE, SUMMARY, SHORT_SUMMARY, LONG_SUMMARY, BIOGRAPHICAL_NOTE } = dbLookup.bookFields;
const { PUBLISHER_NAME, SEARCH_ID } = dbLookup.publisherFields;
const { FIRSTNAME, LASTNAME, MI, BIOGRAPHY, GHOST, TRANSLATOR } = dbLookup.contributorFields;
const { BISAC_SUBJECTS, BIC_SUBJECTS, BIC_READING_LEVEL, KEYWORDS_KEY } = dbLookup.genreFields;
const { LINK_TYPE, AUDIO_LOC, DEMO_LOC, PHOTO_LOC, THUMBNAIL_LOC, HQ_LOC } = dbLookup.mediaFields;
const { REVIEW_QUOTE, REVIEW_PREVIOUS_EDITION, REVIEW_TEXT, PROMOTIONAL_HEADLINE, PREVIOUS_REVIEW_QUOTE, AUTHOR_COMMENTS} = dbLookup.bookReviewFields;
const { GROUP_DISCUSSION, GROUP_DISCUSSION_QUESTION, EXCERPT, COMMENTARY, FIRST_CHAPTER, AUTHOR_INTERVIEW } = dbLookup.bookExtraFields;

module.exports = {
    // Key lookup for ONIX Elements to Types, Values, Etc in the XSD Schema 
    onixKeyLookup: {
        // This ill be a map from Keys to Functions for each object type 
        notification: {
            1: (book, author, narrator) => { book[NOTIFICATION] = "early"; }, // early 
            3: (book, author, narrator) => { book[NOTIFICATION] = "advanced-confirmation"; }, // book ready
            4: (book, author, narrator) => { book[NOTIFICATION] = "confirmed"; }, // book ready
            5: (book, author, narrator) => { book[NOTIFICATION] = "update" },
            88: (book, author, narrator) => { book[NOTIFICATION] = "test-update" },  // test processing (disregard data)
            89: (book, author, narrator) => { ok[NOTIFICATION] = "test-record" }// test record (disregard data)
        },   // List 1 (notification types) 
        publishingStatus: (status, book, author, narrator) => {

            if (status == 4) {//"active", 
                book[PUBLISHING_STATUS] = true;
            } else {    // all else not available
                book[PUBLISHING_STATUS] = false;
            }

            /* 
            0: //"unspecified",
            1: //"cancelled", 
            2: //"forthcoming",   
            3: //"postponed", // indefinite
            4: /"active" 
            5: //"dne",   
            6: //"out-of-stock",
            7: //"out-of-print",
            8: //"inactive",
            9: //"unknown",
            10: "not-available",
            11: "not-available",
            12: "not-available",
            13: "not-available",
            14: "not-available",
            15: "not-available",
            16: "not-available",
            17: "not-available",    // 10-17 withdrawn and not available
            */
        }, // List 64 (publishing status) 
        id: {   // type/value keys
            type: {
                1: () => { return []; }, //"proprietary",
                2: () => { return []; }, //"isbn-10",
                3: () => { return []; }, //"gtin-13",
                15: () => { return [BOOK_TABLE, "ISBN13"]; } // "isbn-13"
            },
            value: (table, field, val) => {
                table[field] = val; // store the ISBN13 as a string
            }
        }, // List 5 (product ids)
        cityOfPublication: (city, book, author, narrator) => {
            book[CITY_OF_PUBLICATION] = city;
        },  // function should assign string
        publicationDate: (date, book, author, narrator) => {
            var isDate = date instanceof Date;
            console.log("object isDate = " + isDate);
            book[PUBLICATION_DATE] = date;
        },    // func assigns UTC date (check db date elements)
        title: {    // type/text/subtitle keys 
            type: {
                0: () => { return []; }, //"undefined",
                1: () => { return [BOOK_TABLE, "TITLE"]; }, //"full-title",    
                2: () => { return []; }, //"issn-title",
                4: () => { return [BOOK_TABLE, "TITLE_ACRONYM"]; },
                5: () => { return [BOOK_TABLE, "TITLE_ABBREVIATED"]; }
            },
            text: (table, field, val) => {
                var title = String(val);
                table[field] = title;
            }
        },  // List 15 (title type) 
        contributors: { // check for arrays (keys: role/name/nameInverted) 
            role: { // there could be other roles like forard and intro
                "A01": () => {
                    return [AUTHOR_TABLES, "AUTHOR"];
                }, // "author",
                "A02": () => {
                    return [AUTHOR_TABLES, "GHOST"];
                },//"ghost-author",  // not handled yet (should still be an author: hidden??)
                "A09": () => {
                    return [];
                },  //"created-by",    // is this an author?
                "B06": () => {
                    return [AUTHOR_TABLES, "TRANSLATOR"];
                },  // "translated-by", // this should be another author field
                "E03": () => {
                    return [NARRATOR_TABLES, "NARRATOR"];
                },  // "narrator",
                "E07": () => {
                    return [NARRATOR_TABLES, "NARRATOR"];
                },  // "read-by",   // as in audiobook
            },
            nameInverted: (tableArr, field, val) => {
                var first = "";
                var last = "";
                var mi = "";

                var table = {};
                if (field == GHOST || field == TRANSLATOR) {
                    // set the author hidden field
                    table[field] = true;
                }

                // split the name and create first/lastname/mi
                var arr = val.split(",", 3).map(function (item) {
                    return item.trim();
                });
                console.log("name arr:");
                console.log(arr);

                if (arr.length == 3) {
                    last = arr[0];
                    mi = arr[1];
                    first = arr[2];
                } else {
                    last = arr[0];
                    first = arr[1];
                }
                table[FIRSTNAME] = first;
                table[MI] = mi;
                table[LASTNAME] = last;

                tableArr.push(table);
            },
            note: (tableArr, field, val) => {
                console.log("Note field:");
                console.log(val);
                console.log("\n");

                // get the last pushed element in the table array and update 
                var lastEditedTable = tableArr[tableArr.length - 1];
                lastEditedTable[BIOGRAPHY] = val;
            }
        },   // List 17 (contributor code ie author) 
        subjects: { // is array , keys: identifier/code/heading 
            identifier: {
                10: () => { return [GENRE_TABLES, BISAC_SUBJECTS]; }, //bisac-subject",    // bisac genre category "/" delimited https://ww.bisg.org/complete-bisac-subject-headings-2013-edition
                11: () => { return []; },   //"bisac-region",     // region of the book (categories based on published area??)
                12: () => { return [GENRE_TABLES, BIC_SUBJECTS]; },  //"bic-subject",      // bic genre categories https://bic.org.uk/files/pdfs/101201%20bic2.1%20complete%20rev.pdf
                13: () => { return []; }, //"bic-geography",    // again geo tagging
                14: () => { return []; },//"bic-language",     // language qualifier
                15: () => { return []; },//"bic-time-period",  // time period for BIC std
                16: () => { return []; },//"bic-education",    // educational purpose
                17: () => { return []; },//"bic-reading-level",
                20: () => { return [GENRE_TABLES, KEYWORDS_KEY]; },//"keyords", // multiple keywords and phrases (not usually shown)
            },
            heading: (tableArr, field, val) => {
                // check if e are parsing subjects or keywords
                var table = {}; //empty genre table 
                var arr;
                if (field == BISAC_SUBJECTS || field == BIC_SUBJECTS) {
                    // parse on a forard slash
                    arr = val.split("/").map(function (item) {
                        return item.trim();
                    });
                } else if (field == KEYWORDS_KEY) {
                    // parse on ;
                    arr = val.split(";").map(function (item) {
                        return item.trim();
                    });
                }
                table[field] = arr;
                tableArr.push(table);
            }
        },   // List 26 (main subject id ie genres)
        audiences: {    // is array, type/value keys
            type: {
                1: () => { return []; }, //"General/trade",
                2: () => { return []; }, //"Children/juvenile",
                3: () => { return []; }, // "Young adult",
                4: () => { return []; }, // "Primary/secondary",
                5: () => { return []; }, //"College/higher education",
                6: () => { return []; }, //"Professional/scholarly",
                7: () => { return []; }, //"ELT/ESL",   // english as a second language
                8: () => { return []; }, //"Adult education",
                9: () => { return []; }, //"Second language teaching"
            }
        },  // List28 (intended audience) 
        medias: {   // is array, keys: type/linkType/link 
            type: {
                1: () => { return []; }, //"Whole product",
                4: () => { return [BOOK_PHOTO_TABLES, PHOTO_LOC]; }, //"Image: front cover",    // digital cover (std quality)
                6: () => { return [BOOK_PHOTO_TABLES, HQ_LOC]; }, // "Image: front cover HQ", // high quality 
                7: () => { return [BOOK_PHOTO_TABLES, THUMBNAIL_LOC]; }, //"Image: front cover thumb",  // thumb can be used for app
                8: () => { return []; }, //"Image: contributor(s)", // place this in wp_BOOK_PHOTOS.CONTRIBUTOR
                30: () => { return [AUDIO_TABLES, AUDIO_LOC]; }, //"Audio segment: unspecified",
                41: () => { return []; }, //"Audio: author presentation/commentary",
                42: () => { return []; }, //"Audio: author interview",
                43: () => { return []; }, //"Audio: author reading",
                44: () => { return [AUDIO_TABLES, DEMO_LOC]; }, //"Audio: sample content",
                45: () => { return []; }, //"Audio: promotional material",
                46: () => { return []; }, //"Audio: review",
                47: () => { return []; }, //"Audio: other commentary/discussion"
            },
            linkType: (tableArr, field, val) => {
                //"url",

                var table = {};

                var linkType = "";
                if (val == 1) {
                    linkType = "url";
                }
                table[LINK_TYPE] = linkType;
                tableArr.push(table);
                /* 
                2: "doi",
                3: "purl",
                4: "urn",
                5: "ftp-address",
                6: "filename"
                */
            },
            link: (tableArr, field, val) => {
                console.log("Link field:");
                console.log(val);
                console.log("\n");

                // get the last pushed element in the table array and update 
                var lastEditedTable = tableArr[tableArr.length - 1];
                lastEditedTable[field] = val;
            } 

        }, // List 38-40 (image/audio/video file type, format, link type)
        // supply: {}, // List58 (keys: prices is the main key)
        texts: {    // is array, keys: type/content (NOTE: all text is given in HTML parse??)
            type: {
                1: () => { return [BOOK_TABLE, SUMMARY]; }, //"Main description",  // Main summary
                2: () => { return [BOOK_TABLE, SHORT_SUMMARY]; },//"Short description",
                3: () => { return [BOOK_TABLE, LONG_SUMMARY]; },//"Long description",
                5: () => { return [BOOK_REVIEW_TABLES, REVIEW_QUOTE]; },//"Review quote",
                6: () => { return [BOOK_REVIEW_TABLES, REVIEW_PREVIOUS_EDITION]; },//"Review previous edition",
                7: () => { return [BOOK_REVIEW_TABLES, REVIEW_TEXT]; },//"Review text",   // full text of a review
                8: () => { return [BOOK_REVIEW_TABLES, REVIEW_QUOTE]; },//"Review quote",
                9: () => { return [BOOK_REVIEW_TABLES, PROMOTIONAL_HEADLINE]; },//"Promotional headline",
                10: () => { return [BOOK_REVIEW_TABLES, PREVIOUS_REVIEW_QUOTE]; },//"Previous review quote",
                11: () => { return [BOOK_EXTRA_TABLES, AUTHOR_COMMENTS]; },//"Author comments",
                13: () => { return [BOOK_TABLE, BIOGRAPHICAL_NOTE]; },//"Biographical note",    // author bio
                14: () => { return [BOOK_EXTRA_TABLES, GROUP_DISCUSSION]; },//"Reading Group discussion",
                15: () => { return [BOOK_EXTRA_TABLES, GROUP_DISCUSSION_QUESTION]; },//"Reading Group discussion question",
                23: () => { return [BOOK_EXTRA_TABLES, EXCERPT]; },//"Excerpt from book",
                42: () => { return [BOOK_EXTRA_TABLES, COMMENTARY]; },//"Commentary / discussion",
                24: () => { return [BOOK_EXTRA_TABLES, FIRST_CHAPTER]; },//"First chapter",
                40: () => { return [BOOK_EXTRA_TABLES, AUTHOR_INTERVIEW]; },//"Author interview",
                /* 
                16: "Competing titles", // could be important for recommendations
                43: "Short description for series",
                44: "Long description for series",
                4: "Table of contents",
                28: "Description for teachers/educators",
                */
            },
            content: (tableArr, field, val) => {
                // Check if the table array is a single entry or an array
                if (Array.isArray(tableArr)) {
                    // we have a REVIEWS or EXTRA table
                    var table = {};
                    table[field] = val; 
                    tableArr.push(table);
                } else {
                    // we have asingle table (ie BOOK_TABLE)
                    tableArr[field] = val;
                }
            }
        },  // List 33 (Text type code ie main summary)
        // imprint: {},   // keys: "name" keyPublisher name??
        publisher: (publisherName, publisher) => {
            var searchId = publisherName.replace(/\s+/g, '-');
            publisher[PUBLISHER_NAME] = publisherName;
            publisher[SEARCH_ID] = searchId;
        },  // keys: "role/name" Publisher name and role (seems more legit)
        salesRights: {  // is array, keys: type
            type: {
                0: () => { return []; },//"unknown",
                1: () => { return []; },//"exclusive rights in specified countries or territories",
                2: () => { return []; },//"non-exclusive rights in specified countries or territories",
                3: () => { return []; }//"not for sale in specified countries or territories",
            }
        } // List 46 (sales rights type code)
    }
}