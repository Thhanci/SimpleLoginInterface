<template>
    <div>
        <!-- 后台首页 -->

        <!-- {{ $store.state.user.username }} -->
        <Fclassify />


         
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import Fclassify from '~/layouts/Fclassify.vue'

const store = useStore()



</script>


