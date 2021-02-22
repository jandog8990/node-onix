var _ = require("lodash");
var XMLSchema = require("xml-schema");
var subjects = require("subjects-utils");

var utils = require('./utils');
var codes = require('./codes');
var schemas = require('./schemas');


function create(definition, onixVersion) {
    var onixSchema = getSchema(onixVersion);
    return onixSchema.generate(definition, {
        version: '1.0',
        encoding: 'UTF-8',
        standalone: false,
        pretty: true
    }, {
        sysID: onixSchema.sysID
    });
}

function parse(xml, onixVersion) {

    var onixSchema = getSchema(onixVersion);

    // var parsedXML = onixSchema.parse(xml); 
    // console.log("Parse XML (NO REPLACE):");
    // console.log(parsedXML);
    // console.log("\n");

    console.log("Onix Parse:");
    console.log("version = " + onixVersion);
    return onixSchema.parse(xml.replace(/\<(\?xml|(\!DOCTYPE[^\>\[]+(\[[^\]]+)?))+[^>]+\>/g, ''));
}

function getSchema(onixVersion) {
    console.log("Get Schema Onix Version = " + onixVersion); 
    if (typeof onixVersion != 'undefined' && onixVersion == '3.0') {
        return new XMLSchema(schemas.Onix3);
    } else {
        return new XMLSchema(schemas.Onix21);
    };
};

module.exports = {
    parse: parse,
    create: create,
    codes: codes
};
