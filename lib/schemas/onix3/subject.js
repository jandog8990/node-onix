var _ = require('lodash');
var utils = require('../../utils');

module.exports = {
    tag: 'Subject',
    fields: {
        'main': {
            tag: 'MainSubject',
            bool: true
        },
        'scheme': { // we cannot transform to Number because some scheme identifiers are alphanumeric
            tag: 'SubjectSchemeIdentifier'
        },
        'code': {
            tag: 'SubjectCode'
        },
        'text': {
          tag: 'SubjectHeadingText'
        }
    },
    map: {
        to: 'code'
    },
    array: true
};
