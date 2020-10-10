<template>
    <!--寻物启事-->
    <div>
        <el-card>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item >个人中心</el-breadcrumb-item>
                <el-breadcrumb-item >寻物启事</el-breadcrumb-item>
            </el-breadcrumb>

            <!--条件搜索-->
            <el-form :inline="true" label-width="68px" style="margin-top: 20px ">
                <el-form-item label="物品名称">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="物品类别">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
                    <el-button icon="el-icon-refresh" size="mini">重置</el-button>
                </el-form-item>
            </el-form>

            <!--功能按钮-->
            <el-row :gutter="10" class="mb8">
                <el-col :span="1.5">
                    <el-button
                            type="primary"
                            icon="el-icon-plus"
                            size="mini"
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

            <!--数据表格-->
            <el-table>
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column label="编号"></el-table-column>
                <el-table-column label="名称"></el-table-column>
                <el-table-column label="类型"></el-table-column>
                <el-table-column label="发布人"></el-table-column>
                <el-table-column label="发布时间"></el-table-column>
                <el-table-column label="状态"></el-table-column>
                <el-table-column label="操作"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Take"
    }
</script>

<style scoped>

</style>
