import {getSwiperMsg} from '@/api/swiper'

const state = {
    swiperMsg:null
}


const mutations = {
    'GET_SWIPER_MSG':function(state,data){
        
        state.swiperMsg = data
       
    }
}


const actions = {
   getSwiperMsg: async function({commit},data){
    let res = await getSwiperMsg(data)
    console.log(res)
    commit('GET_SWIPER_MSG',res.swiper)
    }
}


export default {
    namespaced:true,
    state,
    mutations,
    actions
}