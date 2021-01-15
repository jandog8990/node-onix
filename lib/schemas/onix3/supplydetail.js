var _ = require('lodash');
var utils = require('../../utils');

var Price = require('./price');
var OnixDate = require('./onixdate');

module.exports = {
    tag: 'SupplyDetail', // Group P.26
    fields: {
        supplier : {
            name: {
                tag: 'SupplierName' // P.26.5
            }
        },
        availability: {
            tag: 'ProductAvailability', // P.26.17
            default: 20,
            transform: String,
            untransform: Number
        },
        dates: {
            tag: 'SupplyDate',
            fields: {
                role: {
                  tag: 'SupplyDateRole', // P.26.18
                  transform: _.partialRight(utils.pad, 2),
                  untransform: Number
                },
                date: OnixDate // P.26.20
            },
            array: true
        },
        prices: Price // P.26.42
    },
    array: true
};
