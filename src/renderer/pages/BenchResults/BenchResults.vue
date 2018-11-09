<template>
    <div class='benchResults'>
        <ResultCard
            v-for='b of benchmarks'
            :key='b.id'
            :data='b.data'
            :state='b.state'
            :result='b.result'
        />
    </div>
</template>

<script>
import ResultCard from './ResultCard';
import { mapState } from 'vuex';

export default {
    components: { ResultCard },
    computed: {
        ...mapState([
            'benchmarks'
        ])
    }
};
</script>

<style scoped lang='scss'>
.benchResults {
    > div:not(:first-child) {
        margin-top: 15px;
    }
}
</style>
