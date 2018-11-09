<template>
    <button
        class='btn'
        :class='style'
        @click='$emit("click")'
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        type: String
    },
    computed: {
        style() {
            return {
                'flat': this.type === 'flat'
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
</style>
