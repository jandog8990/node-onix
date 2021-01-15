var _ = require('lodash');
var utils = require('../../utils');


module.exports = {
    tag: 'Market',
    fields: {
        'territory': {
          tag: 'Territory',
          fields: {
            'countries': {
              tag: 'CountriesIncluded' // P.24.1
            }
          }
        },
        'salesRestrictions': {
          tag: 'SalesRestriction',
          fields: {
            'type': {
              tag: 'SalesRestrictionType',
              transform: _.partialRight(utils.pad, 2),
              untransform: Number
            }
          },
          array: true
        }
    },
    array: true
};
