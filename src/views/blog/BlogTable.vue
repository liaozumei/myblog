<template>
  <!-- 在此写html,页面，最外面必须是一对div标签 -->
  <div>
    <!-- <el-row>
            <el-button type="success" round style="text-align: right;">添加用户</el-button>
        </el-row> -->
    <div class="table" style="text-align: center">
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
          >添加</el-button
        >
      </div>

      <!-- 添加博客 -->
      <el-dialog title="添加博客信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="博客内容" :label-width="formLabelWidth">
            <quill-editor
              ref="text"
              v-model="content"
              class="myQuillEditor"
              :options="editorOption"
              
            />
            <!-- <el-button type="primary" @click="submit">提交</el-button> -->
          </el-form-item>
          <el-form-item label="博客简介" :label-width="formLabelWidth">
            <el-input v-model="form.contentintro" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="创建时间" :label-width="formLabelWidth">
            <el-input
              type="datetime-local"
              v-model="form.create_time"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="关键字" :label-width="formLabelWidth">
            <el-input v-model="form.keywords" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="浏览量" :label-width="formLabelWidth">
            <el-input v-model="form.visitor" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="显示状态" :label-width="formLabelWidth">
            <el-select v-model="form.display" placeholder="请选择显示状态">
              <el-option label="是" value="true"></el-option>
              <el-option label="否" value="false"></el-option>
            </el-select>
          </el-form-item>

           <el-form-item label="标签" prop="type">
            <el-checkbox-group v-model="form.tag">
              <el-checkbox label="HTML" name="type"></el-checkbox>
              <el-checkbox label="CSS" name="type"></el-checkbox>
              <el-checkbox label="JS" name="type"></el-checkbox>
              <el-checkbox label="VUE" name="type"></el-checkbox>
              <el-checkbox label="VUE" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button class="tijiao" type="primary" @click="submit()">添加</el-button>
        </div>
      </el-dialog>

      <!-- 修改博客 -->
      <el-dialog title="修改博客信息" :visible.sync="xiugaiFormVisible">
        <el-form :model="modify">
          <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input v-model="modify.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="博客内容" :label-width="formLabelWidth">
            <quill-editor
              ref="text"
              v-model="changeContent"
              class="myQuillEditor"
              :options="editorOption"
            />
            <!-- <el-button type="primary" @click="submit">提交</el-button> -->
          </el-form-item>
          <el-form-item label="博客简介" :label-width="formLabelWidth">
            <el-input v-model="modify.contentintro" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="创建时间" :label-width="formLabelWidth">
            <el-input
              type="datetime-local"
              v-model="modify.create_time"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="关键字" :label-width="formLabelWidth">
            <el-input v-model="modify.keywords" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="浏览量" :label-width="formLabelWidth">
            <el-input v-model="modify.visitor" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="显示状态" :label-width="formLabelWidth">
            <el-select v-model="modify.display" placeholder="请选择显示状态">
              <el-option label="是" value="true"></el-option>
              <el-option label="否" value="false"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="标签" :label-width="formLabelWidth">
            <el-select v-model="modify.tag" placeholder="请选择标签">
              <el-option label="HTML" value="html"></el-option>
              <el-option label="CSS" value="css"></el-option>
              <el-option label="JS" value="js"></el-option>
              <el-option label="VUE" value="vue"></el-option>
              <el-option label="Boostrap" value="bootstrap"></el-option>
            </el-select>
          </el-form-item>
       
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="xiugaiFormVisible = false">取 消</el-button>
          <el-button id="xiugai" type="success" @click="changeSubmit()">修改</el-button>
        </div>
      </el-dialog>

      <h1>{{ header }}</h1>
      <el-table :data="blogList" height="450px" border style="width: 100%">
        <el-table-column fixed prop="title" label="标题" width="150">
        </el-table-column>
        <el-table-column prop="contentintro" label="博客简介" width="180">
        </el-table-column>
        <el-table-column prop="blogContent" label="博客内容" width="145">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="blogContent(scope.row.id.blogContent)"
              >显示博客内容</el-button
            >
          </template>
        </el-table-column>
        <el-table-column 
        prop="create_time" 
        label="创建时间" 
        width="150">
        </el-table-column>
        <el-table-column prop="keywords" label="关键字" width="120">
        </el-table-column>
        <el-table-column prop="tag" label="标签" width="120"> </el-table-column>
        <el-table-column prop="visitor" label="浏览量" width="120">
        </el-table-column>
        <el-table-column prop="display" label="状态" width="120">
          <template slot-scope="{row}">
            <el-switch
              v-model="row.display"
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
          width="100"
          style="text-align: center"
        >
          <template slot-scope="{row}">
            <el-button
              class="btn"
              @click="handleClick(row.id._id, row.display)"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
            <br />
            <el-button
              class="btn"
              type="primary"
              icon="el-icon-edit"
              @click="changeBlog(row)"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="博客内容" :visible.sync="show" width="50%">
        <div v-html="Content"></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="show = false">取 消</el-button>
          <el-button type="primary" @click="show = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
   
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

