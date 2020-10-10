<template>
    <div>
        <el-card>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item >公告管理</el-breadcrumb-item>
                <el-breadcrumb-item >公告列表</el-breadcrumb-item>
            </el-breadcrumb>

            <el-form :inline="true" label-width="68px" style="margin-top: 20px ">
                <el-form-item label="标题">
                    <el-input v-model="queryInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="发布人">
                    <el-input v-model="queryInfo.type"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="queryInfo.state" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="search" size="mini">搜索</el-button>
                    <el-button icon="el-icon-refresh" @click="reset" size="mini">重置</el-button>
                </el-form-item>
            </el-form>

            <el-row :gutter="10" class="mb8">
                <el-col :span="1.5">
                    <el-button
                            type="primary"
                            icon="el-icon-plus"
                            size="mini"
                            @click="isOpen = true"
                    >发布
                    </el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button
                            type="success"
                            icon="el-icon-edit"
                            size="mini"
                    >修改
                    </el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                    >删除
                    </el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button
                            type="warning"
                            icon="el-icon-download"
                            size="mini"
                    >导出
                    </el-button>
                </el-col>
            </el-row>

            <el-table :data="noticeList">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <div v-html="scope.row.content">

                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="编号" prop="id"></el-table-column>
                <el-table-column label="标题" prop="title"></el-table-column>
                <el-table-column label="发布人" prop="createBy"></el-table-column>
                <el-table-column label="发布时间">
                    <template slot-scope="scope">
                        <span>{{parseTime(scope.row.createTime),'{y}-{m}-{d}'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.state ===1"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-text="可用"
                                @change="upState(scope.row)"
                                inactive-text="禁用">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" mini class="el-icon-delete" @click="rm(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>

            <el-dialog center :visible="isOpen" width="60%" >
                <span slot="title">发布公告</span>
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
                <el-form :model="notice" ref="notice" :rules="noticeRules">
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="notice.title"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" prop="content">
                        <quill-editor
                                ref="quillEditor"
                                :options="editorOption"
                                class="editor"
                                v-model="notice.content"></quill-editor>
                    </el-form-item>
                </el-form>
                <span slot="footer">
                    <el-button type="info" @click="isOpen = false">取消</el-button>
                    <el-button type="primary" @click="save">发布</el-button>
                </span>
            </el-dialog>
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
    import {getToken} from '@/utils/auth'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import {quillEditor} from 'vue-quill-editor'
    import {saveNotice,getNoticeList,delNotice,updateState} from '@/api/notice'
    export default {
        name: "NoticeList",
        components:{
            quillEditor
        },
        data(){
            return{
                options:[
                    {
                        value: 1,
                        label: '可用',
                    },
                    {
                        value: 0,
                        label: '禁用',
                    }
                ],
                queryInfo:{
                  page: 1,
                  size: 10,
                  name: '',
                  type: '',
                  state: '',
                  total: 0
                },
                uploadImgUrl: process.env.VUE_APP_BASE_API + "/upload/goods",
                notice:{
                  title: '',
                  content: ''
                },
                noticeRules:{
                    title:[
                        {
                            required: true,
                            message: '请输入标题',
                            trigger: 'blur'
                        }
                    ],
                    content:[
                        {
                            required: true,
                            message: '请输内容',
                            trigger: 'blur'
                        }
                    ]
                },
                headers: {
                    Authorization: 'Bearer ' + getToken()
                },
                noticeList:[],
                loading: false,
                isOpen: false,
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
            this.getNotice()
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


            save(){
                this.$refs.notice.validate(val => {
                  if (val){
                      saveNotice(this.notice).then(res =>{
                          if (res.status ===200){
                              this.$message.success("发布成功")
                              this.notice.title = ''
                              this.notice.content = ''
                          }else {
                              this.$message.error("发布失败")
                          }
                      })
                  }
                })
            },
            getNotice(){
                getNoticeList(this.queryInfo).then(res =>{
                    if (res.status ===200){
                        this.noticeList = res.data.list
                        this.queryInfo.total = res.data.total
                    }
                })
            },
            search(){
                this.getNotice()
            }
            ,
            reset(){
                this.queryInfo.name = ""
                this.queryInfo.type = ""
                this.queryInfo.state = ""
                this.getNotice();
            },
            rm(id){
                this.$confirm("嘿嘿！你确定要删除吗？ 我很辛苦的！",'are you sure?',{
                    confirmButtonText: 'true',
                    cancelButtonText: 'false',
                    type: 'warning'
                }).then(res =>{
                    delNotice(id).then(res =>{
                        if (res.status ===200){
                            this.$message.success("再见了主人！ ^-^")
                        }else {
                            this.$message.error("哈哈！ 我是你删除不掉的")
                        }
                    })
                }).catch(() =>{
                    this.$message.info("感谢大侠手下留情！ 告辞")
                })
            },
            upState(n){
                updateState(n.id).then(res =>{
                    if (res.status ===200){
                        if (n.state ===1){
                            n.state =0
                        }else {
                            n.state =1
                        }
                        this.$message.success("更新成功")
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
