import {connPool} from "../db/connect.js";

async function executeQuery(pool, query) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [results, ] = await connection.execute(query);
        console.log(results); 
    } catch (error) {
        console.error(`Error executing query: ${error}`)
    } finally {
        // await sleep(2000);
        if (connection) {
            connection.release()
        }
    }
}

const queries = [
    ' CREATE TABLE document_type(documentTypeID INT(11) AUTO_INCREMENT PRIMARY KEY, documentTypeNAME VARCHAR(20) NOT NULL UNIQUE);',
    'CREATE TABLE person (personID INT(11) AUTO_INCREMENT PRIMARY KEY,  personName VARCHAR(20) NOT NULL, personLast_name VARCHAR(20) NOT NULL, personNumber VARCHAR(10) NOT NULL, documentTypeFk INT(11) NOT NULL, FOREIGN KEY (documentTypeFk) REFERENCES document_type(documentTypeID))'
]

queries.forEach(query => {
    executeQuery(connPool, query);
})