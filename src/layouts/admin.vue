<template>

    <el-container>
        <el-header><f-header/></el-header>
        
        <el-container>
            <el-aside width="15%" style="background-color: #FFF;" ><f-menu/></el-aside>
            <el-main>
                <f-tag-list/>
                <router-view></router-view>
            </el-main>
        </el-container>
        
    </el-container>

</template>

<script setup>
    import FHeader from './components/FHeader.vue';
    import FMenu from './components/FMenu.vue';
    import FTagList from './components/FTagList.vue';
</script>