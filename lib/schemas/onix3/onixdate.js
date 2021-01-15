var utils = require('../../utils');

module.exports = {
    tag: 'Date',
    transform: utils.formatDate,
    untransform: utils.unformatDate
}
