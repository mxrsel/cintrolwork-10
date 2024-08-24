import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {selectComments} from "../store/commentsSlice.ts";
import {fetchOneNews} from "../store/newsThunks.ts";
import {createComment, deleteComment, fetchComments} from "../store/commentsThunks.ts";
import {selectCurrentNews, selectNewsError, selectNewsLoading} from "../store/newsSlice.ts";
import {Button, Container} from "@mui/material";

const NewsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const news = useAppSelector(selectCurrentNews);
    const comments = useAppSelector(selectComments);
    const loading = useAppSelector(selectNewsLoading);
    const error = useAppSelector(selectNewsError);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        if (id) {
            dispatch(fetchOneNews(Number(id)));
            dispatch(fetchComments(Number(id)));
        }
    }, [dispatch, id]);

    const handleAddComment = () => {
        if (newComment && id) {
            dispatch(createComment({ text: newComment, news_id: Number(id) }))
                .unwrap()
                .then(() => {
                    setNewComment('');
                });
        }
    };

    const handleDeleteComment = (commentId: number) => {
        dispatch(deleteComment(commentId))
            .unwrap()
            .then(() => {
                console.log(`Deleted comment with id: ${commentId}`);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Container>
            <h1>{news?.title}</h1>
            <img src={news?.image || 'placeholder.jpg'} alt={news?.title} />
            <p>{news?.content}</p>
            <Container sx={{display: 'flex', 'flex-direction': 'column'}}>
                <h2>Comments</h2>
                {comments.map((comment) => (
                    <div key={comment.id}>
                        <p>{comment.text}</p>
                        <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                    </div>
                ))}
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                />
                <Button variant='outlined' onClick={handleAddComment}>Add Comment</Button>
            </Container>
        </Container>
    );
};

export default NewsPage;
