var _ = require('lodash');
var utils = require('../../utils');

var Sender = require('./sender')

module.exports = {
    tag: 'Header',
    fields: {
        'sender': Sender,
        'sentDateTime': {
            tag: 'SentDateTime',
            transform: utils.formatDate,
            untransform: utils.unformatDate
        }
    }
};
