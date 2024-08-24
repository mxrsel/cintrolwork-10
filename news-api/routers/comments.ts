import express from "express";
import mysqlDb from "../mysqlBd";
import { Comments, CommentsMutation } from "../types";
import { ResultSetHeader } from "mysql2";

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
    try {
        const result = await mysqlDb.getConnection().query(
            'SELECT * FROM comments'
        );

        const comments = result[0] as Comments[];
        return res.send(comments);
    } catch (e) {
        next(e);
    }
});

commentsRouter.post('/', async (req, res, next) => {
    if (!req.body.news_id || !req.body.text) {
        return res.status(400).send({ error: 'News ID and text are required' });
    }

    const comment: CommentsMutation = {
        news_id: req.body.news_id,
        author: req.body.author,
        text: req.body.text,
    };

    try {
        const [result] = await mysqlDb.getConnection().query(
            'INSERT INTO comments (news_id, author, text) VALUES (?, ?, ?)',
            [comment.news_id, comment.author, comment.text]
        );

        const resultHeader = result as ResultSetHeader;
        const getNewResult = await mysqlDb.getConnection().query(
            'SELECT * FROM comments WHERE id = ?',
            [resultHeader.insertId]
        );

        const comments = getNewResult[0] as Comments[];
        return res.send(comments[0]);
    } catch (e) {
        next(e);
    }
});

commentsRouter.delete('/:id', async (req, res, next) => {
    const commentId = parseInt(req.params.id);
    if (isNaN(commentId)) {
        return res.status(400).send({ error: 'Invalid ID' });
    }

    try {
        const [result] = await mysqlDb.getConnection().query<ResultSetHeader>(
            'DELETE FROM comments WHERE id = ?',
            [commentId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send({ error: 'Comment not found' });
        }

        return res.send({ message: 'Comment deleted successfully' });
    } catch (e) {
        res.status(500).send({ error: 'Server Error' });
    }
});

export default commentsRouter;
