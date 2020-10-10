<template>
    <div>
        <el-card>
            <div>
                <el-row justify="center" type="flex">
                    <el-col :span="6">
                        <div >
                            <el-card>
                                <div class="b-total">
                                    <div class="b-sw">
                                        <dl>
                                            <dd>123</dd>
                                            <dt>失物</dt>
                                        </dl>
                                    </div>
                                    <div class="b-sw">
                                        <dl>
                                            <dd>123</dd>
                                            <dt>找回</dt>
                                        </dl>
                                    </div>
                                    <div class="b-sw">
                                        <dl>
                                            <dd>100</dd>
                                            <dt>感谢</dt>
                                        </dl>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                        <el-card>
                            <div class="sdz-tag">
                                <el-tag ref="tag0" :type="isc ===-1?'success':''" @click="lookByType('',-1)">全部</el-tag>
                                <el-tag v-for="(item,index) in typeList" :type="isc ===index?'success':''" :key="item.id" @click="lookByType(item.typeName,index)">{{item.typeName}}</el-tag>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="14">
                        <el-card v-loading="loading">
                            <div v-for="item in takeList" :key="item.id" style="padding: 5px 10px;margin:5px 0;background-color:#a4b0be;border-radius: 5px">

                                <el-badge value="招领"  type="warning">
                                    <div style="display: flex;align-items: center">
                                        <el-avatar :src=" item.createIcon ===null? require('@/assets/xs/xs.jpg'):'/dev-api'+item.createIcon"></el-avatar>
                                        <span>
                                            <span style="margin-left: 5px;padding: 5px;color: #303133;font-size: 12px">{{item.createBy}}</span>
                                            <br>
                                            <span style="font-size: 13px;color: #606266;padding-left: 5px">{{parseTime(item.createTime,'{y}-{m}-{d}')}}</span>
                                        </span>
                                    </div>
                                </el-badge>
                                <div style="padding: 5px" v-text="item.remarks">

                                </div>

                                <div>
                                    <!--图-->
                                    <div style="padding: 5px">
                                        <el-image v-for="item in incons(item.goodsIcon)"
                                                  style="width: 100px; height: 100px"
                                                  :src="item"
                                        >
                                        </el-image>
                                    </div>
                                    <!--其他信息-->
                                    <div class="other">
                                        <i title="地址" class="el-icon-location-information"></i><span>{{item.address}}</span>
                                        <el-button style="float: right;margin-bottom: 10px;margin-right: 10px;color: #3742fa" type="text" @click="lookInfo(item)" size="mini">查看</el-button>
                                    </div>

                                </div>
                            </div>

                            <!--分页-->
                            <el-pagination
                                    style="text-align: center;margin-top: 20px"
                                    background
                                    :current-page.sync="queryInfo.page"
                                    :page-size="queryInfo.size"
                                    hide-on-single-page
                                    @current-change="changePage"
                                    layout="prev, pager, next"
                                    :total="queryInfo.total">
                            </el-pagination>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-dialog :before-close="colse" center :visible="isOpen" width="40%">
            <span slot="title">查看相关信息</span>
            <ul class="list-group list-group-striped">
                <li class="list-group-item">
                    <i class="el-icon-user"></i>发布人
                    <div class="pull-right">{{ goods.createBy }}</div>
                </li>
                <li class="list-group-item">
                    <i class="el-icon-phone-outline"></i>手机号码
                    <div class="pull-right">{{ goods.phone }}</div>
                </li>
                <li class="list-group-item">
                    <i class="el-icon-message"></i>类型
                    <div class="pull-right">{{ goods.goodsType}}</div>
                </li>
                <li class="list-group-item">
                    <i class="el-icon-location-information"></i>地址
                    <div class="pull-right" v-if="goods.address">{{ goods.address }} </div>
                </li>
                <li class="list-group-item">
                    <i class="el-icon-date"></i>发布时间
                    <div class="pull-right">{{ parseTime(goods.createTime,'{y}-{m}-{d}') }}</div>
                </li>
            </ul>
        </el-dialog>

    </div>
</template>

<script>
    import request from '@/utils/request'
    export default {
        name: "Take",
        data(){
            return{
                isc : -1,
                loading: false,
                typeList:[],
                takeList:[],
                goods:{},
                isOpen: false,
                queryInfo:{
                    page: 1,
                    size: 10,
                    name: '',
                    total: 0
                }
            }
        },
        created(){
            this.getTake();
            this.getType();
        },
        methods:{
            lookByType(text,data){
                this.queryInfo.name = text
                this.isc = data
                this.getTake();
            },
            getTake(){
                this.loading = true
                request({
                    url: '/index/page/take',
                    method: 'get',
                    params: this.queryInfo
                }).then(res =>{
                    if (res.status ===200){
                        this.takeList = res.data.list
                        this.queryInfo.total = res.data.total
                        this.loading = false
                    }
                })
            },
            getType(){
                request({
                    url: '/index/type',
                    method: 'get'
                }).then(res =>{
                    if (res.status ===200){
                        this.typeList = res.data
                    }
                })
            },
            lookInfo(goods){
                this.goods =goods
                this.isOpen = true

            },
            colse(){
                this.isOpen = false
            },
            changePage(val){
                this.queryInfo = val;
                this.getLost()
            }
        }
    }
</script>

<style scoped>
    .b-total{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .b-sw{
        width: 80px;
    }
    dl{
        width: 80px;
    }
    .other i{
        color: #3742fa;
    }
    .other span{
        color: #3742fa;
        margin-right: 10px;
        border: #409EFF 1px solid;
        border-radius: 10px;
    }



    .list-group {
        padding-left: 0px;
        list-style: none;
    }
    .list-group-item {
        border-bottom: 1px solid #e7eaec;
        border-top: 1px solid #e7eaec;
        margin-bottom: -1px;
        padding: 11px 0px;
        font-size: 13px;
    }
    .pull-right {
        float: right !important;
    }
    .sdz-tag span:hover{
        background-color: rgba(222, 222, 222, 0.82) !important;
        cursor: pointer;
    }
</style>
