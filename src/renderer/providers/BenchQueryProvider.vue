<template>
    <div>
        <BenchQuery
            :list='benchmarks'
            @selected='benchSelected'
        />
    </div>
</template>

<script>
import BenchQuery from '@/components/BenchQuery/BenchQuery';
import { ActionsEnum } from '@root/enums';
import { mapState, mapActions } from 'vuex';

export default {
    components: { BenchQuery },
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
