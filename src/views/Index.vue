<template>
    <div>
        <el-card>
            <el-row type="flex" justify="center">
                <el-col :span="20">
                    <!--轮播图-->
                    <div>
                        <el-carousel :interval="5000" arrow="always">
                            <el-carousel-item v-for="item in lbList" :key="item.id">
                                <div style="text-align: center">
                                    <img :src="'/dev-api'+item.image" :alt="item.title">
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>

                    <div style="margin-top: 20px">
                        <el-row>
                            <el-col :span="8">
                                <!--最近失物招领-->
                                <el-card>
                                    <div class="new">
                                        <el-link style="float: right">更多</el-link>
                                        最新失物

                                    </div>
                                    <div>
                                        <el-collapse>
                                            <el-collapse-item v-for="item in lostList" :key="item.id" :title="item.goodsName">
                                                <div>
                                                    {{item.remarks}}
                                                </div>
                                                <div>
                                                    <el-image
                                                            style="width: 100px; height: 100px"
                                                            :src="getFastIcon(item.goodsIcon)"
                                                            :preview-src-list="incons(item.goodsIcon)">
                                                    </el-image>
                                                    <el-button type="text" @click="look(item)">查看</el-button>
                                                </div>
                                            </el-collapse-item>
                                        </el-collapse>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="8">
                                <el-card>
                                    <div class="new">
                                        <el-link style="float: right">更多</el-link>
                                        最新招领
                                    </div>
                                    <div>
                                        <el-collapse>
                                            <el-collapse-item v-for="item in takeList" :key="item.id" :title="item.goodsName">
                                                <div>
                                                    {{item.remarks}}
                                                </div>
                                                <div>
                                                    <el-image
                                                            style="width: 100px; height: 100px"
                                                            :src="getFastIcon(item.goodsIcon)"
                                                            :preview-src-list="incons(item.goodsIcon)">
                                                    </el-image>
                                                    <el-button type="text" @click="look(item)">查看</el-button>
                                                </div>
                                            </el-collapse-item>
                                        </el-collapse>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="8">
                                <el-card>
                                    <div class="new">
                                        <el-link style="float: right">更多</el-link>
                                        最新公告
                                    </div>
                                    <div>
                                        <el-collapse>
                                            <el-collapse-item v-for="item in noticeList" :key="item.id" :title="item.title">
                                                <div v-html="item.content">

                                                </div>
                                            </el-collapse-item>
                                        </el-collapse>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>

                    </div>
                </el-col>

            </el-row>
            <el-row>
                <div class="index-row">
                    <div class="wrap clearfix">
                        <div class="c1">
                            <p>快速</p>
                            <p>通道</p>
                        </div>
                        <div class="c2">
                            <a href="http://xtbg.ylu.cn" target="_blank" title="" >新协同办公系统</a>
                            <span>|</span>
                            <a href="http://mail.ylu.edu.cn" target="_blank" title="" >EDU电子邮箱(教师)</a>
                            <span>|</span>
                            <a href="http://mail.stu.ylu.edu.cn" target="_blank" title="" >EDU电子邮箱（学生）</a>
                            <span>|</span>
                            <a href="http://ylu.yiban.cn" target="_blank" title="" >易班社区</a>
                            <span>|</span>
                            <a href="http://hyw.ylu.cn/" target="_blank" title="" >红叶网</a>
                            <span>|</span>
                            <a href="info/1037/3393.htm" target="_blank" title="" >实验室</a>
                            <span>|</span>
                            <a href="http://bxw.ylsfxy.com" target="_blank" title="" >博学网</a>
                            <span>|</span>
                            <a href="http://210.36.247.32/ysycjyw/" target="_blank" title="" >国培网</a>
                            <span>|</span>
                            <a href="http://jjy.ylu.cn" target="_blank" title="" >继续教育学院</a>
                            <span>|</span>
                            <a href="http://210.36.247.111/" target="_blank" title="" >图书馆</a>
                            <span>|</span>
                            <a href="http://210.36.247.82/xyb" target="_blank" title="" >校友</a>
                            <span>|</span>
                            <a href="http://210.36.247.31/index.php?m=content&amp;c=index&amp;a=lists&amp;catid=62" target="_blank" title="" >校历</a>
                            <span>|</span>
                            <a href="info/1037/3387.htm" target="_blank" title="">校车</a>
                        </div>
                    </div>
                </div>
            </el-row>

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
        </el-card>
    </div>
</template>

<script>
    import request from '@/utils/request'
    export default {
        name: "Index",
        data(){
            return{
                noticeList:[],
                isOpen: false,
                loading1: false,
                loading2: false,
                loading3: false,
                lostList:[],
                takeList:[],
                lbList:[],
                goods:{}
            }
        },
        created(){
            this.getLb();
            this.getLost();
            this.getTake();
            this.getNotice();
        },
        methods:{
            getLb(){
                request({
                    url: '/index/lb',
                    method: 'get'
                }).then(res =>{
                    if (res.status ===200){
                        this.lbList = res.data
                    }
                })
            },
            getLost(){
                request({
                    url: '/index/lost',
                    method: 'get'
                }).then(res =>{
                    if (res.status ===200){
                        this.lostList = res.data
                    }
                })
            },
            getTake(){
                request({
                    url: '/index/take',
                    method: 'get'
                }).then(res =>{
                    if (res.status ===200){
                        this.takeList = res.data
                    }
                })
            },
            look(data){
                this.goods = data,
                    this.isOpen  = true
            },
            colse(){
                this.isOpen = false
            },
            getNotice(){
                request({
                    url: '/index/notice',
                    method: 'get'
                }).then(res =>{
                    if (res.status ===200){
                        this.noticeList = res.data
                    }
                })
            }
        }
    }
</script>

<style scoped>
.new{
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    border-bottom: 2px solid #0285ce;
    margin-bottom: 10px;
}
    .index-row{
        padding: 20px 0;
        background: #f2f2f2;
        min-width: 1260px;
    }
    .wrap{
        width: 1240px;
        margin: 0 auto;
    }
    .c1{
        background: #0285ce;
        float: left;
        width: 80px;
        height: 70px;
        padding-top: 10px;
        text-align: center;
        line-height: 30px;
        color: #fff;
        font-size: 16px;
        letter-spacing: 5px;
    }
    .c2{
        margin-left: 100px;
        line-height: 40px;
    }
.clearfix:after {
    content: '\20';
    display: block;
    height: 0;
    clear: both;
}
    .c2 a{
        white-space: nowrap;
    }
    .c2 span{
        display: inline-block;
        font-size: 10px;
        transform: scale(0.8);
        color: #666;
        margin: 0 27px;
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
</style>
