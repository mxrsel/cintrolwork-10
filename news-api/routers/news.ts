import express from "express";
import mysqlDb from "../mysqlBd";
import { News, NewsMutation} from "../types";
import {imagesUpload} from "../multer";
import {ResultSetHeader} from "mysql2";


const newsRouter = express.Router();

newsRouter.get('/', async (req, res, next) => {
    try{
        const result = await mysqlDb.getConnection().query(
            'SELECT * FROM news'
        );

        const news = result[0] as News[];
        return res.send(news);
    }catch (e) {
        next(e)
    }
});

newsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    try{
        const result = await mysqlDb.getConnection().query(
            'SELECT * FROM news WHERE id = ?',
            [id]
        );

        const news = result[0] as News[];

        if( news.length > 0){
            return res.status(404).send({error: 'News not found'});
        }else {
            return res.send(news[0]);
        }
    } catch (e) {
        next(e)
    }
});

newsRouter.post ('/', imagesUpload.single('image'), async(req, res, next) => {
    if(!req.body.title) {
        return res.status(400).send ({error: 'Title is required'});
    }

    const oneNews: NewsMutation = {
        title: req.body.title,
        content: req.body.content,
        image: req.file ? req.file.filename : null,
    };

    try {
        const [result] = await mysqlDb.getConnection().query(
            'INSERT INTO news (title, content, image) VALUES (?, ?, ?)',
            [oneNews.title, oneNews.content, oneNews.image]
        );

        const resultHeader = result as ResultSetHeader;
        const getNewResult = await mysqlDb.getConnection().query(
            'SELECT * FROM news WHERE id = ?',
            [resultHeader.insertId]
        );

        const news = getNewResult[0] as News[];
        return  res.send( news[0])
    } catch (e) {
        next(e);
    }
});

newsRouter.delete('/:id', async(req, res, next) => {
    const id = req.params.id;

    try{
        await mysqlDb.getConnection().query(
            'DELETE FROM news WHERE id = ?',
            [id]
        );
    }catch (e) {
        next(e)
    }
});

export default newsRouter;