import request from '@/utils/request'
import da from "element-ui/src/locale/lang/da";

export function uploadAvatar(data) {
    return request({
        url: '/upload/avatar',
        data: data,
        method: 'post'
    })
}

export function updatePassword(oldPassword,newPassword) {
    const data = {oldPassword,newPassword}
    return request({
        url: '/user/passwordUpdate',
        method: 'post',
        data: data
    })
}

export function getUserList(data) {
    return request({
        url: '/user/list',
        method: 'get',
        params: data
    })
}

export function deleteUser(id) {
    return request({
        url: '/user/delete/'+id,
        method: 'put',
    })
}

export function updateUserByAdmin(data) {
    return request({
        url: '/user/update',
        method: 'post',
        data: data
    })
}

export function addUserByAdmin(data) {
    const req = JSON.stringify(data)
    console.log(req)
    return request({
        url: '/user/save',
        method: 'post',
        data: req
    })
}

export function getUserInfo() {
    return request({
        url: '/user/getInfo',
        method: 'get'
    })
}

export function upStatus(id) {
    return request({
        url: '/user/state/'+id,
        method: 'put'
    })
}
