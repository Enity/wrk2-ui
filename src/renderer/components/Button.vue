<template>
    <button
        class='btn'
        :class='classComp'
        @click='$emit("click")'
    >
        <span v-if='type === "dashes"'>...</span>
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'flat'
        }
    },
    computed: {
        classComp() {
            return {
                'flat': this.type === 'flat',
                'dashes': this.type === 'dashes'
            };
        }
    }
};
</script>

<style scoped lang='scss'>
.btn {
    font-size: 24px;
    cursor: pointer;
    transition: .15s ease-out;
    user-select: none;
}

.flat {
    color: #F9CB3B;
    background: transparent;
    border: none;
    outline: none;
    &:hover {
        color: rgb(255, 163, 43);
    }
    &:active {
        text-shadow: 0 0 4px rgb(255, 163, 43);
    }
}

.dashes {
    background: transparent;
    border: none;
    outline: none;
    position: relative;
    height: 20px;
    width: 25px;
    color: #6A6A6A;
    & > span {
        pointer-events: none;
        position: absolute;
        top: -7px;
        left: 0;
        height: 0.5em;
        font-size: 26px;
        font-weight: bold;
    }
    &:hover {
        color: #cacaca;
    }
}
</style>
