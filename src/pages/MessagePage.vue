<template>
  <div class="card-body">
    <message-card-list v-if="messageList.length > 0" v-for="message in messageList" :message="message"
                       :key="message.messageId"
                       :loading="loading"/>
    <van-empty v-if="messageList.length === 0" description="暂无消息"/>
  </div>
</template>

<script lang="ts" setup>

import MessageCardList from "../components/MessageCardList.vue";
import {useRouter} from "vue-router";
import {onMounted, ref, onUnmounted} from "vue";
import {getMessageList} from "../services/message";

const router = useRouter();
const messageList = ref([]);
const loading = ref(true);
const pollInterval = 1000; // 设置轮询间隔时间（毫秒）
let intervalId: NodeJS.Timeout;

const fetchMessages = async () => {
  loading.value = true;
  await getMessageList().then((res) => {
    if (res.code === 0) {
      messageList.value = res.data;
    }
    loading.value = false;
  });
};

onMounted(async () => {
  await fetchMessages();
  // 开始轮询
  intervalId = setInterval(fetchMessages, pollInterval);
});

// 清除定时器
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});

</script>

<style scoped>
</style>
