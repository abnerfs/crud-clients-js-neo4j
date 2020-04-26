const neo4j = require('neo4j-driver')
const { DB_USER, DB_PASS, DB_URI, DB_NAME } = process.env;

if(!DB_USER || !DB_PASS || !DB_URI)
    throw new Error("DB Error, auth information not found");


const driver = neo4j.driver(DB_URI, neo4j.auth.basic(DB_USER, DB_PASS));

const getSession = () => 
    driver.session({
        database: DB_NAME
    });


module.exports = {
    getSession
}