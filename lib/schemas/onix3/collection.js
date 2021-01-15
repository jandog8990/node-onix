var _ = require('lodash');
var utils = require('../../utils');

var Contributor = require('./contributor');

module.exports = {
  tag: 'Collection', // P.5
  array: true,
  fields: {
    'collectionType': {
      tag: 'CollectionType', // P.5.1
      transform: _.partialRight(utils.pad, 2),  // list 148
      untransform: Number
    },
    'sourceName': {
      tag: 'SourceName', // P.5.2
      array: true,
      transform: String
    },
    'collectionIdentifier': {
      tag: 'CollectionIdentifier',
      array: true,
      fields: {
        'collectionIDType': {
          tag: 'CollectionIDType', // P.5.3
          transform: _.partialRight(utils.pad, 2),  // list 13
          untransform: Number
        },
        'idTypeName': {
          tag: 'IDTypeName', // P.5.4
          transform: String
        },
        'idValue': {
          tag: 'IDValue' // P.5.5
        }
      }
    },
    'collectionSequence': {
      tag: 'CollectionSequence',
      array: true,
      fields: {
        'collectionSequence': {
          tag: 'CollectionSequence', // P.5.5a
          transform: _.partialRight(utils.pad, 2),  // list 197
          untransform: Number
        },
        'collectionSequenceTypeName': {
          tag: 'CollectionSequenceTypeName', // P.5.5b
          transform: String
        },
        'collectionSequenceNumber': {
          tag: 'CollectionSequenceNumber', // P.5.5c
          transform: String
        },
      }
    },
    'titleDetail': {
      tag: 'TitleDetail',
      array: true,
      fields: {
        'titleType': {
          tag: 'TitleType', // P.5.6
          transform: _.partialRight(utils.pad, 2),  // list 15
          untransform: Number
        },
        'titleElement': {
          tag: 'TitleElement',
          array: true,
          fields: {
            'sequenceNumber': {
              tag: 'SequenceNumber', // P.5.6a
              transform: Number
            },
            'titleElementLevel': {
              tag: 'TitleElementLevel', // P.5.7
              transform: _.partialRight(utils.pad, 2),  // list 149
              untransform: Number
            },
            'partNumber': {
              tag: 'PartNumber', // P.5.8
              transform: String
            },
            'yearOfAnnual': {
              tag: 'YearOfAnnual', // P.5.9
              transform: String
            },
            'titleText': {
              tag: 'TitleText', // P.5.10
              transform: String,
              cdata: true
            },
            'titlePrefix': {
              tag: 'TitlePrefix', // P.5.11
              transform: String
            },
            'titleWithoutPrefix': {
              tag: 'TitleWithoutPrefix', // P.5.12
              transform: String
            },
            'subtitle': {
              tag: 'Subtitle', // P.5.13
              transform: String
            },
          }
        },
        'titleStatement': {
          tag: 'TitleStatement', // P.5.13a
          transform: String
        }
      }
    },
    'contributor': Contributor
  }
}
