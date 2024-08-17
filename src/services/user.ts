import request from '../plugins/request';
import {UserRegisterType, UserType} from "../models/user";
import {LocationQueryValue} from "vue-router";

const userApi = {
    currentUser: '/user/current',
    updateUser: '/user/update',
    userLogin: '/user/login',
    userRegister: '/user/register',
    userLogout: '/user/logout',
    imageUpload: '/oss/upload',
    userRecommend: '/user/recommend',
    userMatch: '/user/match',
    getUserById: '/user/getUserById',
}

export function userRecommend(pageSize: number, pageNum: number) {
    return request({
        url: userApi.userRecommend,
        method: 'get',
        params: {
            pageSize,
            pageNum
        }
    })
}


export function getUserById(userId: string | LocationQueryValue[]) {
    return request({
        url: userApi.getUserById,
        method: 'get',
        params: {
            userId
        }
    })
}

export function userMatch(num: number) {
    return request({
        url: userApi.userMatch,
        method: 'get',
        params: {
            num
        }
    })
}

export function userRegister(parameter: UserRegisterType) {
    return request({
        url: userApi.userRegister,
        method: 'post',
        data: parameter
    })
}
export function userLogin(parameter: UserType) {
    return request({
        url: userApi.userLogin,
        method: 'post',
        data: parameter
    })
}

export function imageUpload(parameter: any) {
    return request({
        url: userApi.imageUpload,
        method: 'post',
        data: parameter
    })
}

export function userLogout() {
    return request({
        url: userApi.userLogout,
        method: 'post'
    })
}

export async function getCurrentUser() {
    // 不存在，从后端获取
    const res = await request.get(userApi.currentUser);
    // @ts-ignore
    if (res.code === 0) {
        return res.data
    }
}

/**
 * 修改用户信息
 * @param parameter
 * @returns {Promise<*>}
 */
export function updateUser(parameter: UserType) {
    return request({
        url: userApi.updateUser,
        method: 'post',
        data: parameter
    })
}
