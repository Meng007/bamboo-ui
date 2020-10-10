<template>
    <div>
        <el-card>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item >系统管理</el-breadcrumb-item>
                <el-breadcrumb-item >轮播列表</el-breadcrumb-item>
            </el-breadcrumb>

            <el-form :inline="true" label-width="68px" style="margin-top: 20px ">
                <el-form-item label="会员名称">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="会员类别">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
                    <el-button icon="el-icon-refresh" size="mini">重置</el-button>
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

            <el-table :data="lbList">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-image :src="'/dev-api'+scope.row.image"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="编号" prop="id"></el-table-column>
                <el-table-column label="标题" prop="title"></el-table-column>
                <el-table-column label="创建人" prop="createBy"></el-table-column>
                <el-table-column label="发布时间">
                    <template slot-scope="scope">
                        <span>{{parseTime(scope.row.createTime,'{y}-{m}-{d}')}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch
                                style="display: block"
                                v-model="scope.row.state ===1"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-text="可用"
                                @change="updateState(scope.row.id)"
                                inactive-text="禁用">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" mini @click="del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog :visible="isOpen" width="30%" center>
                <span slot="title">发布轮播</span>
                <el-form ref="lb" :model="lb" :rules="lbR">
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="lb.title"></el-input>
                    </el-form-item>
                    <el-form-item label="图片" prop="image">
                        <el-upload
                                class="avatar-uploader"
                                :action="url"
                                :headers="headers"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="isOpen = false">
                            取消
                        </el-button>
                        <el-button type="primary" @click="save">
                            发布
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    import { getToken, setToken, removeToken } from '@/utils/auth'
    import {saveLb,getLbList,deleteLb,upState} from '@/api/lb'
    export default {
        name: "Carousel",
        data(){
            return{
                isOpen: false,
                lbList:[],
                lb:{
                  title:'',
                  image: ''
                },
                lbR:{
                  title:[
                      {
                          required: true,
                          message: '请输入标题',
                          trigger: 'blur'
                      }
                  ],
                    image:[
                        {
                            required: true,
                            message: '请选择图片',
                            trigger: 'blur'
                        }
                    ]
                },
                headers: {
                    "Authorization": 'Bearer '+getToken(),
                },
                imageUrl: '',
                url: '/dev-api/upload/goods'
            }
        },
        created(){
            this.getList()
        },
        methods:{
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                if (res.status ===200){
                    console.log(res)
                    this.lb.image = res.data.icon
                }
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type.startsWith('image/');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            getList(){
                getLbList().then(res =>{
                    if (res.status ===200){
                        this.lbList = res.data
                    }
                })
            },
            save(){
                this.$refs.lb.validate(val =>{
                    if (val){
                        saveLb(this.lb).then(res =>{
                            if (res.status ===200){
                                this.$message.success("发布成功")
                                this.getList()

                                this.lb.title =''
                                this.lb.image = ''
                                this.isOpen = false
                            }
                        })
                    }
                })
            },
            del(id){
                this.$confirm("此操作将删除该轮播图，是否继续？",'提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() =>{
                    deleteLb(id).then(res =>{
                        if (res.status ===200){
                            this.$message.success("删除成功")
                        }
                    })
                }).catch(() =>{
                    this.$message.info("取消删除")
                })
            },
            updateState(id){
                upState(id).then(res =>{
                    if (res.status ===200){
                        this.$message.success("修改成功")
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .avatar-uploader div{
        border: 1px dashed #d9d9d9 ;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader div:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
