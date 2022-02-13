import express, { Application, Router, Request, Response } from 'express';

const cors = require('cors');


const app: Application = express();
const route = Router();

route.get("/", async(req: Request, res: Response): Promise<any> => {
    console.log("hello");
    return res.json({
        message: "Hello!"
    });
});

app.use(express.json());
app.use(cors());
app.use(route);

app.listen(8080, () => {
    console.log("Server running on port 8080");
});
