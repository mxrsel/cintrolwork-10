import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from "../axiosApi.ts";
import {News, NewsMutation} from "../types.ts";

export const fetchNews = createAsyncThunk<News[]>('news/fetchAll', async () => {
    const { data } = await axiosApi.get<News[]>('http://localhost:8000/news');
    return data;
});

export const fetchOneNews = createAsyncThunk<News, number>('news/fetchOne', async (id) => {
    const { data } = await axiosApi.get<News>(`/news/${id}`);
    return data;
});

export const createNews = createAsyncThunk<void, NewsMutation>('news/create', async (newsMutation) => {
    const formData = new FormData();
    formData.append('title', newsMutation.title);
    formData.append('content', newsMutation.content);
    if (newsMutation.image) {
        formData.append('image', newsMutation.image);
    }
    await axiosApi.post('http://localhost:8000/news', formData);
});

export const deleteNews = createAsyncThunk<void, number>(
    'news/delete',
    async (id) => {
        await axiosApi.delete(`http://localhost:8000/news/${id}`);
    }
);

