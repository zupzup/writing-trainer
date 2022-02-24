import express, { Application, Router, Request, Response } from 'express';
import cors from 'cors';
import * as fs from 'fs';

const de_words: String[] = JSON.parse(fs.readFileSync('./languages/de.json', {encoding:'utf8', flag:'r'}));
const en_words: String[] = JSON.parse(fs.readFileSync('./languages/en.json', {encoding:'utf8', flag:'r'}));

const MAX_NUM: number = 100;

const app: Application = express();
const route = Router();

route.get("/words/de/:num", async(req: Request, res: Response): Promise<any> => {
    const num: number = parseInt(req.params.num);

    if (num > 100 || num < 1) {
        res.status(400);
        return res.json({
            error: "number needs to be between 1 and 100"
        })
    }

    return res.json({
        words: n_random_words_from_file(de_words, num),
    });
});

route.get("/words/en/:num", async(req: Request, res: Response): Promise<any> => {
    const num: number = parseInt(req.params.num);

    if (num > 100 || num < 1) {
        res.status(400);
        return res.json({
            error: "number needs to be between 1 and 100"
        })
    }

    return res.json({
        words: n_random_words_from_file(en_words, num),
    });
});

function rand(min: number, max: number) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

function n_random_words_from_file(file: String[], num: number): String[] {
    const len = file.length;
    const random_nums: number[] = [];
    let i = 0;

    while (i < num) {
        let new_rand = rand(0, len);
        if (random_nums.includes(new_rand)) {
            continue;
        }
        i++;
        random_nums.push(new_rand);
    }
    return random_nums.map((n) => file[n])
}


app.use(express.json());
app.use(cors());
app.use(route);

app.listen(8080, () => {
    console.log("Server running on port 8080");
});
