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
    image: string | null;
}

export interface Comments {
    id: number;
    news_id: number;
    author?: string;
    text: string
}

export type CommentsMutation = {
    news_id: number;
    author?: string;
    text: string;
}