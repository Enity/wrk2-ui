<template>
    <div class="resultCard">
        <div
            class="head"
            :style='{ background: headColor }'
        >
            <span class="target">
                {{ target }}
            </span>
            <span class="settings">
                {{ duration }} sec {{ threads }} threads
                {{ connections }} connections {{ requests }} requests
            </span>
        </div>
        <div class="body"></div>
    </div>
</template>

<script>
export default {
    props: {
        target: String,
        requests: Number,
        finished: Boolean,
        connections: Number,
        duration: Number,
        threads: Number,
        results: Object
    },
    computed: {
        headColor() {
            return this.finished ? '#1F4429' : '#44421F';
        }
    }
};
</script>

<style scoped>
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
