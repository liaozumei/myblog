<template>
    <!-- 在此写html,页面，最外面必须是一对div标签 -->
    <div style="text-align: center;">
        <UsersTable 
        :title="tableTitle"
        :header ="head"
        :usersList="$store.state.users.usersMsg"
        ></UsersTable>
    </div>
</template>

<script>
    import UsersTable from './UsersTable'
    //向外暴露组件
    export default{
        //组件名称
        name:'Users',
        data:function(){
            return{
                tableTitle:['用户邮箱','手机号','用户名','用户密码','编辑'],
                head:'用户信息管理系统',
                usersifo:''
            }
        },
        components:{
            UsersTable
        },
        created(){
            this.$store.dispatch('users/usersMsg');
            // this.usersifo = $store.state.usersMsg;
            // console.log(this.$store.state.users)
        }
    }

</script>

<!-- scoped:此样式只在此组件中生效 -->
<style scoped> 

</style>