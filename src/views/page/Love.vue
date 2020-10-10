<template>
    <div>
        <!--表白墙-->
       <el-row type="flex" justify="center">
           <el-col :span="20">
               <div class="liuyan">
                   <ul>
                       <li v-for="i in 4">
                         <div class="liuyan-item">
                             <div style="float: left;width: 200px">
                                 <div style="width: 60px;margin: 5px auto">
                                     <el-avatar :size="60" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3759109446,2227863324&fm=26&gp=0.jpg"></el-avatar>
                                     <p class="name">使得组</p>
                                 </div>
                             </div>
                             <div style="margin-left: 200px;border-bottom: 1px solid #5a5e66;padding-bottom: 5px ">
                                 <div class="content">
                                     文字是人类用表意符号记录表达信息以传之久远的方式和工具。现代文字大多是记录语言的工具。人类往往先有口头的语言后产生书面文字，很多小语种，有语言但没有文字。文字的不同体现了国家和民族的书面表达的方式和思维不同。文字使人类进入有历史记录的文明社...
                                 </div>
                                 <div  class="img">
                                     <el-image v-for="i in 3" style="width: 30%;margin: 2px 2px" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3494504637,435273751&fm=26&gp=0.jpg">
                                         <div slot="placeholder" class="image-slot">
                                             加载中<span class="dot">...</span>
                                         </div>
                                     </el-image>
                                 </div>
                                 <div>
                                     <span>点赞</span>
                                     <span>评论</span>
                                     <span>转发</span>
                                     <span>收藏</span>
                                 </div>
                             </div>
                         </div>
                       </li>
                   </ul>
               </div>
           </el-col>
       </el-row>
    </div>
</template>

<script>
    export default {
        name: "Love"
    }
</script>

<style scoped>
ul li{
    list-style: none;
}
    .content{
        height: 60px;
        padding: 2px 5px;
        color: #303133;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 100;

    }
    .name{
        display: inline-block;
        height: 22px;
        line-height: 22px;
        width: 60px;
        margin: 2px auto;
        text-align: center;
    }
    .img{
        padding-left: 20px;
    }
</style>
