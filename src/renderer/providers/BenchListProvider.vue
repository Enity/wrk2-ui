<template>
    <div>
        <BenchList
            :list='benchmarks'
            @selected='benchSelected'
        />
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
        ]),

        benchSelected(benchId) {
            this.$router.push('/results');
        }
    }
};
</script>

<style>
</style>
