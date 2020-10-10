<template>
    <!--关于我们-->
    <div>
        <el-row type="flex" justify="center">
            <el-col :span="20">
                <el-card>
                    <div v-html="about.content"></div>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import request from "@/utils/request"
    export default {
        name: "About",
        data(){
            return{
                about:{}
            }
        },
        created(){
          this.getAbout()
        },
        methods:{
            getAbout(){
                request({
                    url: '/index/about',
                    method: 'get'
                }).then(res =>{
                    if (res.status ===200){
                        this.about = res.data
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
