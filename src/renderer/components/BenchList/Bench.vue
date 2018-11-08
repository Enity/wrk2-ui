<template>
    <div class="bench">
        <div class="target">{{ target }}</div>
        <div :style='innerStyle' class="inner"></div>
    </div>
</template>

<script>
export default {
    props: {
        target: String,
        error: Boolean,
        finished: Boolean,
        progress: Number
    },
    computed: {
        innerStyle() {
            return {
                'width': this.finished ? '100%' : this.progress + '%',
                'background-color': this.finished ? '#2A742D' : '#937415'
            };
        }
    }
};
</script>

<style>
.bench {
    width: 100%;
    height: 26px;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 4px;
    cursor: pointer;
    background-color: #333333;
}

.target {
    z-index: 5;
}

.inner {
    position: absolute;
    left: 0;
    top: 0;
    border-radius: inherit;
    height: 100%;
}
</style>
