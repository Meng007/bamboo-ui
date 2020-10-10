import request from '@/utils/request'

export function typeSave(data) {
    return request({
        url: '/type/save',
        method: 'post',
        data: data
    })
}

export function deleteType(id) {
    return request({
        url: '/type/delete/'+id,
        method: 'put'
    })
}

export function typeList() {
    return request({
        url: '/type/list',
        method: 'get'
    })
}
