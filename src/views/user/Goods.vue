<template>
    <!--寻物启事-->
    <div>
        <el-card>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>个人中心</el-breadcrumb-item>
                <el-breadcrumb-item>寻物启事</el-breadcrumb-item>
            </el-breadcrumb>
<!--条件搜索-->
            <el-form :inline="true" label-width="68px" style="margin-top: 20px ">
                <el-form-item label="物品名称">
                    <el-input v-model="queryInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="物品类别">
                    <el-select v-model="queryInfo.type" @focus="getTypeList" placeholder="请选择">
                        <el-option
                                v-for="item in typeList"
                                :key="item.id"
                                :label="item.typeName"
                                :value="item.typeName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="queryInfo.state"  placeholder="请选择">
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

<!--功能按钮-->
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

            <el-table v-loading="loading" :data="goodsList" stripe border highlight-current-row>
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-image style="width: 200px;padding: 5px" v-for="item in incons(scope.row.goodsIcon)" :src="item"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="编号" prop="id"></el-table-column>
                <el-table-column label="名称" prop="goodsName"></el-table-column>
                <el-table-column label="物品类别" prop="goodsType"></el-table-column>
                <el-table-column label="发布时间" >
                    <template slot-scope="scope">
                        <span>{{parseTime(scope.row.createTime),'{y}-{m}-{d}'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="地址" prop="address"></el-table-column>
                <el-table-column label="时间" >
                    <template slot-scope="scope">
                        <span>{{parseTime(scope.row.time),'{y}-{m}-{d}'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="发布类别">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.type ==='l'">丢失</el-tag>
                        <el-tag v-else>拾起</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.status ===0"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-text="归还"
                                @change="upState(scope.row)"
                                inactive-text="待还">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="eg" mini>修改</el-button>
                        <el-button type="text" @click="del(scope.row.id)" mini>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                    :total="queryInfo.total"
                    layout="prev, pager, next">
            </el-pagination>
        </el-card>

        <!--发布-->
        <el-dialog :before-close="close" center :visible="isOpen" width="50%" >
            <span slot="title">发布告示</span>
            <div style="height: 500px">
                <iframe frameborder="0"  src="/set/lost" width="100%" height="100%" scrolling="yes"></iframe>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import {getGoodsListByUser,upS,goodsDelete} from "@/api/goods"
    import {typeList} from "@/api/type"
    export default {
        name: "Goods",
        data(){
            return{
                isOpen: false,
                goodsList:[],
                loading:false,
                typeList: [],
                options:[
                    {
                        value: '1',
                        label: '待还'
                    },
                    {
                        value: '0',
                        label: '归还'
                    }
                ],
                queryInfo:{
                    page: 1,
                    size: 10,
                    total: 0,
                    name: '',
                    type: '',
                    state: ''
                }
            }
        },
        created(){
          this.getGoodsList1()
        },
        methods:{
            close(){
                this.isOpen = false
                location.reload()
            },
            eg(){
                this.$confirm("你确定要修改吗？是否继续！","哈哈  ^_^  ",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'danger'
                }).then( ()=>{
                    this.$message.success("其实没这个必要！删除了在提交就好了。 ^_^")
                }).catch(() =>{
                    this.$message.error("睡一觉就可以实现了")
                })
            },
            del(id){
                this.$confirm('你确定要删除吗?','警告你了波！',{
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() =>{
                    goodsDelete(id).then(res =>{
                        if (res.status ===200){
                            this.$message.success("删除成功")
                            this.getGoodsList1()
                        }
                    })
                }).catch(() =>{
                    this.$message.info("取消删除")
                })
            },
            getTypeList(){
                if (this.typeList.length ===0){
                    typeList().then(res =>{
                        if (res.status ===200){
                            this.typeList = res.data
                        }
                    })
                }

            },
            getGoodsList1(){
                this.loading = true
                getGoodsListByUser(this.queryInfo).then(res =>{
                    if (res.status ===200){
                        this.goodsList = res.data.list
                        this.queryInfo.total = res.data.total
                        this.loading = false
                    }
                })
            },
            search(){
                this.getGoodsList1()
            },
            reset(){
                this.queryInfo.name = ""
                this.queryInfo.type = ""
                this.queryInfo.state = ""
                this.getGoodsList1()
            },
            upState(goods){
                upS(goods.id).then(res =>{
                    if (res.status ===200){
                        if (goods.status ===1){
                            goods.status =0
                        }else {
                            goods.status =1
                        }
                        this.$message.success("跟新成功")
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
