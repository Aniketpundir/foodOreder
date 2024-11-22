import express from 'express';
import multer from 'multer';
import { addfood, listFood,removeFood } from '../controller/foodController.js';


// image storage engine

const storage = multer.diskStorage({
    destination:'uploads',
    filename: (req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)

    }
});

const upload = multer({storage:storage});

const foodRouter = express.Router();

foodRouter.post('/add',upload.single('image'),addfood);
foodRouter.get('/list',listFood);
foodRouter.post('/remove',removeFood);

export default foodRouter;