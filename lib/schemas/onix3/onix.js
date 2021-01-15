var Product = require('./product');
var Header = require('./header');

module.exports = {
    tag: 'ONIXMessage',

    fields: {
        'header': Header,
        'products': Product
    },
    attributes: {
      xmlns: {
        tag: 'xmlns',
        default: 'http://ns.editeur.org/onix/3.0/reference'
      },
      release: {
        tag: 'release',
        default: '3.0'
      }
    }
}
