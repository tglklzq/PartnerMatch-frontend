<template>
  <div class="card-message" @click="toMessagePage">
    <van-image
        class="card-message-avatar"
        :src="message.avatarUrl"
        alt=""
    />
    <div class="card-message-text">
      <div class="card-message-name">{{ message.userName }}</div>
      <div class="card-message-content">{{ message.content }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { MessageType } from "../models/message";

const router = useRouter();

interface MessageCardListProps {
  message: MessageType;
  loading: boolean;
}

const props = withDefaults(defineProps<MessageCardListProps>(), {
  message: undefined,
  loading: true,
});

const toMessagePage = () => {
  //console.log("props.message-----", props.message);
  router.push({
    name: "userChat",
    params: {
      toUserId:
          props.message.receiveType === 1
              ? props.message.receiveUserId
              : props.message.sendUserId,
      receiveType: props.message.receiveType,
      status: 0,
    },
  });
};
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#content {
  padding-bottom: 50px; /* 确保内容区域不会覆盖tabber */
}

.card-message {
  display: flex;
  background-color: #f7f8fa;
  border-radius: 8px;
  width: 100%;
  margin: 10px 0;
  padding: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
  transition: background-color 0.3s ease;
  cursor: pointer;
  box-sizing: border-box;
}

.card-message:hover {
  background-color: #E7EFE6FF;
}

.card-message-avatar {
  display: block;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  margin-right: 12px;
}

.card-message-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-message-name {
  font-weight: 600;
  font-size: 16px;
  color: #333;
  margin-bottom: 4px;
}

.card-message-content {
  font-size: 14px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
