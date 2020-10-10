import request from "@/utils/request"

export function getLbList() {
    return request({
        url: '/lb/list',
        data: '',
        method: 'get'
    })
}

export function saveLb(data) {
    return request({
        url: '/lb/save',
        method: 'post',
        data: data
    })
}

export function deleteLb(id) {
    return request({
        url: '/lb/del/'+id,
        method: 'delete'
    })
}

export function upState(data) {
    return request({
        url: '/lb/state/'+data,
        method: 'put'
    })
}
