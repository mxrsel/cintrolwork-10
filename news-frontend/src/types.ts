// src/types.ts
export interface News {
    id: number;
    title: string;
    content: string;
    image: string;
    createdAt: string | null;
}

export type NewsMutation = {
    title: string;
    content: string;
    image: File | null;
};

export interface Comment {
    id: number;
    news_id: number;
    author?: string;
    text: string;
}

export type CommentMutation = {
    news_id: number;
    author?: string;
    text: string;
};
