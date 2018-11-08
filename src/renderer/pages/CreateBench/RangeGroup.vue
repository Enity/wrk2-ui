<template>
    <div class='rangeGroup'>
        <div class='row'>
            <span class='label'>{{ label }}</span>
            <Input 
                v-model='vmodel'
                :width='inputWidth'
                :centered='true'
            />
        </div>
        <div class='row'>
            <RangeSlider
                :min='min'
                :max='max'
                :step='step'
                width='100%'
                v-model='vmodel'
            />
        </div>
    </div>
</template>

<script>
import Input from '@/components/Input';
import RangeSlider from '@/components/RangeSlider/RangeSlider';

export default {
    props: {
        label: String,
        value: [String, Number],
        min: String,
        max: String,
        step: String,
        inputWidth: String
    },
    computed: {
        vmodel: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', Number(value));
            }
        }
    },
    components: { Input, RangeSlider }
};
</script>

<style scoped>
.rangeGroup {
    width: 100%;
}

.row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.row:not(:first-child) {
    margin-top: 12px;
}

.row .label {
    margin-left: 5px;
    user-select: none;
}
</style>
