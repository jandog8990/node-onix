var _ = require('lodash');
var utils = require('../../utils');

var Publisher = require('./publisher');
var ProductID = require('./productid');

module.exports = {
    tag: 'RelatedMaterial', // Block 5
    fields: {
        'relatedProducts': {  // Group P.23
            tag: 'RelatedProduct',
            fields: {
              'productRelationCodes': {  // Group P.23.1
                tag: 'ProductRelationCode',
                array: true,
                transform: _.partialRight(utils.pad, 2),
                untransform: Number
              },
              'productIdentifiers': ProductID,
              'productForm': {  // Group P.23.5
                tag: 'ProductForm',
                transform: String
              }
            },
            array: true
        }
    }
};
