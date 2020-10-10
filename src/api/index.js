import request from '@/utils/request'

export function getLost() {
    return request({
        url: '/index/lost',
        method: 'get'
    })
}

export function getTake() {
    return request({
        url: '/index/take',
        method: 'get'
    })
}

export function getNotice() {
    return request({
        url: '/index/notice',
        method: 'get'
    })
}

export function getSysInfo() {
    return request({
        url: '/index/sys',
        method: 'get'
    })
}
