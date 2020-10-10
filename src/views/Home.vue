<template>
  <div class="home">
    <el-container>
      <!--头部内容-->
      <el-header>
        <div class="me-nav">
          <!--标题-->
          <h1>小主校园招领平台</h1>
         <div class="me-menu">
           <el-menu
                   default-active="/index"
                   mode="horizontal"
                   router
                   background-color=""
                   text-color="#8cc4fd"
                   active-text-color="#409EFF"

           >
             <el-menu-item
                     class="me-nav-font"
                      index="/index"
             >
               首页
             </el-menu-item>
             <el-menu-item index="/lost" class="me-nav-font">
               寻物启事
             </el-menu-item>
             <el-menu-item index="/take" class="me-nav-font">
               招领启事
             </el-menu-item>
             <el-menu-item index="/love" class="me-nav-font">
               留言墙
             </el-menu-item>
             <el-menu-item index="/about" class="me-nav-font">
               关于我们
             </el-menu-item>
           </el-menu>
           <el-menu
            mode="horizontal"
            background-color=""
            text-color="#409EFF"
            active-text-color="#E6A23C"
           >
             <el-menu-item>
               <el-dropdown
                   trigger="click"
                   class="me-nav-font"
               >
                <span class="me-font-color me-hover">
                  发布启示<i class="el-icon-arrow-down el-icon--right me-font-color"></i>
                </span>
                 <el-dropdown-menu slot="dropdown">
                   <router-link to="/set/lost">
                     <el-dropdown-item class="me-font-color me-hover">发布启事</el-dropdown-item>
                   </router-link>
                   <router-link to="/set/take">
                     <el-dropdown-item class="me-font-color me-hover">我要留言</el-dropdown-item>
                   </router-link>
                 </el-dropdown-menu>
               </el-dropdown>
             </el-menu-item>

             <el-menu-item>
               <router-link to="/login" v-if="isline">
                 <span class="me-nav-font me-font-color me-hover">登录/注册</span>
               </router-link>
               <el-dropdown v-else>
                <span class="el-dropdown-link">
                  <el-avatar :title="isline ? user.nickName:''" shape="square" :size="48" :src="avatar"></el-avatar>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                 <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item  class="me-font-color me-hover" @click.native="go">
                        <span>个人中心</span>
                    </el-dropdown-item>
                   <el-dropdown-item  class="me-font-color me-hover" @click.native="Logout">
                       <span>退出登录</span>
                   </el-dropdown-item>
                 </el-dropdown-menu>
               </el-dropdown>
             </el-menu-item>
           </el-menu>
         </div>
        </div>

      </el-header>
      <!--主体内容-->
      <el-main>
        <router-view></router-view>
      </el-main>
      <!--底部内容-->
      <el-footer>
       <div style="text-align: center">
        @copyright : {{config.copyrightYear}} | 版本 : {{config.version}} | 作者 : {{config.author}} | 版权为 : {{config.address}} | QQ : {{config.qq}}
       </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
import {logout} from '@/api/login/login'
import request from '@/utils/request'
export default {
  name: 'Home',
  components: {
  },
  data(){
    return {
        config:{}
    }
  },
    created(){
      this.getConfig();
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
        getConfig(){
          request({
              url: '/index/config',
              method: 'get'
          }).then(res =>{
              if (res.status ===200){
                  this.config = res.data
              }
          })
        },
        go(){
            if (this.user.isAdmin ===1){
                this.$router.push("/admin")
            }else {
                this.$router.push("/my/info")
            }
        }
    }
}
</script>

<style scoped>
  @import "../assets/css/index.css";
  .me-nav h1{
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
  .me-menu{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
</style>
