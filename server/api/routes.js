import express from "express";
import LibraryDAO from "../db/dao.js";

const router = express.Router();
const dao = new LibraryDAO();

router.get("/:collection", async (req, res) => {
    const collectionName = req.params.collection;
    const allBooks = await dao.get(collectionName);
    res.send(allBooks);
});

router.post("/:collection/add", async (req, res) => {
    const collectionName = req.params.collection;
    const data = req.body;
    const newData = await dao.post(collectionName, data);
    res.send(newData);
});

router.put("/:collection/:id", async (req, res) => {
    const collectionName = req.params.collection;
    const id = req.params.id;
    const data = req.body;
    const newData = await dao.put(collectionName, data, id);
    res.send(newData);
});

router.delete("/:collection/:id", async (req, res) => {
    const collectionName = req.params.collection;
    const id = req.params.id;
    const newData = await dao.delete(collectionName, id);
    res.send(newData);
});

export default router;
