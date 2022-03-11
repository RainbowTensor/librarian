import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import router from "./api/routes.js";
import LibraryDAO from "./db/dao.js";
//dotenv.config();

const atlas_uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/library/", router);

const client = new MongoClient(atlas_uri, { useNewUrlParser: true });

client.connect((err, conn) => {
    if (err) console.error(err);

    LibraryDAO.injectDB(conn);
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
});
