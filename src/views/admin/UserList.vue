<template>
    <div>
        <el-card>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item >会员管理</el-breadcrumb-item>
                <el-breadcrumb-item >会员列表</el-breadcrumb-item>
            </el-breadcrumb>
                <!--条件搜索-->
                <el-form :inline="true" label-width="68px" style="margin-top: 20px ">
                    <el-form-item label="会员名称">
                        <el-input v-model="queryInfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="会员类别">
                        <el-select v-model="queryInfo.type" placeholder="请选择">
                            <el-option
                                    v-for="item in options2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
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
                        <el-button icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>

            <el-row :gutter="10" class="mb8">
                <el-col :span="1.5">
                    <el-button
                            type="primary"
                            icon="el-icon-plus"
                            size="mini"
                            @click="addUserOpen"
                    >添加
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

            <el-table  v-loading="loading" :data="userList" stripe border highlight-current-row fit>
                <el-table-column label="编号" prop="id"></el-table-column>
                <el-table-column label="账号" prop="username"></el-table-column>
                <el-table-column label="名称" prop="nickName"></el-table-column>
                <el-table-column label="地址" prop="address"></el-table-column>

                <el-table-column label="电话" prop="phone"></el-table-column>
                <el-table-column label="性别">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.sex ==1">男</el-tag>
                        <el-tag v-else>女</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="qq" prop="qq"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="身份">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.isAdmin ===1">管理员</el-tag>
                        <el-tag v-else>会员</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.status ==='1'"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-text="可用"
                                @change="updateStatus(scope.row)"
                                inactive-text="禁用">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" mini @click="updateUser(scope.row)">修改</el-button>
                        <el-button type="text" mini @click="delUser(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="queryInfo.size"
                    prev-text="上一页"
                    next-text="下一页"
                    :current-page="queryInfo.page"
                    layout="total, prev, pager, next"
                    :total="queryInfo.total">
            </el-pagination>

            <el-dialog :visible="isOpen" width="40%" center :before-close="close" @close="close">
                <span slot="title">{{title}}</span>
                <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
                    <el-form-item label="账号" prop="username">
                        <el-input v-model="formData.username" placeholder="请输入账号" :maxlength="10" show-word-limit clearable
                                  prefix-icon='el-icon-user' :style="{width: '100%'}"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" v-if="isb">
                        <el-input v-model="formData.password" placeholder="请输入密码" clearable prefix-icon='el-icon-key'
                                  show-password :style="{width: '100%'}"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password1" v-if="isb">
                        <el-input v-model="formData.password1" placeholder="请再次输入密码" clearable prefix-icon='el-icon-success'
                                  show-password :style="{width: '100%'}"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="formData.nickName" placeholder="请输入姓名" clearable :style="{width: '100%'}"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="formData.sex" size="medium">
                            <el-radio-button v-for="(item, index) in sexOptions" :key="index" :label="item.value"
                                             :disabled="item.disabled">{{item.label}}</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="身份" prop="isAdmin">
                        <el-radio-group v-model="formData.isAdmin" size="medium">
                            <el-radio-button v-for="(item, index) in isOptions" :key="index" :label="item.value"
                                             :disabled="item.disabled">{{item.label}}</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="电话" prop="phone">
                        <el-input v-model="formData.phone" placeholder="请输入电话号码" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="formData.address" placeholder="请输入地址" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer">
                    <el-button @click="isOpen =false">取消</el-button>
                    <el-button v-if="isb" type="primary" @click="addUser">添加</el-button>
                    <el-button v-else type="primary" @click="updateUserByAdmin">跟新</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    import {addUserByAdmin,getUserList,deleteUser,updateUserByAdmin,upStatus} from '@/api/user'
    import {typeList} from "@/api/type"

    export default {
        name: "UserList",
        data(){
            return{
                loading: false,
                isb: true,
                title:undefined,
                isOpen: false,
                options:[
                    {
                        value: '1',
                        label: '可用'
                    },
                    {
                        value: '0',
                        label: '禁用'
                    }
                ],
                options2:[
                    {
                        value: '1',
                        label: '管理员'
                    },
                    {
                        value: '0',
                        label: '普通会员'
                    }
                ],
                userList:{},
                queryInfo:{
                    page: 1,
                    size: 10,
                    name: '',
                    type: '',
                    state: '',
                    total: 0
                },
                formData: {
                    username: undefined,
                    password: undefined,
                    password1: undefined,
                    nickName: undefined,
                    sex: 1,
                    isAdmin: 0,
                    phone: "",
                    address: undefined,
                },
                rules: {
                    username: [{
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }],
                    password1: [{
                        required: true,
                        message: '请再次输入密码',
                        trigger: 'blur'
                    }],
                    nickName: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }],
                    sex: [{
                        required: true,
                        message: '性别不能为空',
                        trigger: 'change'
                    }],
                    phone: [{
                        required: true,
                        message: '请输入电话号码',
                        trigger: 'blur'
                    }],
                    address: [{
                        required: true,
                        message: '请输入地址',
                        trigger: 'blur'
                    }],
                },
                sexOptions: [{
                    "label": "男",
                    "value": 1
                }, {
                    "label": "女",
                    "value": 0
                }],
                isOptions: [{
                    "label": "管理员",
                    "value": 1
                }, {
                    "label": "会员",
                    "value": 0
                }],
            }
        },
        created(){
            this.getUserList()
        },
        methods:{
            updateStatus(user){
                upStatus(user.id).then(res =>{
                    if (res.status ===200){
                        if (user.status ==='1'){
                            user.status ='0'
                        }else {
                            user.status ='1'
                        }
                        this.$message.success("修改成功")
                    }else {
                        this.$message.error("修改失败")
                    }
                })
            },
            reset(){
              this.queryInfo.name = ''
              this.queryInfo.type = ''
              this.queryInfo.state = ''
                this.getUserList()
            },
            search(){
              this.getUserList();
            },
            getUserList(){
                console.log(this.queryInfo)
                this.loading = true
                getUserList(this.queryInfo).then(res =>{
                    if (res.status ===200){
                        this.userList = res.data.list
                        this.queryInfo.total = res.data.total
                        this.loading = false
                    }
                })
            },
            handleCurrentChange(value){
                this.queryInfo.page = value
                this.getUserList()
            },
            close(){
                this.isOpen = false

            },
            delUser(id){
                this.$confirm('此操作将永久删除该会员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteUser(id).then(res =>{
                        if (res.status ===200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else {
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            updateUser(data){
                console.log("跟新")
                console.log(data)
                this.formData = data
                this.title = '跟新会员'
                this.isOpen = true
                this.isb = false
            },
            updateUserByAdmin(){
                this.$refs.elForm.validate(valid => {
                    if (valid){
                        updateUserByAdmin(this.formData).then(res =>{
                            if (res.status ===200){
                                this.$message({
                                    type: 'success',
                                    message: '更新成功!'
                                });
                                this.isOpen = false
                            }
                        })
                    }
                })
            },
            addUserOpen(){
                const data = {
                    username: undefined,
                        password: undefined,
                        password1: undefined,
                        nickName: undefined,
                        sex: 1,
                        isAdmin: 0,
                        phone: "",
                        address: undefined,
                }
                this.formData = data
                this.title = '添加会员'
                this.isOpen = true
                this.isb=true
            },
            addUser(){
                this.$refs.elForm.validate(valid => {
                  if (valid){
                      addUserByAdmin(this.formData).then(res =>{
                          if (res.status ===200){
                              this.$message({
                                  type: 'success',
                                  message: '添加成功!'
                              });
                          }else {
                              this.$message({
                                  type: 'error',
                                  message: '添加失败!'
                              });
                          }
                      })
                  }
                })
            }
        }


    }
</script>

<style scoped>

</style>
