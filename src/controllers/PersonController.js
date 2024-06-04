import {connPool} from '../../db/connect.js';

export const showPerson = async (req, res) => {
    const result = await connPool.query("SELECT * FROM person");
    res.json(result[0]);
}

export const showPersonId = async (req, res) => {
    const result = await connPool.query("SELECT * FROM person");
    res.json(result[0]);
};

export const createPerson = async (req, res) => {
    const {name, lastName, document, documentType} = req.body;
    const sqlQuery = "INSERT INTO person (personName, personLast_name, personNumber, documentTypeFk) VALUES (?, ?, ?, ?)";
    const [result] = await connPool.query(sqlQuery, [name, lastName, document, documentType]);
    res.send({
        id: result.insertId,
        name: name,
        lastName: lastName,
        document: document, 
        documentType: documentType
    });
};

export const deletePerson = async (req, res) => {
    const { id } = req.params;
    const sqlQuery = "DELETE FROM person WHERE personId = ?";
    const [result] = await connPool.query(sqlQuery, [id]);
    res.send({
        id
    })
};

export const updatePerson = async (req, res) => {
    const { id } = req.params;
    const { name, lastName, document, documentType } = req.body;
    const sqlQuery = `
        UPDATE person SET personName = ?, personLast_name = ?, personNumber = ?, documentTypeFk = ? 
        WHERE personId = ?
    `;
    const [result] = await connPool.query(sqlQuery, [name, lastName, document, documentType, id]);
    res.send({
        id,
        name,
        lastName,
        document, 
        documentType
    })
};

