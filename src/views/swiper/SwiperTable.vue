<template>
    <!-- 在此写html,页面，最外面必须是一对div标签 -->
    <div >
       
    
      <div class="table">
           <h1>{{header}}</h1>
          <div
        style="
          margin: 0px auto;
          width: 500px;
          height: 40px;
          display: flex;
          flex-wrap: nowrap;
        "
      >
        <el-input v-model="input" placeholder="请输入你要查找的标题"></el-input>
        <!-- 模糊查询 -->
        <el-button
          icon="el-icon-search"
          @click="mohu()"
          circle
          style="margin-left: 5px"
        ></el-button>
        <el-button type="primary" @click="tianjia()" round
          >添加</el-button>
          </div>
          <!-- 添加轮播图信息 -->
<el-dialog title="添加轮播图信息" :visible.sync="addFormVisible">
    <el-container>
        <el-aside>
            <div class="block"><el-avatar shape="square" :size="200" :src="ruleForm.imgurl == '' ? 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png':ruleForm.imgurl" style="width:200px;height:200px"></el-avatar></div>
        </el-aside>
        <el-main>
        
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="图片" prop="imgurl">
                <el-input v-model="ruleForm.imgurl"></el-input>
            </el-form-item>
            <el-form-item label="图片标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="图片内容" prop="content">
                <el-input v-model="ruleForm.content"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="create_time">
                <el-input type="datetime-local" v-model="ruleForm.create_time"></el-input>
            </el-form-item>
            <el-form-item label="显示状态" prop="show">
                <el-switch v-model="ruleForm.show"></el-switch>
            </el-form-item>
            </el-form>
         </el-main>
    </el-container>
     <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible=false">取消</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="primary" @click="submitForm(ruleForm)">添加</el-button>
    </div>
</el-dialog>

          <!-- 修改轮播图信息 -->
<el-dialog title="修改轮播图信息" :visible.sync="changeFormVisible">
    <el-container>
        <el-aside>
            <div class="block"><el-avatar shape="square" :size="200" :src="changeForm.imgurl == '' ? 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png':ruleForm.imgurl" style="width:200px;height:200px"></el-avatar></div>
        </el-aside>
        <el-main>
        
            <el-form :model="changeForm" :rules="rules" ref="changeForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="图片" prop="imgurl">
                <el-input v-model="changeForm.imgurl"></el-input>
            </el-form-item>
            <el-form-item label="图片标题" prop="title">
                <el-input v-model="changeForm.title"></el-input>
            </el-form-item>
            <el-form-item label="图片内容" prop="content">
                <el-input v-model="changeForm.content"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="create_time">
                <el-input type="datetime-local" v-model="changeForm.create_time" disabled></el-input >
            </el-form-item>
            <el-form-item label="显示状态" prop="show">
                <el-switch v-model="changeForm.show"></el-switch>
            </el-form-item>
            </el-form>
         </el-main>
    </el-container>
     <div slot="footer" class="dialog-footer">
                <el-button @click="changeFormVisible=false">取消</el-button>
                <el-button type="primary" @click="changeSubmit(changeForm)">修改</el-button>
    </div>
</el-dialog>

        <template>
            <el-table
                :data="swiperList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
                <el-table-column
                prop="imgurl"
                label="图片"
               >
                <template slot-scope="{row}">
                    <img :src="row.imgurl" alt="" style="width:100px">
                </template>
                </el-table-column>
                <el-table-column
                prop="title"
                label="图片标题"
               >
                </el-table-column>
                <el-table-column
                prop="content"
                label="图片内容"
              >
                </el-table-column>
                <el-table-column
                prop="create_time"
                label="创建时间"
               >
                </el-table-column>
               <el-table-column prop="show" label="显示状态" width="120">
                 <template slot-scope="{row}">
                    <el-switch
                        v-model="row.show"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        disabled
                        >
                    </el-switch>
                </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                   
                    style="text-align: center"
                    >
                    <template slot-scope="{row}">
                        <el-button
                        class="btn"
                        @click="delClick(row.id,row.show)"
                        type="danger"
                        icon="el-icon-delete"
                        circle
                        ></el-button>
                     
                        <el-button
                        class="btn"
                        type="primary"
                        icon="el-icon-edit"
                        @click="changeSwiper(row)"
                        circle
                        ></el-button>
                 </template>
                </el-table-column>
            </el-table>
        </template>
        
       
        
      </div>
     
    </div>
