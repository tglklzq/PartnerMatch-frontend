<template>
    <div @click="toTeamDetail(team)" class="body-card" v-for="(team,index) in teamList" :key="team.teamId">
        <div class="card-img"
             :style="{ background: `no-repeat url(${team.teamImage})`, backgroundSize: '100% 100%' }"></div>
        <div class="card-content">
            <div class="team-info">
                <div class="singe-line box" :title="team.name">
                    {{ team.name }}
                </div>
                <div class="sine-line-number">
                    <img class="team-icon" :src="team.joinNum === team.maxNum ? fullTeamIcon : teamIcon"/>
                    <span class="team-size">{{ team.joinNum }} / {{ team.maxNum }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {TeamType} from "@/models/team";

import teamIcon from "../assets/images/team-icon.png";
import fullTeamIcon from "../assets/images/full-team-icon.png";
import {useRouter} from "vue-router";

interface FriendCardListProps {
    teamList?: TeamType[],
    status?: number
}

const props = withDefaults(defineProps<FriendCardListProps>(), {
    // @ts-ignore
    teamList: [] as TeamType[],
    status: 0
});

const router = useRouter();


const toTeamDetail = async (team: any) => {
    if (team.hasJoin) {
        await router.push({
            name: 'userChat',
            params: {
                toUserId: team.teamId,
                receiveType: 1,
                status: props.status
            }
        })
    } else {
        await router.push({
            path: '/team/detail',
            query: {
                team: encodeURIComponent(JSON.stringify(team))
            }
        })
    }

}

</script>
<style scoped>
.body-card {
    float: left;
    margin: 10px 10px;
    display: flex;
    flex-direction: column;
    width: 150px;
    border-radius: 15px;
    box-shadow: 1px 1px 1px #888;
    overflow: hidden;
}

.card-img {
    height: 160px;
    width: 100%;
    border-radius: 10px;
}

.card-content {
    display: flex;
    flex-direction: column;
    position: relative;
}

.team-info {
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    border-radius: 0 0 15px 15px;
}

.sine-line-number {
    padding: 0 0 0 8px;
}
.team-icon {
    height: 20px;
    margin-top: -5px;
    margin-right: 8px;
}

.team-size {
    font-size: 16px;
    font-weight: bold;
}

.singe-line {
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    white-space: nowrap;
}

.box {
    padding: 0 0 10px 8px;
}
</style>
