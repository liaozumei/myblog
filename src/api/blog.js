import request from '@/utils/request'
var baseUrl = 'http://localhost:3000'

//查
export function getBlogMsg(data){
    return request({
        url:'/blog/findBlogs',
        method:'POST',
        data
    })
}
//增
export function addBlogMsg(data){
    
    return request({
        url:'/blog/addBlogs',
        method:'POST',
        data
    })
}

//删

export function delBlogMsg(data){

    return request({
        url:'/blog/delBlogs',
        method:'POST',
        data
    })
}

//修改

export function changeBlogMsg(data){
    return request({
        url:'/blog/changeBlogs',
        method:'POST',
        data
    })
}
