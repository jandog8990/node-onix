var utils = require('../lib/utils');
var should = require('should');

describe('Utils', function () {
    it('should correctly format a date', function() {
        var d = new Date(2015, 05, 1);
        utils.formatDate(d).should.be.equal('20150601');
    });

    it('should correctly unformat a date', function() {
        var d = utils.unformatDate('20170315').toString();
        d.valueOf().should.be.equal(new Date(2017, 2, 15).toString());
    });

    it('should correctly unformat a date with time', function() {
        var d = utils.unformatDate('20170228T162554Z').toString();
        d.valueOf().should.be.equal(new Date(2017, 1, 28, 16, 25, 54).toString());
    });

    it('should correctly pad integer', function() {
        utils.pad(5, 2).should.be.equal('05');
        utils.pad(52, 4).should.be.equal('0052');
    });
});
