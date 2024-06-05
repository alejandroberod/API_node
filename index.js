import express from 'express';
import {connPool} from './db/connect.js';
import personRoutes from './src/routes/person.routes.js';

const app = express();

app.get('/ping', async (req, res) => {
    const result = await connPool.query("SHOW TABLES");
    res.json(result[0]);
})

app.use(express.json());
app.use('/api', personRoutes);

app.use((rep, res) => {
    res.status(404).json({
        Message: "Endpoint losses"
    })
})
const port = 4000;

app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});