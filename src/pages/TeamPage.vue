<template>
  <div id="teamPage">
    <div class="search-bar">
      <van-search v-model="searchText" placeholder="搜索房间" @search="onSearch"/>
      <van-button class="add-button" type="primary" icon="plus" round @click="toAddTeam"/>
    </div>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="0"/>
      <van-tab title="加密" name="2"/>
      <van-tab title="私有" name="1"/>
    </van-tabs>
    <div class="card-body">
      <friend-card-list v-if="teamList.length > 0" :status="parseInt(active)" :teamList="teamList"/>
      <van-empty v-if="teamList.length === 0" description="暂无聊天室"/>
    </div>
    <van-loading class="loading" v-show="isLoading">加载中...</van-loading>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import request from "../plugins/request";
import {showFailToast} from "vant";
import FriendCardList from "../components/FriendCardList.vue";

const active = ref('0')
const isDataEmpty = ref(false)
const isLoading = ref(true)
const router = useRouter();
const teamList = ref([]);
const activeOption = [
  {text: '公开', value: 0},
  {text: '加密', value: 2},
  {text: '私有', value: 1},
];
const searchText = ref("")

const onTabChange = () => {
  isLoading.value = true;
  listTeam(active.value);
  isLoading.value = false;
}

onMounted(() => {
  listTeam();
  isLoading.value = false;
})

const onSearch = (val: string | undefined) => {
  isLoading.value = true;
  listTeam(active.value, val);
  isLoading.value = false;
};

const toAddTeam = () => {
  router.push({
    path: "/team/add"
  })
}

const listTeam = async (status = '0', searchText = '') => {
  await request.get("/team/list", {
    params: {
      pageNum: 1,
      status,
      searchText
    },
  }).then(res => {
    if (res?.code === 0) {
      teamList.value = res?.data ? res?.data : [];
      if (teamList.value.length < 1) {
        isDataEmpty.value = true;
      }
    } else {
      teamList.value = []
      showFailToast(res?.message)
    }
  })
}
</script>

<style scoped>
#teamPage {
  padding: 10px;
  background-color: #f7f8fa;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.search-bar .van-search {
  flex-grow: 1;
  margin-right: 10px;
}

.add-button {
  background-color: #390dff;
  border-color: #390dff;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 15px;
  padding-top: 10px;
}

.van-tab {
  font-weight: bold;
  color: #333;
}

.loading {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.van-empty {
  margin-top: 20px;
}

.van-tabs__nav {
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 10px;
}

.van-button--primary {
  background-image: linear-gradient(to right, #390dff, #390dff);
}
</style>
