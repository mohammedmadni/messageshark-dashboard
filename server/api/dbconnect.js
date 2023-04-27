import db from "./db/conn.js";
import express from "express"
const router = express.Router();

router.get('/guilds/:id', async (req, res) => {
    let collection = await db.collection("users");
    let query = {_id: req.params.id};
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result.guilds).status(200);
});

export default router;