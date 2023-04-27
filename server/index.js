import express from "express";
import "./loadEnvironment.js";
const app = express();
import cors from "cors"
import discordRouter from "./api/discord.js"
import dbconnectRouter from "./api/dbconnect.js"

const port = process.env.PORT;

app.use(cors());
app.use('/api/discord', discordRouter);
app.use('/api/dbconnect', dbconnectRouter);

app.use((err, req, res, next) => {
    switch (err.message) {
        case 'NoCodeProvided':
            return res.status(400).send({
                status: 'ERROR',
                error: err.message,
            });
        default:
            return res.status(500).send({
                status: 'ERROR',
                error: err.message,
            });
    }
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
