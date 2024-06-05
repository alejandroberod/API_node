import {connPool} from '../../db/connect.js';

export const showPerson = async (req, res) => {
    try {
        const result = await connPool.query("SELECT * FROM person");
        console.log(result[0].length);
        if(result[0].length === 0) {
            res.send({message: "There are no people in the DB"})
        } else {
            res.json(result[0]);
        }
    } catch (error) {
        res.status(500).send({message: "An error ocurred"});
    }
}

export const showPersonId = async (req, res) => {
    const { id } = req.params;
    try {
        const sqlQuery = "SELECT * FROM person WHERE personID = ?";
        const result = await connPool.query(sqlQuery, [id]);
        if(result[0].length === 0) {
            res.status(404).send({message: "Person not found"});
        } else {
            res.json(result[0]);
        }
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
    }
};

export const createPerson = async (req, res) => {
    const {name, lastName, document, documentType} = req.body;
    try {
        const sqlQuery = "INSERT INTO person (personName, personLast_name, personNumber, documentTypeFk) VALUES (?, ?, ?, ?)";
        const [result] = await connPool.query(sqlQuery, [name, lastName, document, documentType]);
        res.send({
            id: result.insertId,
            name: name,
            lastName: lastName,
            document: document, 
            documentType: documentType
        });
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error })
    }
};

export const deletePerson = async (req, res) => {
    const { id } = req.params;
    try {
        const sqlQuery = "DELETE FROM person WHERE personId = ?";
        const [result] = await connPool.query(sqlQuery, [id]);
        console.log(result)
        if(result.affectedRows === 0) {
            res.status(404).send({message: "Person not found"});
        } else {
            res.send({message: "Person deleted succesfully"})
        }
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
    }
};

export const updatePerson = async (req, res) => {
    const { id } = req.params;
    const { name, lastName, document, documentType } = req.body;
    try {
        const sqlQuery = `
            UPDATE person SET personName = ?, personLast_name = ?, personNumber = ?, documentTypeFk = ? 
            WHERE personId = ?
        `;
        const [result] = await connPool.query(sqlQuery, [name, lastName, document, documentType, id]);
        if(result.affectedRows === 0) {
            res.status(404).send({message: "Person not found"});
        } else {
            res.send({message: "Person updated succesfully"});
        }
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
    }
};

