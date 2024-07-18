import {BlogUserType} from "./blogUser";

export type BLogType = {
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
    blogUser: BlogUserType;
    createTime: string;
}