//向外暴露组件
export default {
  //组件名称
  name: "UsersTable",
  data: function () {
    return {
      item: [
        "title",
        "contentintro",
        "create_time",
        "tag",
        "keywords",
        "visitor",
      ],
      show: false,
      input: "",
      dialogFormVisible: false,
      xiugaiFormVisible:false,
      form: {
        title:"",
        contentintro: "",
        create_time: "",
        tag: "",
        keywords: "",
        visitor: 0,
        display: "",
      },
      modify: {
        title:"",
        contentintro: "",
        create_time: "",
        tag: "",
        keywords: "",
        visitor: '',
        display: "",
        id:''
      },
      formLabelWidth: "120px",
      content:'',
      changeContent:'',
      editorOption: {},
      Content:'',
      change: null,
    };
  },

  props: {
    title: {
      type: Array,
    },
    header: {
      type: String,
    },
    blogList: {
      type: Array,
    },
  },
  components: {
    quillEditor,
  },

  methods: {
    yincang() {
      this.show = !this.show;
    },
    blogContent(data) {
      (this.Content = data), (this.show = true);
    },
    tianjia(){
      this.dialogFormVisible = true;
      
    },

    //模糊查询
    mohu() {
      var params = new URLSearchParams();
      params.append("title", this.input);
      this.$store.dispatch("blog/getBlog", params);
    },

    //删，修改display的状态为false
    handleClick(id, display) {
      display = !display;
      var params = new URLSearchParams();

      params.append("id", id);
      params.append("display", display);

      this.$store.dispatch("blog/delBlog", params);
    },

    //增加博客
    submit() {
      
      this.form.blogContent = this.$refs.text.value;
      var params = new URLSearchParams();

      for (var index in this.form) {
        // console.log(index,this.form[index]);
        params.append(index, this.form[index]);
      }

      this.$store.dispatch("blog/addBlog", params);
      this.dialogFormVisible = false;
    },

    //修改
    changeBlog(row) {
      this.xiugaiFormVisible = true;
    //  console.log(row);
    this.modify ={...this.modify,...row};
    this.changeContent = row.id.blogContent;
    this.modify.id = row.id._id;
    this.modify["display"]=this.modify["display"]+"";
    },

    changeSubmit(){
      this.changeContent = this.$refs.text.value;
      var params = new URLSearchParams();
      for (var index in this.modify) {
        
        params.append(index, this.modify[index]);
      }
      
      params.append('blogContent',this.changeContent)

      this.$store.dispatch("blog/changeBlog", params);
      this.xiugaiFormVisible = false;

    }
  },
};
</script>

<!-- scoped:此样式只在此组件中生效 -->
<style scoped>
.table {
  margin: 50px auto;
  padding-left: 50px;
}
.addbtn {
  width: 60px;
  height: 35px;
  border-radius: 10px;
  outline: none;
  border: none;
  background-color: rgb(61, 188, 238);
  color: white;
  margin-left: 5px;
}
.btn {
  margin-left: 18px;
  margin-bottom: 5px;
}
</style>