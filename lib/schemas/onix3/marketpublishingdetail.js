var _ = require('lodash');
var utils = require('../../utils');

var OnixDate = require('./onixdate');

module.exports = {
    tag: 'MarketPublishingDetail',
    fields: {
        'status': {
          tag: 'MarketPublishingStatus', // P.25.12
          transform: _.partialRight(utils.pad, 2),
          untransform: Number
        },
        'dates': {
          tag: 'MarketDate',
          fields: {
            'role': {
              tag: 'MarketDateRole',  // P.25.14
              transform: _.partialRight(utils.pad, 2),
              untransform: Number
            },
            'date': OnixDate
          },
          array: true,
          map: {
            to: 'date'
          }
        }
      },
    array: true
};
