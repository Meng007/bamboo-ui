<template>
    <el-card>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >公告管理</el-breadcrumb-item>
            <el-breadcrumb-item >公告列表</el-breadcrumb-item>
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

        <el-table
                row-key="id"
                :data="typeList"
        >
            <el-table-column label="编号" prop="id"></el-table-column>
            <el-table-column label="名称" prop="typeName"></el-table-column>
            <el-table-column label="创建时间">
                <template slot-scope="scope">
                    <span>{{parseTime(scope.row.createTime, '{y}-{m}-{d}')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建人" prop="createBy"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text">添加</el-button>
                    <el-button type="text" @click="delType(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :visible="isOpen" width="40%">
            <span slot="title">添加类型</span>
            <el-form :model="formData" :rules="formRules">
                <el-form-item label="类型名称" prop="typeName">
                    <el-input v-model="formData.typeName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="isOpen = false">取消</el-button>
                    <el-button type="primary" @click="addType">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-card>
</template>

<script>
    import {typeSave,typeList,deleteType} from '@/api/type'
    export default {
        name: "TypeList",
        data(){
            return{
                isOpen :false,
                typeList:[],
                options:[],
                formData:{
                    fid:'',
                    typeName:'',
                },
                formRules:{

                }
            }
        },
created(){
    this.getTypeList()
},
        methods:{
            addType(){
                typeSave(this.formData).then(res =>{
                    if (res.status ===200){
                        this.$message.success("添加成功")
                        this.isOpen = false
                        this.formData = {}
                    }
                })
            },
            getTypeList(){
                typeList().then(res =>{
                    if (res.status ===200){
                        this.typeList = res.data
                    }
                })
            },
            delType(id){
                this.$confirm('此操作将永久删除该类型, 是否继续?', '提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() =>{
                    deleteType(id).then(res =>{
                        if (res.status ===200){
                            this.$message.success("删除成功")
                        }
                    })
                }).catch(() =>{
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })

            }
        }

    }
</script>

<style scoped>

</style>
