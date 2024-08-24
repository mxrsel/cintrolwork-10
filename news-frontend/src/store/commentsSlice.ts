import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchComments, createComment, deleteComment } from './commentsThunks';
import { Comment } from '../types';

interface CommentsState {
    items: Comment[];
    loading: boolean;
    error: string | null;
}

const initialState: CommentsState = {
    items: [],
    loading: false,
    error: null,
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch comments';
            })
            .addCase(createComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createComment.fulfilled, (state, action: PayloadAction<Comment>) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(createComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create comment';
            })
            .addCase(deleteComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteComment.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.items = state.items.filter(comment => comment.id !== action.payload);
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete comment';
            });
    },
    selectors: {
        selectComments: (state) => state.items,
        selectCommentLoading: (state) => state.loading,
        selectCommentsError: (state) => state.error,
    }
});

export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state: { comments: CommentsState }) => state.comments.items;
export const selectCommentsLoading = (state: { comments: CommentsState }) => state.comments.loading;
export const selectCommentsError = (state: { comments: CommentsState }) => state.comments.error;


