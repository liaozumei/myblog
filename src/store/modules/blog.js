import {getBlogMsg} from '@/api/blog'
import {addBlogMsg} from '@/api/blog'
import {delBlogMsg} from '@/api/blog'
import {changeBlogMsg} from '@/api/blog'

const state = {
    blogMsg:null,
    changeMsg:null
}


const mutations = {
 
   'GET_BLOG_MSG':function(state,data){
    
      state.blogMsg = data;
},
 
}




const actions = {

    getBlog({ commit },data) {
      getBlogMsg(data).then(res => {
        console.log(res);
        //  将数据commit给mutations
        commit('GET_BLOG_MSG',res.blog)
      })
    
    },
    
    addBlog:function({commit},data){
      addBlogMsg(data).then(res=>{
        console.log(res);
      if(res.blog.msg == 'ok'){
        this.dispatch('blog/getBlog')
      }
    })
     
    },

    delBlog:function({commit},data){
      delBlogMsg(data).then(res=> {
        console.log(res);
        if(res.blog.msg == 'ok'){
          this.dispatch('blog/getBlog')
      }
    })
      
    },

    changeBlog:async function({commit},data){
      let res=await changeBlogMsg(data)
      console.log(res);
      if(res.blog.msg == 'ok'){
      this.dispatch('blog/getBlog')
    }
    }
  }

export default{
    namespaced:true,
    state,
    mutations,
    actions
}