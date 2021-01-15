var _ = require('lodash');
var utils = require('../../utils');

var Price = require('./price');
var SupplyDetail = require('./supplydetail')
var Market = require('./market');
var MarketPublishingDetail = require('./marketpublishingdetail');

module.exports = {
    tag: 'ProductSupply',
    fields: {
        'market': Market, // Group P.24
        'marketPublishingDetail': MarketPublishingDetail, // Group P.25
        'details': SupplyDetail // Group P.26
    },
    array: true,
    map: {
      to: 'title'
    }
};
