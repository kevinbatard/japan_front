export type TComments = {
    id: number;
    user: { pseudo: string };
    content: string;
    created_at: string;
    updated_at: string | null;
};
