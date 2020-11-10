<template>
    <!-- 在此写html,页面，最外面必须是一对div标签 -->
    <div style="text-align: center;">
        <SwiperTable 
        :title="tableTitle"
        :header ="head"
       :swiperList ="$store.state.swiperMsg"
        ></SwiperTable>
      
    </div>
</template>

<script>
    import SwiperTable from './SwiperTable'
    import request from '../../utils/request'
    //向外暴露组件
    export default{
        //组件名称
        name:'Swiper',
        data:function(){
            return{
                tableTitle:['id','图片','标题','内容','创建时间','显示状态'],
                head:'轮播图管理系统',
                usersifo:''
            }
        },
        components:{
            SwiperTable
        },
        created(){
           
        }
    }
</script>

<!-- scoped:此样式只在此组件中生效 -->
<style scoped> 

</style>