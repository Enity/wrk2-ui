<template>
    <div>
        <BenchList :list='benchmarks'/>
    </div>
</template>

<script>
import { EventsEnum } from '@root/enums/EventsEnum';
import { ipcRenderer } from 'electron';
import BenchList from '@/components/BenchList/BenchList';

export default {
    components: { BenchList },
    data() {
        return {
            benchmarks: []
        };
    },
    mounted() {
        this.subscribe();
    },
    methods: {
        subscribe() {
            ipcRenderer.on(EventsEnum.BENCH_STARTED, (event, benchData) => {
                console.log(benchData);
                this.createNewBench(benchData);
            });

            ipcRenderer.on(EventsEnum.BENCH_TICK, (event, { id, progress }) => {
                this.updateBench(id, { progress });
            });

            ipcRenderer.on(EventsEnum.BENCH_FINISHED, (event, benchData) => {
                this.updateBench(benchData.id, {
                    ...benchData,
                    finished: true
                });
            });
        },

        createNewBench({ id, duration, target }) {
            this.benchmarks.push({
                id,
                duration,
                target,
                progress: 0
            });
        },

        updateBench(id, data) {
            this.benchmarks = this.benchmarks.map(b => {
                if (b.id === id) {
                    b = Object.assign(b, data);
                }
                return b;
            });
        }
    }
};
</script>

<style>
</style>
