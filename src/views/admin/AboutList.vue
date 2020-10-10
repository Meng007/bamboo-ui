<template>
    <div>
        <el-card>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item >系统管理</el-breadcrumb-item>
                <el-breadcrumb-item >关于我们</el-breadcrumb-item>
            </el-breadcrumb>
           <el-form :model="about" ref="about" :rules="aboutR">
               <el-form-item prop="content">
                   <el-upload
                           class="avatar-uploader quill-img"
                           :action="uploadImgUrl"
                           name="file"
                           :headers="headers"
                           :show-file-list="false"
                           :on-success="quillImgSuccess"
                           :on-error="uploadError"
                           :before-upload="quillImgBefore"
                           accept='.jpg,.jpeg,.png,.gif'
                   ></el-upload>
                   <quill-editor
                           ref="quillEditor"
                           :options="editorOption"
                           class="editor"
                           v-model="about.content"></quill-editor>
               </el-form-item>
               <el-form-item>
                   <el-button type="primary" mini class="el-icon-true" @click="submitAbout">提交</el-button>
               </el-form-item>
           </el-form>
        </el-card>
    </div>
</template>

<script>
    // 工具栏配置
    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"],       // 加粗 斜体 下划线 删除线
        ["blockquote", "code-block"],                    // 引用  代码块
        [{ list: "ordered" }, { list: "bullet" }],       // 有序、无序列表
        [{ indent: "-1" }, { indent: "+1" }],            // 缩进
        [{ size: ["small", false, "large", "huge"] }],   // 字体大小
        [{ header: [1, 2, 3, 4, 5, 6, false] }],         // 标题
        [{ color: [] }, { background: [] }],             // 字体颜色、字体背景颜色
        [{ align: [] }],                                 // 对齐方式
        ["clean"],                                       // 清除文本格式
        ["link", "image", "video"]                       // 链接、图片、视频
    ];

    import requst from '@/utils/request'
    import {getToken} from '@/utils/auth'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import {quillEditor} from 'vue-quill-editor'
    export default {
        name: "AboutList",
        components:{
          quillEditor
        },
        data(){
            return {
                aboutR:{
                  content:[
                      {
                          required: true,
                          message: '请输入内容',
                          target: 'blur'
                      }
                  ]
                },
                about:{
                    id: null,
                  content: ''
                },
                uploadImgUrl: process.env.VUE_APP_BASE_API + "/upload/goods",
                headers: {
                    Authorization: 'Bearer ' + getToken()
                },
                editorOption: {
                    placeholder: "",
                    theme: "snow", // or 'bubble'
                    placeholder: "请输入内容",
                    modules: {
                        toolbar: {
                            container: toolbarOptions,
                            handlers: {
                                image: function(value) {
                                    if (value) {
                                        // 触发input框选择图片文件
                                        document.querySelector(".quill-img input").click();
                                    } else {
                                        this.quill.format("image", false);
                                    }
                                }
                            }
                        }
                    }
                },
            }
        },
        created(){
            this.getAbout();
        },
        methods:{
            // 富文本图片上传前
            quillImgBefore(file) {
                let fileType = file.type;
                if(fileType === 'image/jpeg' || fileType === 'image/png'){
                    return true;
                }else {
                    this.$message.error('请插入图片类型文件(jpg/jpeg/png)');
                    return false;
                }
            },

            quillImgSuccess(res, file) {
                // res为图片服务器返回的数据
                // 获取富文本组件实例
                let quill = this.$refs.quillEditor.quill;
                // 如果上传成功
                if (res.status == 200) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.url为服务器返回的图片地址
                    quill.insertEmbed(length, "image", '/dev-api'+res.data.icon);
                    // 调整光标到最后
                    quill.setSelection(length + 1);
                } else {
                    this.$message.error("图片插入失败");
                }
            },
            // 富文本图片上传失败
            uploadError() {
                // loading动画消失
                this.$message.error("图片插入失败");
            },

            submitAbout(){
                this.$refs.about.validate(val =>{
                    if (val){
                        requst({
                            url: '/about/save',
                            method: 'post',
                            data:this.about
                        }).then(res =>{
                            this.$message.success("操作成功")
                        })
                    }
                })
            },

            getAbout(){
                requst({
                    url: '/about/list',
                    method: 'get'
                }).then(res =>{
                    if (res.status ===200){
                        this.about = res.data
                    }
                })
            }

        }
    }
</script>

<style scoped>
    .editor {
        line-height: normal !important;
        /*height: 150px;*/
        min-height: 200px;
    }
    .quill-img {
        display: none;
    }
    .ql-snow .ql-tooltip[data-mode="link"]::before {
        content: "请输入链接地址:";
    }
    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
        border-right: 0px;
        content: "保存";
        padding-right: 0px;
    }

    .ql-snow .ql-tooltip[data-mode="video"]::before {
        content: "请输入视频地址:";
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item::before {
        content: "14px";
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
        content: "10px";
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
        content: "18px";
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
        content: "32px";
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item::before {
        content: "文本";
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
        content: "标题1";
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
        content: "标题2";
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
        content: "标题3";
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
        content: "标题4";
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
        content: "标题5";
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
        content: "标题6";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item::before {
        content: "标准字体";
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
        content: "衬线字体";
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
        content: "等宽字体";
    }
</style>
