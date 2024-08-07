export type CommentVOType = {
    id: number;
    userId: number;
    blogId: number;
    text: string;
    username: string;
    userAvatarUrl: string;
    isMyComment: boolean;
};