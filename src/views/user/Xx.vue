<template>
    <!--xx-->
    <div>
        <el-card>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item >个人中心</el-breadcrumb-item>
                <el-breadcrumb-item >我的xxx</el-breadcrumb-item>
            </el-breadcrumb>
            <!--background-image: ;-->
            <Aplayer :music="mc" showLrc :theme="'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)'"  fixed ></Aplayer>
        </el-card>
    </div>
</template>

<script>
    import Aplayer from 'vue-aplayer'
    export default {
        name: "Xx",
        components:{
           // Player
            Aplayer
        },
        data(){
            return{
                mc:{
                    title: 'love',
                    artist: 'xs',
                    src: require('@/assets/xs/love.mp3'),
                    pic: require('@/assets/xs/xs.jpg'),
                    lrc: '[00:22.510]不太懂爱情是什么\n[00:26.400]万万没想到就这样接近我\n[00:31.380]连我的心在爱情面前无法按照我的意愿来\n[00:40.70]早知道这样\n[00:44.680]我当初就不会开始的\n[00:49.560]像傻瓜一样到现在我才后悔着\n[00:58.820]我祈祷着不要爱上你\n[01:03.720]祈祷着绝对不是你\n[01:08.550]你说这不是爱情，无数次骗我\n[01:16.980]希望只是短暂的擦肩而过的缘分\n[01:22.120]不然只会给我留下伤口\n[01:26.830]但是明明知道结果，还是我还是想得到你的一切\n[01:37.890]所以会经常感到伤心\n[01:56.640]简单的想着\n[02:00.190]应该是错误的开始\n[02:05.160]我以为可以随时叫你\n[02:13.570]我不知道该怎么办不知道从哪里开始错了\n[02:23.430]想着应该要避开这段感情\n[02:27.930]但是你的一切又那么讨人喜欢\n[02:32.840]我祈祷着不要爱上你\n[02:37.570]祈祷着绝对不是你\n[02:42.360]你说这不是爱情，无数次骗我\n[02:50.850]希望只是短暂的擦肩而过的缘分\n[02:55.829]不然只会给我留下伤口\n[03:00.460]但是明明知道结果，还是我还是想得到你的一切\n[03:26.750]现在不是你的话 没有任何意义\n[03:32.320]现在我的心也由不得我了\n[03:37.400]必须忘记你 这个事实让我今天也\n[03:48.320]更难过\n'
                    //lrc: require('@/assets/xs/운명-Why.lrc')
                }
            }
        }
    }
</script>

<style scoped>

</style>
