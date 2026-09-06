<template>
    <!-- 头部 -->
    <div class="f-header">

        <span class="logo">
            <el-icon>
                <ElemeFilled />
            </el-icon>
            标题
        </span>

        <el-icon class="icon-btn">
            <Fold />
        </el-icon>

        <el-tooltip effect="dark" content="刷新" placement="bottom">
            <el-icon class="icon-btn" @click="handleRefresh">
                <Refresh />
            </el-icon>
        </el-tooltip>

        <div class="ml-auto flex items-center"> <!-- style="margin: auto;" -->

            <el-tooltip effect="dark" content="全屏" placement="bottom">
                <el-icon class="icon-btn" @click="toggle">
                    <FullScreen v-if="!isFullscreen" />
                    <Aim v-else />
                </el-icon>
            </el-tooltip>

            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex items-center text-light-50">
                    <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>

        <el-drawer v-model="showDrawer" title="修改密码" size="45%" :close-on-click-modal="false">

            <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" size="small">

                <el-form-item prop="oldpassword" label="旧密码">
                    <el-input v-model="form.oldpassword" placeholder="请输入旧密码">
                    </el-input>
                </el-form-item>

                <el-form-item prop="password" label="新密码">
                    <el-input type="password" v-model="form.password" placeholder="请输入新密码" show-password>
                    </el-input>
                </el-form-item>

                <el-form-item prop="repassword" label="确认密码">
                    <el-input type="password" v-model="form.repassword" placeholder="请输入确认密码" show-password>
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
                </el-form-item>

            </el-form>

        </el-drawer>

        <!-- {{ $store.state.user }} -->
        <!-- {{ $store.state.user.avatar }}  -->
        <!-- $store.state.user.avatar 图片已删除https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/62af03d1b2aeb.jpg -->
    </div>
</template>

<script setup>

import { ref, reactive } from 'vue'
import { logout,updatepassword } from '~/api/manager';
import { showModal, toast } from '~/composables/util';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useFullscreen } from '@vueuse/core'

const {
    //是否全屏状态
    isFullscreen,
    //切换全屏
    toggle
} = useFullscreen()


const router = useRouter()
const store = useStore()
//修改密码
const showDrawer = ref(false)

const form = reactive({
    oldpassword: "",
    password: "",
    repassword: ""
})

const rules = {
    oldpassword: [
        {
            required: true,
            message: '旧密码不能为空',
            trigger: 'blur'
        },
        // {
        //     min:3,
        //     max:5,
        //     message:'用户名长度必须是3-5个字符',
        //     trigger:'blur'
        // }
    ],
    password: [
        {
            required: true,
            message: '新密码不能为空',
            trigger: 'blur'
        },
    ],
    repassword: [
        {
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur'
        },
    ]
}

const formRef = ref(null)
const loading = ref(false)


const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return false
        }

        loading.value = true
        updatepassword(form)
        .then(res => {
            toast("修改密码成功，请重新登录")
            store.dispatch("logout")
            //跳转回登录页
            router.push("/login")
        })
        .finally(() => {
            loading.value = false
        })


    })
}


const handleCommand = (c) => {
    // console.log(c)
    switch (c) {
        case "logout":
            handleLogout()
            break;
        case "rePassword":
            // console.log("修改密码")
            showDrawer.value = true
            break;
    }
}

//刷新
const handleRefresh = () => location.reload()


function handleLogout() {
    showModal("是否要退出登录?").then(res => {
        // console.log("退出登录")
        logout()
            .finally(() => {
                //移除cookie里的token //清除当前用户状态vuex
                store.dispatch("logout")
                //跳转回登录页
                router.push("/login")
                //提示退出登录成功
                toast("退出登录成功")
            })
    })
        .catch(
        //点击取消
    )
}





</script>

<style>
.f-header {
    @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 right-0 left-0;
    height: 64px;
}

.logo {
    width: 250px;
    @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
}

.icon-btn:hover {
    @apply bg-indigo-600
}

.f-header .dropdown {
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center mx-5;
}
</style>