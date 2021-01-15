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
    console.log("Index Parse:");
    console.log("Onix version = " + onixVersion);
    console.log("\n");

    var onixSchema = getSchema(onixVersion);
    console.log("Onix Schema:");
    console.log(onixSchema);
    console.log("\n");

    // var parsedXML = onixSchema.parse(xml); 
    // console.log("Parse XML (NO REPLACE):");
    // console.log(parsedXML);
    // console.log("\n");

    // console.log("Parse XML (XML REPLACE):");
    return onixSchema.parse(xml.replace(/\<(\?xml|(\!DOCTYPE[^\>\[]+(\[[^\]]+)?))+[^>]+\>/g, ''));
}

function getSchema(onixVersion) {
    if (typeof onixVersion != 'undefined' && onixVersion == '3.0') {
        console.log("GET XMLSchema ONIX 3!"); 
        return new XMLSchema(schemas.Onix3);
    } else {
        console.log("GET XMLSchema ONIX 2.1!"); 
        return new XMLSchema(schemas.Onix21);
    };
};

module.exports = {
    parse: parse,
    create: create,
    codes: codes
};
