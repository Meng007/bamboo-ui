<template>
    <!--用户中心-->
    <div style="height: 100%">
        <el-container>
            <el-container>
                <el-aside width="200px" style="overflow: hidden;background-color: #304156;height: 100%" >
                    <el-menu
                            background-color="#304156"
                        mode="vertical"
                        router
                        default-active="/my/info"
                        text-color="#8cc4fd"
                        active-text-color="#409EFF"
                    >
                        <el-menu-item>
                            <div >
                                <h1>招领平台</h1>
                            </div>
                        </el-menu-item>
                        <el-menu-item index="/my/info">
                           <i class="el-icon-user-solid"></i> 个人信息
                        </el-menu-item>
                        <el-menu-item index="/my/goods">
                            <i class="el-icon-goods"></i>
                            寻物启事</el-menu-item>
                        <el-menu-item index="/my/love">
                            <i class="el-icon-message"></i>
                            表白墙</el-menu-item>
                        <el-menu-item index="/my/xx">
                            <i class="el-icon-lock"></i>
                            XXX</el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                   <div class="nav">
                       <el-breadcrumb separator-class="el-icon-arrow-right">
                           <el-breadcrumb-item class="me-btn"><i class="el-icon-s-fold"></i></el-breadcrumb-item>
                           <el-breadcrumb-item>个人中心</el-breadcrumb-item>
                           <el-breadcrumb-item>我的消息</el-breadcrumb-item>
                       </el-breadcrumb>

                       <div class="right-menu">
                           <el-dropdown
                                   class="me-icon">
                               <el-avatar :src="avatar"></el-avatar>
                               <el-dropdown-menu slot="dropdown">
                                   <router-link to="/">
                                       <el-dropdown-item>首页</el-dropdown-item>
                                   </router-link>
                                   <el-dropdown-item ><el-button type="text" @click="logout">退出登录</el-button></el-dropdown-item>
                               </el-dropdown-menu>
                           </el-dropdown>
                       </div>
                   </div>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "UserCenter",
        data(){
            return{

            }
        },
        computed:{
            ...mapGetters([
                'avatar',
                'user',
                'isline'
            ]),

        },
        methods:{
            logout(){
                this.$store
                    .dispatch("Logout").then(res =>{
                        if (res.status ===200){
                            this.$router.push("/")
                        }
                })
            }
        }
    }
</script>

<style scoped>
@import "../../assets/css/index.css";
    h2{
        width: 250px;
        margin-right: 10px;
        ont-family: verdana, sans-serif;
        color: #0DBF7B;
        font-size: 22px;
        font-weight: bold;
        letter-spacing: 3pt;
        word-spacing: 1.2pt;
        line-height: 0.8;
    }
    .nav{
        height: 50px;
        overflow: hidden;
        position: relative;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);
    }

    .me-btn{
        height: 100%;
        font-size: 20px;
        cursor: pointer;
        transition: background .3s;
        -webkit-tap-highlight-color: transparent;
    }
    .me-icon{
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;
    }
    .right-menu{
        float: right;
        margin-top: -22px;
        margin-right: 10px;
    }
h1{
    width: 250px;
    margin-right: 10px;
    ont-family: verdana, sans-serif;
    color: #0DBF7B;
    font-size: 22px;
    font-weight: bold;
    letter-spacing: 3pt;
    word-spacing: 1.2pt;
    line-height: 2.8;

}
</style>
