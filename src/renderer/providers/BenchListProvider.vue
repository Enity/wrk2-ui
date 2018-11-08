<template>
    <div>
        <BenchList/>
    </div>
</template>

<script>
import { EventsEnum } from '@root/enums/EventsEnum';
import { ipcRenderer } from 'electron';
import BenchList from '@/components/BenchList/BenchList';

export default {
    components: { BenchList },
    methods: {
        subscribe() {
            ipcRenderer.on(EventsEnum.BENCH_STARTED, (event, benchData) => {
                console.log(benchData);
            });
        }
    }
};
</script>

<style>
</style>
