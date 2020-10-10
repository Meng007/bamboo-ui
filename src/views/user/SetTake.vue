<template>
    <!--发布招领启事-->
    <div>
        <el-card>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item >发布启示</el-breadcrumb-item>
                <el-breadcrumb-item >感谢</el-breadcrumb-item>
            </el-breadcrumb>

            <el-row type="flex" justify="center">
                <el-col :span="20">
                    <el-form label-position="left" label-width="80px">
                        <el-form-item label="标题">
                            <el-input ></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "SetTake"
    }
</script>

<style scoped>

</style>
