<template>
    <div class="login">
        <el-form ref="login" :model="dataFrom" :rules="rules" class="login-from">
            <h2>小主失物招领平台</h2>
            <el-form-item prop="username">
                <el-input v-model="dataFrom.username" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="dataFrom.password" prefix-icon="el-icon-key"></el-input>
            </el-form-item>
            <el-form-item>
                <el-radio-group v-model="dataFrom.type">
                    <el-radio label="student">学生</el-radio>
                    <el-radio label="admin">管理员</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login"><i v-if="loading" class="el-icon-loading"></i>立即登录</el-button>
                <el-button type="info" @click="isOpenForm = true">立即注册</el-button>
            </el-form-item>
        </el-form>

        <!--注册弹框-->
        <el-dialog :visible="isOpenForm" width="40%" @close="onClose" title="学生注册" :before-close="close">
            <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="formData.username" placeholder="请输入账号" :maxlength="10" show-word-limit clearable
                              prefix-icon='el-icon-user' :style="{width: '100%'}"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" placeholder="请输入密码" clearable prefix-icon='el-icon-key'
                              show-password :style="{width: '100%'}"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password1">
                    <el-input v-model="formData.password1" placeholder="请再次输入密码" clearable prefix-icon='el-icon-success'
                              show-password :style="{width: '100%'}"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="formData.nickName" placeholder="请输入姓名" clearable
                              :style="{width: '100%'}"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="formData.sex" size="medium">
                        <el-radio-button v-for="(item, index) in sexOptions" :key="index" :label="item.value"
                                         :disabled="item.disabled">{{item.label}}
                        </el-radio-button>
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
                <el-button @click="isOpenForm =false">取消</el-button>
                <el-button type="primary" @click="register">注册</el-button>
            </div>
        </el-dialog>
        <!--  底部  -->
        <div class="el-login-footer">
            <span>Copyright © 2020-2021 小蒙同学 All Rights Reserved.</span>
        </div>
    </div>
</template>

<script>
    import {register} from '@/api/login/login'

    export default {
        name: "Login",
        data() {
            return {
                redirect: undefined,
                /*注册弹框*/
                loading: false,
                isOpenForm: false,
                /*登录数据*/
                dataFrom: {
                    username: 'admin',
                    password: "123456",
                    type: 'student',
                    code: "1234",
                    uuid: "123"
                },
                /*注册数据*/
                formData: {
                    username: undefined,
                    password: undefined,
                    password1: undefined,
                    nickName: undefined,
                    sex: 2,
                    phone: "",
                    address: undefined,
                },
                /*注册规则*/
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
                /*注册性别*/
                sexOptions: [{
                    "label": "男",
                    "value": 1
                }, {
                    "label": "女",
                    "value": 0
                }],
            }
        },
        watch: {
            $route: {
                handler: function (route) {
                    //监听之前的url
                    this.redirect = route.query && route.query.redirect;
                },
                immediate: true
            }
        },
        methods: {
            onClose() {
                this.$refs['elForm'].resetFields()
            },
            handelConfirm() {
                this.$refs['elForm'].validate(valid => {
                    if (!valid) return
                })
            },
            close() {
                this.isOpenForm = false,
                    this.onClose()
            },
            /*登录*/
            login() {
                this.$refs.login.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        //记录到cookies
                        this.$store
                            .dispatch("Login", this.dataFrom)
                            .then(() => {
                                this.$router.push({path: this.redirect || "/"});
                            })
                            .catch(() => {
                                this.loading = false;
                                //this.getCode();
                            });
                    }
                });
                // this.$router.push("/admin");
            },
            register() {
                const gg = {
                    username: undefined,
                        password: undefined,
                        password1: undefined,
                        nickName: undefined,
                        sex: 2,
                        phone: "",
                        address: undefined,
                }
                this.$refs.elForm.validate(val => {
                    if (val) {
                        register(this.formData).then(res => {
                            if (res.status == 200) {
                                this.$message({
                                    message: '注册成功',
                                    type: 'success'
                                })
                                this.formData = gg
                                this.isOpenForm = false
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
    h2 {
        ont-family: verdana, sans-serif;
        color: #0DBF7B;
        font-size: 22px;
        font-weight: bold;
        letter-spacing: 3pt;
        word-spacing: 1.2pt;
        line-height: 2.8;
    }

    .login {
        margin: auto auto;
    }

    .login-from {
        width: 30%;
        text-align: center;
        margin: 10% auto;
        border: #409EFF 1px solid;
        padding: 10px;
        border-radius: 5px;
    }

    .el-login-footer {
        text-align: center;
    }
</style>
