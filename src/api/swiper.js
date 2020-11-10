import request from '@/utils/request'

export function getSwiperMsg(data){
    return request({
        url:'/swiper/getSwipers',
        method:'POST',
        data
    })
}