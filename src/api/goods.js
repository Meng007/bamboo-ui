import request from '@/utils/request'

export function getGoodsList(data) {
    return request({
        url: '/goods/list',
        method: 'get',
        params: data
    })
}
export function getGoodsListByUser(data) {
    return request({
        url: '/goods/user/list',
        method: 'get',
        params: data
    })
}
export function goodsSave(data) {
    return request({
        url: '/goods/save',
        method: 'post',
        data: data
    })
}

export function goodsUpdate(data) {
    return request({
        url: '/goods/update',
        method: 'post',
        data: data
    })
}

export function goodsDelete(id) {
    return request({
        url: '/goods/delete/'+id,
        method: 'put'
    })
}

export function updateState(id) {
    return request({
        url: '/goods/state/'+id,
        method: 'put'
    })
}

export function upS(id) {
    return request({
        url: '/goods/state/'+id,
        method: 'put'
    })

}
