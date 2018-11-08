<template>
    <div>
        <BenchList :list='benchmarks'/>
    </div>
</template>

<script>
import BenchList from '@/components/BenchList/BenchList';
import { ActionsEnum } from '@root/enums';
import { mapState, mapActions } from 'vuex';

export default {
    components: { BenchList },
    mounted() {
        this[ActionsEnum.SUBSCRIBE]();
    },
    computed: {
        ...mapState([
            'benchmarks'
        ])
    },
    methods: {
        ...mapActions([
            ActionsEnum.SUBSCRIBE
        ])
    }
};
</script>

<style>
</style>