</template>

<script>
import { log } from 'util'
import request from '../../utils/request'
  
    //向外暴露组件
    export default{
        //组件名称
        name:'SwiperTable',
        data:function(){
            return{
                input:'',
                addFormVisible:false,
                changeFormVisible:false,
                display:false,
                
                squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
               ruleForm:{
                   imgurl:'',
                   title:'',
                   content:'',
                   create_time:'',
                   show:false
               },
               changeForm:{
                    imgurl:'',
                   title:'',
                   content:'',
                   create_time:'',
                   show:false
               },
               swiperList:[],
            
            }
        },
       
        props:{
            header:{
                type:String
            },
           
        },

        //显示轮播图信息
        async created(){

            await this.$store.dispatch('swiper/getSwiperMsg');
             this.swiperList =await this.$store.state.swiper.swiperMsg;  
           
        },
     
        methods:{
             tianjia(){
                this.addFormVisible=true;
                    this.ruleForm =[...this.ruleForm]
                },
            resetForm(formName) {
                
                this.$refs[formName].resetFields();
            },
        //模糊查询
       async mohu(){
        var params = new URLSearchParams();
        params.append("title", this.input);
        await this.$store.dispatch('swiper/getSwiperMsg',params);
        this.swiperList = this.$store.state.swiper.swiperMsg;
        },
            
        //增加轮播图
        async submitForm(form){
           
           async function  addSwiperMsg(data){
                return request({
                    url:'/swiper/addSwipers',
                    method:'POST',
                    data
                })
            }
            var params = new URLSearchParams();
            params.append('imgurl',form.imgurl);
            params.append('title',form.title); 
            params.append('content',form.content);
            params.append('create_time',form.create_time);
            params.append('show',form.show);
            let res = await addSwiperMsg(params);
           
            if(res.data.msg == 'ok'){
           await this.$store.dispatch('swiper/getSwiperMsg');
            this.swiperList = this.$store.state.swiper.swiperMsg;  
            }
            this.addFormVisible=false;

    },
    //逻辑删除轮播图内容
        async delClick(id,show){
        async function delSwiperMsg(data){
                return request({
                    url:'/swiper/delSwipers',
                    method:'POST',
                    data
                })
            }
            var params = new URLSearchParams();
            params.append('id',id);
            params.append('show',!show);
            let res = await delSwiperMsg(params);
            console.log(res);
            if(res.data.msg == 'ok'){
            await this.$store.dispatch('swiper/getSwiperMsg');
            this.swiperList = this.$store.state.swiper.swiperMsg;
            }

        },
    
            //修改轮播图信息
            changeSwiper(row){
            this.changeForm = row;
            this.changeFormVisible = true;
            },

            async changeSubmit(changerow){
                function changeSwiperMsg(data){
                return request({
                    url:'/swiper/changeSwipers',
                    method:'POST',
                    data
                })
            }
            var params = new URLSearchParams();
            params.append('id',changerow.id);
            params.append('title',changerow.title);
            params.append('imgurl',changerow.imgurl);
            params.append('content',changerow.content);
            params.append('show',changerow.show);
            let res = await changeSwiperMsg(params);
            console.log(res);
            if(res.data.msg == 'ok'){
            await this.$store.dispatch('swiper/getSwiperMsg');
            this.swiperList = this.$store.state.swiper.swiperMsg;
            }
            this.changeFormVisible = false;    
            }

 },

   
    }
</script>

<!-- scoped:此样式只在此组件中生效 -->
<style scoped> 
.table{
    margin: 30px auto;
    padding-left: 50px;
}
.addbtn{
    width: 60px;
    height: 30px;
    border-radius: 10px;
    outline: none;
    border: none;
    background-color: rgb(61, 188, 238);
    color: white;
    margin-left: 5px;
}
/* .block{
    width: 100px;
    height: 100px;
    border:1px solid gray;
    margin: 0 0;
} */
</style>