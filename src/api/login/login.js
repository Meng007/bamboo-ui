import request from '@/utils/request'

// 登录方法
export function login(username, password,type, code, uuid) {
    const data = {
        username,
        password,
        type,
        code,
        uuid
    }
    return request({
        url: 'login',
        method: 'post',
        data: data
    })
}

// 获取用户详细信息
export function getInfo() {
    return request({
        url: '/user/getInfo',
        method: 'get'
    })
}

// 退出方法
export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}

// 获取验证码
export function getCodeImg() {
    return request({
        url: '/captchaImage',
        method: 'get'
    })
}

//注册
export function register(data) {
    return request({
        url: 'register',
        method: 'post',
        data: data
    })
}