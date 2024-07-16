export type BLogType = {
    id: number;
    title: string;
    content: string;
    coverImage: string;
    image: string[];
    tags: string[];
    likeNum: number;
    starNum: number;
    commentNum: number;
    createTime: Date;
    updateTime: Date;
}