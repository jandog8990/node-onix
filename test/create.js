var should = require('should');
var onix = require('../');

describe('Creating', function () {
    it('should correctly create ONIX 3', function() {
        var xml = onix.create({
          header: {
            sender: {
                senderName: "Christian Roy",
                emailAddress: "roychristian@gmail.com"
            },
            sentDateTime: new Date(2017, 2, 23)
          },
          products: [{
            record: "record",
            notification: 4,
            description: {
              title: {
                type: 9,
                element: {
                  level: 2,
                  text: 'Le Title'
                }
              },
              language: {
                role: 1,
                code: 'fre'
              }
            }
          }]
        }, '3.0');

        console.log(xml);
    });
});
