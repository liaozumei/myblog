<template>
    <!-- 在此写html,页面，最外面必须是一对div标签 -->
    <div >
        <!-- <el-row>
            <el-button type="success" round style="text-align: right;">添加用户</el-button>
        </el-row> -->
      <div class="table" style="text-align: center;">
          <h1>{{header}}</h1>
          <br>
        <!-- <table   border="1"  cellspacing=0>
            <tr>
                <th width="150px"  v-for="(item, index) in title" :key="index">
                    {{item}}
                </th>
            </tr>
            <tr v-for="(item,index)  in  usersList" :key="index">
                <td> {{item.email}}</td>
                <td> {{item.phone}}</td>
                <td>{{item.username}}</td>
                <td>{{item.password}}</td>
                <td>
                    <el-row>
                        <br/>
                        <el-button type="danger" round>删除</el-button>
                        <br/>
                        <br/>
                        <el-button type="primary" round>修改</el-button>
                        <br/>
                        <br/>
                      </el-row>
                </td>
            </tr>
        </table> -->
        <template>
            <el-table
              :data="usersList"
              stripe
              style="width: 100%">
            <el-table-column
              prop="avatar"
              label="头像"
            >
              <template slot-scope="scope">
                <img style="width:100px" :src="scope.row.avatar" alt="">
              </template>
            </el-table-column>
              
              <el-table-column
                prop="email"
                label="用户邮箱"
                >
              </el-table-column>
              <el-table-column
                prop="phone"
                label="用户手机号"
               >
              </el-table-column>
              
              <el-table-column
                prop="username"
                label="用户名称"
               >
              </el-table-column>
              <el-table-column
                prop="roles"
                label="用户身份">
                
              </el-table-column>
              <el-table-column
            fixed="right"
            label="操作"
            >
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row.roles,scope.row.username)" type="primary" icon="el-icon-edit" size="small"></el-button>
               
            </template>
            </el-table-column>      
            </el-table>
          </template>
        
      </div>
     
    </div>
</template>

<script>
    //向外暴露组件
    export default{
        //组件名称
        name:'UsersTable',
        data:function(){
            return{
                
            }
        },
        props:{
            title:{
                type:Array
            },
            header:{
                type:String
            },
            usersList:{
                type:Array
            }
        },
        created(){
           
            
        },
        methods:{
            handleClick(row,username){
               
               if(row == 'editor'){
                var params = new URLSearchParams();
                params.append('roles','admin');
                params.append('username',username);
                this.$store.dispatch('users/changeUsersMsg',params);
            }else{
                var params = new URLSearchParams();
                params.append('roles','editor');
               params.append('username',username);
                this.$store.dispatch('users/changeUsersMsg',params);
               }
                
            
        }
      
    }
    }

</script>

<!-- scoped:此样式只在此组件中生效 -->
<style scoped> 
.table{
    margin: 50px auto;
    padding-left: 100px;
}
</style>