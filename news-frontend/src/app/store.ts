import { configureStore } from '@reduxjs/toolkit';
import {newsReducer} from "../store/newsSlice.ts";
import {commentsReducer} from "../store/commentsSlice.ts";

export const store = configureStore({
    reducer: {
        news: newsReducer,
        comments: commentsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;