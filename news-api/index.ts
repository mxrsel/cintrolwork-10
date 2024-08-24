import express from "express";
import config from "./config";
import cors from "cors";
import mysqlDb from "./mysqlBd";
import newsRouter from "./routers/news";


const app = express();
const port = 8000;

app.use(cors(config.corsOptions))
app.use(express.json());
app.use (express.static('public'));
app.use('/news', newsRouter)

const run = async () => {
    await mysqlDb.init();

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    })
};

run().catch(console.error)