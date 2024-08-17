/**
 * 用户类别
 */
export type UserType = {
    userId: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    profile?: string;
    gender:number;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    tags: string;
    createTime: Date;
};
/**
 * 用户类别
 */
export type UserRegisterType = {
    userAccount: string;
    userPassword: string;
    checkPassword: string;
};
