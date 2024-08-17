<template>
    <form action="/">
        <van-search
            v-model="searchText"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
        >
            <template #action>
                <div type="primary" @click="doSearchResult">搜索</div>
            </template>
        </van-search>
    </form>
    <van-divider content-position="left">已选标签</van-divider>
    <div v-if="activeIds.length === 0">请选择标签</div>
    <van-row :gutter="16">
        <van-col v-for="tag in activeIds" style="padding: 5px 10px 5px 0px">
            <van-tag closeable size="medium" type="primary" @close="close(tag)">
                {{ tag }}
            </van-tag>
        </van-col>
    </van-row>
    <van-divider content-position="left">选择标签</van-divider>
    <van-tree-select
        v-model:active-id="activeIds"
        v-model:main-active-index="activeIndex"
        :items="tagList"
        style="width: 100%; height: 100%; position: fixed"
    />

</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

const searchText = ref('');
// 已选中的标签
const activeIds = ref([]);
// 父级标签
const activeIndex = ref(0);
// router
const router = useRouter();
// 标签集合
const originTextList = [
    {
        text: '性别',
        children: [
            {text: '男', id: '男'},
            {text: '女', id: '女'},
        ],
    },
    {
        text: '语言',
        children: [
            {text: 'c++', id: 'c++'},
            {text: 'python', id: 'python'},
            {text: 'java', id: 'java'},
            {text: 'go', id: 'go'}
        ],
    }
]
const tagList = ref(originTextList);
const onSearch = (val) => {
    router.push({
        path: '/user/list',
        query: {
            tags: activeIds.value,
            username: searchText.value
        }
    })
};
const onCancel = () => {
    searchText.value = ''
    tagList.value = originTextList
}
const close = (tag) => {
    activeIds.value = activeIds.value.filter(item => {
        return item !== tag
    })
}

const doSearchResult = () => {
    router.push({
        path: '/user/list',
        query: {
            tags: activeIds.value,
            username: searchText.value
        }
    })
}
</script>

<style lang="scss" scoped>
</style>
