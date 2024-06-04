CREATE DATABASE IF NOT EXISTS API_node;
USE API_node;

CREATE TABLE document_type(
    documentTypeID INT(11) AUTO_INCREMENT PRIMARY KEY, 
    documentTypeNAME VARCHAR(20) NOT NULL UNIQUE
)

CREATE TABLE person (
    personID INT(11) AUTO_INCREMENT PRIMARY KEY,
    personName VARCHAR(20) NOT NULL,
    personLast_name VARCHAR(20) NOT NULL,
    personNumber VARCHAR(10) NOT NULL,
    documentTypeFk INT(11) NOT NULL,
    FOREIGN KEY (documentTypeFk) REFERENCES document_type(documentTypeID)
)