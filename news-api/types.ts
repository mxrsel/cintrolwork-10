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