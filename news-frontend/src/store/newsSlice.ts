import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchNews, fetchOneNews, createNews, deleteNews } from './newsThunks';
import { News } from '../types';

interface NewsState {
    items: News[];
    currentNews: News | null;
    loading: boolean;
    error: string | null;
}

const initialState: NewsState = {
    items: [],
    currentNews: null,
    loading: false,
    error: null,
};

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action: PayloadAction<News[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch news';
            })
            .addCase(fetchOneNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOneNews.fulfilled, (state, action: PayloadAction<News>) => {
                state.loading = false;
                state.currentNews = action.payload;
            })
            .addCase(fetchOneNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch news';
            })
            .addCase(createNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNews.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create news';
            })
            .addCase(deleteNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteNews.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter((news) => news.id !== action.meta.arg);
            })
            .addCase(deleteNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete news';
            });
    },

    selectors: {
        selectNews: (state) => state.items,
        selectCurrentNews: (state) => state.currentNews,
        selectNewsLoading: (state) => state.loading,
        selectNewsError: (state) => state.error,

    }
});

export const newsReducer = newsSlice.reducer;

export const {
    selectNews,
    selectCurrentNews,
    selectNewsLoading,
    selectNewsError,
} = newsSlice.selectors;




