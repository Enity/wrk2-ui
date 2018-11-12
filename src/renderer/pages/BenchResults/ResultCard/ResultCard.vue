<template>
    <div class="resultCard">
        <div
            class="head"
            :style='{ background: headColor }'
        >
            <span class="target">
                {{ data.target }}
            </span>
            <span class="settings">
                {{ data.duration }} sec {{ data.threads }} threads
                {{ data.connections }} connections {{ data.requests }} req/sec
            </span>
        </div>
        <div class="body">
            <div v-if="!state.finished">
                <Loader size='medium'/>
            </div>
            <div v-if="state.finished && state.error">
                <span class='errorMsg'>
                    {{ state.errorMsg }}
                </span>
            </div>
            <Body
                v-if="state.finished && !state.error"
                :result='result'
            />
        </div>
    </div>
</template>

<script>
import Loader from '@/components/Loader';
import Body from './Body';

export default {
    props: {
        data: Object,
        state: Object,
        result: Object
    },
    components: { Loader, Body },
    computed: {
        headColor() {
            if (this.state.error) {
                return '#653232';
            }
            return this.state.finished ? '#1F4429' : '#44421F';
        }
    }
};
</script>

<style scoped lang='scss'>
.resultCard {
    width: 100%;
    background-color: #1D1D1D;
    border: 2px solid #303030;
}

.head {
    height: 35px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    font-size: 14px;
    justify-content: space-between;
    flex-wrap: wrap;
}

.target {
    color: #DADADA;
}

.settings {
    color: #ACACAC;
    font-size: 12px;
}

.body {
    display: flex;
    height: 180px;
    justify-content: center;
    align-items: center;
}

.errorMsg {
    text-align: center;
    font-size: 16px;
}
</style>
