<template>
    <!--管理员后台-->
    <div>
        <el-container>
            <el-header class="me-admin-nav">
                <h1 style="margin-top: 12px">小主招领后台管理</h1>
                <div>
                    <el-menu
                            background-color="#304156"
                    >
                        <el-menu-item>
                            <el-dropdown>
                                <el-avatar :src="avatar"></el-avatar>
                                <i class="el-icon-arrow-down"></i>
                                <el-dropdown-menu slot="dropdown">
                                    <router-link to="/my/info">
                                        <el-dropdown-item>信息修改</el-dropdown-item>
                                    </router-link>
                                    <el-dropdown-item @click.native="Logout">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-menu-item>
                    </el-menu>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu router
                             style="overflow: hidden"
                             background-color="#304156"
                             text-color="#8cabbc"

                    >
                       <el-submenu index="gm" >
                           <template slot="title">会员管理</template>
                           <el-menu-item index="/admin/member">
                               会员列表
                           </el-menu-item>
                       </el-submenu>

                        <el-submenu index="gd">
                            <template slot="title">物品管理</template>
                            <el-menu-item index="/admin/goods">物品列表</el-menu-item>
                            <el-menu-item index="/admin/type">物品类型</el-menu-item>
                        </el-submenu>
                        <el-submenu index="lo">
                            <template slot="title">告白管理</template>
                            <el-menu-item index="/admin/love">告白列表</el-menu-item>
                        </el-submenu>
                        <el-submenu index="sys">
                            <template slot="title">系统管理</template>
                            <el-menu-item index="/admin/lb">轮播图</el-menu-item>
                            <el-menu-item index="/admin/notice">系统公告</el-menu-item>
                            <el-menu-item index="/admin/about">关于我们</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "Index",
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
            async Logout(){
                this.$store
                    .dispatch("Logout")
                    .then(res =>{
                        if (res.status ===200){
                            this.$router.push("/")
                        }
                    })
            },
        }
    }
</script>

<style scoped>
@import "../../assets/css/admin.css";
    h1{
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
    .me-admin-nav{
        background-color: #304156;
    }
    .el-aside{
        background-color: #304156;
    }
</style>
