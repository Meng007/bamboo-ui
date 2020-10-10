<template>
    <!--我的表白墙-->
    <div>
        <el-card>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item >个人中心</el-breadcrumb-item>
                <el-breadcrumb-item >表白墙</el-breadcrumb-item>
            </el-breadcrumb>


        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Love"
    }
</script>

<style scoped>

</style>
