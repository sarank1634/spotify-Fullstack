import upload from "../../middleware/multer.js";
import { addSong, listSong, removeSong } from "../controllers/songController.js";
import express from "express";


const songRouter = express.Router();

songRouter.post('/add', upload.fields([{name:'image',maxCount:1},{name:'audio',maxCount:1 }]), addSong);
songRouter.get('/list',listSong);
songRouter.delete('/remove',removeSong);

// songRouter.post('/add', upload.fields({name: 'image',maxCount:1},
//     {name: 'audio', maxCount: 1}), addSong);
// songRouter.get('/list', listSong);

export default songRouter;
