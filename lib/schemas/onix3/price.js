var _ = require('lodash');
var utils = require('../../utils');

var OnixDate = require('./onixdate');

module.exports = {
    tag: 'Price',
    array: true,
    fields: {
        type: {
            tag: 'PriceType', // P.26.43
            transform: _.partialRight(utils.pad, 2),
            untransform: Number,
            default: 1
        },
        qualifier: {
            tag: 'PriceQualifier',  // P.26.44
            transform: _.partialRight(utils.pad, 2),
            untransform: Number,
            default: 5
        },
        amount: {
            tag: 'PriceAmount',  // P.26.62
            transform: Number,
            untransform: function(s) { return Number(s.replace(',','.')); }
              // This is a hack to support the non-conformant data I have to handle where the decimal separator is comma instead of dot
        },
        currency: {
            tag: 'CurrencyCode',  // P.26.71
            transform: function(s) { return s.toUpperCase(); },
            default: 'USD'
        },
        territory: {
          tag: 'Territory',
          fields: {
            countries: {
              tag: 'CountriesIncluded' // P.26.72
            }
          }
        },
        dates: {
            tag: 'PriceDate',
            fields: {
                role: {
                  tag: 'PriceDateRole', // P.26.83
                  default: 14,
                  transform: _.partialRight(utils.pad, 2),
                  untransform: Number,
                },
                date: OnixDate
            },
            array: true
        }
    },
    map: {
        to: 'amount'
    }
};
