<template>
    <div 
        class="bench"
        @click='$emit("click", id)'
    >
        <div class="target">
            {{ data.target }}
        </div>
        <div
            :style='innerStyle'
            class="inner">
        </div>
        <span
            @click='emit("cancel", id)'
            class='cancelBtn'
        ></span>
    </div>
</template>

<script>
export default {
    props: {
        id: String,
        data: Object,
        state: Object
    },
    computed: {
        innerStyle() {
            return {
                'width': this.state.finished ? '100%' : this.state.progress + '%',
                'background-color': this.state.finished ? '#2A742D' : '#937415'
            };
        }
    }
};
</script>

<style scoped lang='scss'>
.bench {
    width: 100%;
    height: 26px;
    user-select: none;
    display: flex;
    padding: 0 5px;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 4px;
    cursor: pointer;
    background-color: #333333;
}

.target {
    z-index: 5;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.inner {
    position: absolute;
    left: 0;
    top: 0;
    border-radius: inherit;
    transition: width .5s ease-out;
    height: 100%;
}

.cancelBtn {
    position: absolute;
    width: 10px;
    height: 5px;
    right: 10px;
    top: 50%;
    &:before, &:after {
        content: '';
        position: absolute;
        height: 2px;
        width: 15px;
        background-color: #333;
    }
    &:before {
        transform: rotate(138deg);
    }
    &:after {
        transform: rotate(-138deg);
    }
}
</style>
