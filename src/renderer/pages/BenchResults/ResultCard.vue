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
                {{ data.connections }} connections {{ data.requests }} requests
            </span>
        </div>
        <div class="body">
            {{ JSON.stringify(result)}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: Object,
        state: Object,
        result: Object
    },
    computed: {
        headColor() {
            return this.state.finished ? '#1F4429' : '#44421F';
        }
    }
};
</script>

<style scoped lang='scss'>
.resultCard {
    width: 100%;
    min-height: 200px;
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
}

.target {
    color: #DADADA;
}

.settings {
    color: #ACACAC;
}
</style>
