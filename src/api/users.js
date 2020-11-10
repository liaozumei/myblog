import request from '@/utils/request'



export function getUsersMsg(){
    return request({
    url:'/users/getUsers',
    method:'POST'

    })

}


export function changeUsersMsg(data){
    return request({
        url:'/users/changeUsers',
        method:'POST',
        data
    })
}