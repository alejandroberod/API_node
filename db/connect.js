import {createPool} from "mysql2/promise";
export const connPool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "API_node",
    port: "3306"
})