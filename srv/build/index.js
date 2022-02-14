"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs = __importStar(require("fs"));
const de_words = JSON.parse(fs.readFileSync('./languages/de.json', { encoding: 'utf8', flag: 'r' }));
const en_words = JSON.parse(fs.readFileSync('./languages/en.json', { encoding: 'utf8', flag: 'r' }));
const app = (0, express_1.default)();
const route = (0, express_1.Router)();
route.get("/words/de/:num", async (req, res) => {
    const num = parseInt(req.params.num);
    return res.json({
        words: n_random_words_from_file(de_words, num),
    });
});
route.get("/words/en/:num", async (req, res) => {
    const num = parseInt(req.params.num);
    return res.json({
        words: n_random_words_from_file(en_words, num),
    });
});
function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function n_random_words_from_file(file, num) {
    const len = file.length;
    const random_nums = [];
    let i = 0;
    while (i < num) {
        let new_rand = rand(0, len);
        if (random_nums.includes(new_rand)) {
            continue;
        }
        i++;
        random_nums.push(new_rand);
    }
    return random_nums.map((n) => file[n]);
}
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(route);
app.listen(8080, () => {
    console.log("Server running on port 8080");
});
