<template>
    <input
        class='input'
        :class='styles'
        :style='{ width }'
        :type='type'
        :value='value'
        @input='$emit("input", $event.target.value)'
    />
</template>

<script>
export default {
    props: {
        value: [String, Number],
        type: {
            type: String,
            default: 'text'
        },
        centered: Boolean,
        width: {
            type: String,
            default: '210px'
        }
    },
    computed: {
        styles() {
            return {
                'centered': this.centered
            };
        }
    }
};
</script>

<style scoped>
.input {
    background: #202020;
    border: none;
    border-radius: 5px;
    padding: 0 10px;
    height: 32px;
    font-family: inherit;
    font-size: 16px;
    color: inherit;
}

.centered {
    text-align: center;
}
</style>
