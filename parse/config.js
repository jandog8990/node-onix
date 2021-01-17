/*
	Configuration file for mLab mongoDB Google Cloud App Engine 
*/

// Hierarchical node.js configuration with command-line args, env vars and files
var nconf = module.exports = require('nconf');

// Read in keys and secrets for the mongoDB in mLab
nconf.argv().env().file('config.json');

// Connect to a MongoDB server provisioned over at MongoLab
const user = nconf.get('MONGO_USER');
const pass = nconf.get('MONGO_PW');
const host = nconf.get('MONGO_HOST');
const port = nconf.get('MONGO_PORT');
const dbname = nconf.get('MONGO_DB_NAME');
const params = nconf.get('MONGO_PARAMS');

// Old Mlab connection URI
// var uri = `mongodb://${user}:${pass}@${host}:${port}`;
var uri = `mongodb+srv://${user}:${pass}@${host}`  

// Create the mongoDB URI from the new Atlas Cluster
uri = `${uri}/${dbname}${params}`;

// Set the mongoDB URI 
nconf.set('MONGO_URI', uri);

// Check for required project config.json settings
checkConfig('GCLOUD_PROJECT');

// Check if the configuration variable exists
function checkConfig(setting) {
	if (!nconf.get(setting)) {
		throw new Error(`You must set ${setting} as an environment variable or in config.json!`);
	}
}
