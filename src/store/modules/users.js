
import {getUsersMsg,changeUsersMsg} from '@/api/users'


const state = {
    usersMsg:null
}

const mutations = {
    'GET_USERS_MSG':function(state,data){
        
        state.usersMsg = data.users
    }
}


const actions = {
   async usersMsg({commit}){
    let res = await getUsersMsg();
            console.log(res);
            commit('GET_USERS_MSG',res)
        
    },

    async changeUsersMsg({commit},data){
        let res = await changeUsersMsg(data);
        console.log(res);
        if(res.data.msg === 'ok'){
            this.dispatch('users/usersMsg')
        }
    }

}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}