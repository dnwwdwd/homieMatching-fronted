import {BlogUserType} from "./blogUser";
import {CommentVOType} from "./commentVO";

export type BlogType = {
    id: number;
    title: string;
    content: string;
    coverImage: string;
    images: string;
    tags: string;
    viewNum: number;
    likeNum: number;
    starNum: number;
    commentNum: number;
    commentVOList: CommentVOType;
    blogUserVO: BlogUserType;
    createTime: string;
    isStarred: boolean;
    isLiked: boolean;
}