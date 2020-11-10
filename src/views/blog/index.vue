<template>
    <!-- 在此写html,页面，最外面必须是一对div标签 -->
    <div style="text-align: center;">
        <div>
        <UsersTable 
        :title="tableTitle"
        :header ="head"
        :blogList="$store.state.blog.blogMsg"
     
        ></UsersTable>
       
        
    </div>
   
    </div>
</template>

<script>
     import UsersTable from './BlogTable';
    // import BlogContentTable from './BlogContentTable'
    //向外暴露组件
    export default{
        //组件名称
        name:'Home',
       
        components:{
            UsersTable,
            // BlogContentTable
        },
        data:function(){
            return{
                tableTitle:['id','标题','内容简介','创建时间','标签','关键字','浏览量','编辑'],
                head:'帖子管理系统',
                tableTitles:['id','博客内容','创建时间','编辑'],
                heads:'博客内容管理系统'
            }
        },
        //查询博客
        created(){
            this.$store.dispatch('blog/getBlog');
          
            // console.log(this.$store.state)
        }
    }

</script>

<!-- scoped:此样式只在此组件中生效 -->
<style scoped> 

</style>