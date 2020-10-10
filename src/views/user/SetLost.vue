<template>
    <!--发布寻物启事-->
    <div>
        <el-card>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>发布启示</el-breadcrumb-item>
            </el-breadcrumb>

            <el-row type="flex" justify="center">
                <el-col :span="20">
                    <el-form ref="goods" :model="goods" :rules="goodsRules" size="mini" label-width="180px">
                        <el-form-item label="物品名称" prop="goodsName">
                            <el-input v-model="goods.goodsName"></el-input>
                        </el-form-item>

                        <el-form-item label="类别" prop="goodsType">
                            <el-select v-model="goods.goodsType" filterable placeholder="请选择">
                                <el-option
                                        v-for="item in typeList"
                                        :key="item.id"
                                        :label="item.typeName"
                                        :value="item.typeName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="启事类型" prop="type">
                            <el-radio v-model="goods.type" label="l">寻物</el-radio>
                            <el-radio v-model="goods.type" label="t">招领</el-radio>
                        </el-form-item>
                        <el-form-item label="地点" prop="address">
                            <el-input v-model="goods.address"></el-input>
                        </el-form-item>
                        <el-form-item label="丢（拾）日期" prop="time">
                            <el-date-picker
                                    v-model="goods.time"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="phone">
                            <el-input v-model="goods.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="备注" prop="remarks">
                            <el-input :rows="4" type="textarea" v-model="goods.remarks"></el-input>
                        </el-form-item>
                        <el-form-item label="图片">
                            <el-upload
                                    :headers="headers"
                                    :http-request="submitIcon"
                                    action="#"
                                    list-type="picture-card"
                                    :limit="4"
                                    :before-upload="beforeUpload"
                                    :on-success="onSuccess"
                                    :auto-upload="true">
                                <i slot="default" class="el-icon-plus"></i>
                                <div slot="file" slot-scope="{file}">
                                    <img
                                            class="el-upload-list__item-thumbnail"
                                            :src="file.url" alt=""
                                    >
                                    <span class="el-upload-list__item-actions">
                                    <span
                                        class="el-upload-list__item-preview"
                                        @click="handlePictureCardPreview(file)"
                                    >
                                        <i class="el-icon-zoom-in"></i>
                                     </span>
                                    <span
                                        v-if="!disabled"
                                        class="el-upload-list__item-delete"
                                        @click="handleDownload(file)"
                                    >
                                        <i class="el-icon-download"></i>
                                    </span>
                                    <span
                                        v-if="!disabled"
                                        class="el-upload-list__item-delete"
                                        @click="handleRemove(file)"
                                     >
                                        <i class="el-icon-delete"></i>
                                    </span>
                                </span>
                                </div>
                            </el-upload>
                            <!--图片查看-->
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitGoods">提交</el-button>
                            <el-button type="info">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import { getToken, setToken, removeToken } from '@/utils/auth'
    import request from '@/utils/request'
    import {goodsSave} from '@/api/goods'
    import {typeList} from "@/api/type"
    export default {
        name: "SetLost",
        data() {
            return {
                headers: {
                    "Authorization": 'Bearer '+getToken(),
                    "Content-Type": "multipart/form-data;"
                },
                icons:[],
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                uploadImgUrl: '/dev-api/upload/goods',

                goods: {
                    goodsName: undefined,
                    goodsType: undefined,
                    address: undefined,
                    time: undefined,
                    type: undefined,
                    phone: undefined,
                    remarks: undefined,
                    goodsIcon:undefined
                },
                typeList:[],
                goodsRules:{
                    goodsName: [{
                required: true,
                message: '请输入物品名称',
                trigger: 'blur'
            }],
                    goodsType: [{
                required: true,
                message: '请选择类型',
                trigger: 'blur'
            }],
                    address: [{
                required: true,
                message: '请输入物品地址',
                trigger: 'blur'
            }],
                    time: [{
                required: true,
                message: '请输入时间',
                trigger: 'blur'
            }],
                    type: [{
                required: true,
                message: '类型不能为空',
                trigger: 'change'
            }],
                phone: [{
                required: true,
                message: '请输入电话号码',
                trigger: 'blur'
            }],
                    remarks: [{
                required: true,
                message: '请输入描述',
                trigger: 'blur'
            }],
                }
            }
        },
        created(){
this.getTypeList()
        },
        methods: {
            handleRemove(file) {
                console.log(file);
                file.url = ''
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleDownload(file) {
                console.log(file);
                console.log(file.url);
            },
            beforeUpload(file){
                console.log("上传前")
                console.log(file)
            },
            onSuccess(response, file, fileList){
                console.log("上传成功")
                this.icons.push(response.data.icon)
                console.log(response)
            },
            submitIcon(file){
                console.log(file);
                const f = new FormData()
                f.append("file",file.file)
                request({
                    url: '/upload/goods',
                    data: f,
                    method: 'post',
                    headers: { "Content-Type": "multipart/form-data;"}
                }).then(res =>{
                    if (res.status ===200){
                        this.icons.push(res.data.icon)
                    }
                })
            },
            submitGoods(){
                const g =  {
                    goodsName: undefined,
                        goodsType: undefined,
                        address: undefined,
                        time: undefined,
                        type: undefined,
                        phone: undefined,
                        remarks: undefined,
                        goodsIcon:undefined
                }
                this.$refs.goods.validate(valid => {
                    if (valid){
                        const req = this.goods;
                        req.goodsIcon = this.icons.toString()
                        goodsSave(req).then(res =>{
                            if (res.status ===200){
                                this.goods = g
                                this.icons = []
                                this.$message.success("发布成功")
                            }
                        })
                    }
                })

            },
            getTypeList(){
                typeList().then(res =>{
                    if (res.status===200){
                        this.typeList = res.data
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
