<template>

    <div class="box">
        <div class="left"></div>
        <div class="right">
            <h4>登录</h4>
            <el-form :model="form" :rules="rules" ref="formRef">

                <el-form-item class="acc" prop="username">
                    <el-input v-model="form.username" placeholder="用户名">
                        <template #prefix>
                            <el-icon><User /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item class="acc" prop="password">
                    <el-input v-model="form.password" type="password" placeholder="密码">
                        <template #prefix>
                            <el-icon><Lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item class="submit"  style="display: block; text-align: center;">
                    <button  @click="onSubmit" :disabled="loading">
                        <span v-if="loading">登录中...</span>
                        <span v-else>Login</span>
                    </button>
                </el-form-item>

            </el-form>

            



            <div class="fn">
                <el-button type="text" @click="router.push('/register')">注册账号</el-button>
                <el-button type="text" @click="router.push('/forget')">找回密码</el-button>
            </div>
        </div>
    </div>

</template>

<script  setup>
    import { reactive, ref ,onMounted,onBeforeUnmount } from 'vue'
    import { toast } from '~/composables/util'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'


    const store = useStore()
    const router = useRouter()




    const form = reactive({
        username:"",
        password:""
    })

    const rules = {
        username:[
            {
                required:true,
                message:'用户名不能为空',
                trigger:'blur'
            },
        ],
        password:[
            {
                required:true,
                message:'密码不能为空',
                trigger:'blur'
            },
        ]
    }

    const formRef=ref(null)
    const loading=ref(false)


    const onSubmit = () => {
        formRef.value.validate((valid)=>{
            if(!valid){
                return false
            }

            loading.value=true

            store.dispatch("login",form).then(res=>{
                toast("登录成功")
                router.push("/")
            }).finally(()=>{
                loading.value=false
            })


        })
    }


function onKeyUp(e){
        onSubmit()
}


</script>

<style>

@import '~/assets/css/index.css';

</style>

<style scoped>


/* 
.login-container{
    @apply min-h-screen bg-indigo-500;
}
.login-container .left,.login-container .right{
    @apply flex items-center justify-center flex-col;
}
.login-container .right{
    @apply bg-light-50  flex-col;
}
.left>div>div:first-child{
    @apply text-left font-bold text-5xl text-light-50 mb-4;
}
.left>div>div:last-child{
    @apply text-gray-200 text-sm;
}
.right .title{
    @apply font-bold text-3xl text-gray-800;
}
.right>div:first-child{
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}
.right .line{
    @apply h-[1px] w-16 bg-gray-200;
} 
*/
</style>