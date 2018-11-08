<template>
    <div class='benchResults'>
        <ResultCard
            v-for='b of benchmarks'
            :key='b.id'
            :finished='b.finished'
            :target='b.target'
            :connections='b.connections'
            :duration='b.duration'
            :requests='b.requests'
            :threads='b.threads'
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

<style scoped>
.benchResults > div:not(:first-child) {
    margin-top: 15px;
}
</style>
