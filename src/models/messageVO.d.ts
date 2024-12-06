export type MessageVOType = {
    id: number;
    type: number; // 类型- 0 点赞 1-点赞 2- 关注消息 3 - 私发消息 4 - 队伍消息
    fromId: number;
    toId: number;
    text: string;
    teamId: number;
    blogId: number;
    isRead: number;
    createTime: Date;
    avatarUrl: string;
    title: string;
}