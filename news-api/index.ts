import express from "express";
import config from "./config";
import cors from "cors";
import mysqlDb from "./mysqlBd";


const app = express();
const port = 8000;

app.use(cors(config.corsOptions))
app.use(express.json());
app.use (express.static('public'));

const run = async () => {
    await mysqlDb.init();

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    })
};

run().catch(console.error)