import request from '@/utils/request'

export function getNoticeList(data) {
    return request({
        url: '/notice/list',
        method: 'get',
        params: data
    })
}

export  function saveNotice(data) {
    return request({
        url: '/notice/save',
        method: 'post',
        data: data
    })
}

export function delNotice(id) {
    return request({
        url: '/notice/del/'+id,
        method: 'delete'
    })
}

export  function updateState(id) {
    return request({
        url: '/notice/state/'+id,
        method: 'put'
    })
}
