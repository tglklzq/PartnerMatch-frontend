import {UserType} from "./user";

/**
 * 房间类别
 */
export type TeamType = {
    teamId: number;
    name: string;
    description: string;
    expireTime?: Date;
    maxNum: number;
    password?: string,
    status: number;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
    hasJoin?: boolean;
    joinNum?: number;
};

/**
 * 加入房间类别
 */
export type JoinTeamType = {
    teamId: number;
    password?: string;
};

/**
 * 退出房间类别
 */
export type QuitTeamType = {
    teamId: number;
};
