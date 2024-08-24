import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { Comment, CommentMutation } from '../types';

export const fetchComments = createAsyncThunk<Comment[], number>(
    'comments/fetchAll',
    async (newsId) => {
        const { data } = await axiosApi.get<Comment[]>(`http://localhost:8000/${newsId}/comments`);
        return data;
    }
);

export const createComment = createAsyncThunk<Comment, CommentMutation>(
    'comments/create',
    async (commentMutation) => {
        const { data } = await axiosApi.post<Comment>('http://localhost:8000/comments', commentMutation);
        return data;
    }
);

export const deleteComment = createAsyncThunk<number, number>(
    'comments/delete',
    async (commentId) => {
        await axiosApi.delete(`http://localhost:8000/comments/${commentId}`);
        return commentId;
    }
);





