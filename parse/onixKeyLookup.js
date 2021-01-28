const { KEYWORDS } = require("../lib/codes/subject");

// Table keys for each mongo table (makes it easier)
const BOOK_TABLE = "BOOK_TABLE";
const AUTHOR_TABLES = "AUTHOR_TABLES";
const NARRATOR_TABLES = "NARRATOR_TABLES"; 
const PUBLISHER_TABLE = "PUBLISHER_TABLE"; 
const GENRE_TABLES = "GENRE_TABLES";

// Field keys for each table

// BOOK fields
const NOTIFICATION = "NOTIFICATION";
const PUBLISHING_STATUS = "PUBLISHING_STATUS";
const CITY_OF_PUBLICATION = "CITY_OF_PUBLICATION";
const PUBLICATION_DATE = "PUBLICATION_DATE";

// PUBLISHER fields
const PUBLISHER_NAME = "PUBLISHER_NAME";
const SEARCH_ID = "SEARCH_ID";

// AUTHOR/NARRATOR fields
const FIRSTNAME = "FIRSTNAME";
const LASTNAME = "LASTNAME";
const MI = "MI";
const BIOGRAPHY = "BIOGRAPHY";

// GENRE fields
const BISAC_SUBJECTS = "BISAC_SUBJECTS";
const BIC_SUBJECTS = "BIC_SUBJECTS";
const BIC_READING_LEVEL = "BIC_READING_LEVEL";
const KEYWORDS_KEY = "KEYWORDS";

module.exports = {
    // Key lookup for ONIX Elements to Types, Values, Etc in the XSD Schema 
    onixKeyLookup: {
        // This will be a map from Keys to Functions for each object type 
        notification: {
            1: (book, author, narrator) => { book[NOTIFICATION] = "early"; }, // early 
            3: (book, author, narrator) => { book[NOTIFICATION] = "advanced-confirmation"; }, // book ready
            4: (book, author, narrator) => { book[NOTIFICATION] = "confirmed"; }, // book ready
            5: (book, author, narrator) => { book[NOTIFICATION] = "update" },
            88: (book, author, narrator) => { book[NOTIFICATION] = "test-update" },  // test processing (disregard data)
            89: (book, author, narrator) => { book[NOTIFICATION] = "test-record" }// test record (disregard data)
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
                15: () => { return [BOOK_TABLE, "ISBN13"];} // "isbn-13"
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
            role: { // there could be other roles like forward and intro
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
                if (field == "GHOST" || field == "TRANSLATOR") {
                    // set the author hidden field
                    table[field] = true;
                }
           
                // split the name and create first/lastname/mi
               var arr = val.split(",", 3).map(function(item) {
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
                10: () => { return [GENRE_TABLES, BISAC_SUBJECTS];}, //bisac-subject",    // bisac genre category "/" delimited https://www.bisg.org/complete-bisac-subject-headings-2013-edition
                11: () => { return []; },   //"bisac-region",     // region of the book (categories based on published area??)
                12: () => { return [GENRE_TABLES, BIC_SUBJECTS]; },  //"bic-subject",      // bic genre categories https://bic.org.uk/files/pdfs/101201%20bic2.1%20complete%20rev.pdf
                13: () => { return []; }, //"bic-geography",    // again geo tagging
                14: () => { return []; },//"bic-language",     // language qualifier
                15: () => { return []; },//"bic-time-period",  // time period for BIC std
                16: () => { return []; },//"bic-education",    // educational purpose
                17: () => { return []; },//"bic-reading-level",
                20: () => { return [GENRE_TABLES, KEYWORDS_KEY]; },//"keywords", // multiple keywords and phrases (not usually shown)
            },
            heading: (tableArr, field, val) => {
                // check if we are parsing subjects or keywords
                var table = {}; //empty genre table 
                var arr; 
                if (field == BISAC_SUBJECTS || field == BIC_SUBJECTS) {
                    // parse on a forward slash
                    arr = val.split("/").map(function(item) {
                        return item.trim();
                    }); 
                } else if(field == KEYWORDS_KEY) {
                    // parse on ;
                    arr = val.split(";").map(function(item) {
                        return item.trim();
                    }); 
                }
                table[field] = arr;
                tableArr.push(table);
            }
        },   // List 26 (main subject id ie genres)
        /* 
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
        */ 
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
        // supply: {}, // List58 (keys: prices is the main key)
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
        // imprint: {},   // keys: "name" keyPublisher name??
        publisher: (publisherName, publisher) => {
            var searchId = publisherName.replace(/\s+/g, '-');
            publisher[PUBLISHER_NAME] = publisherName;
            publisher[SEARCH_ID] = searchId;
        },  // keys: "role/name" Publisher name and role (seems more legit)
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