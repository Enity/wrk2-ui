<template>
    <div>
        <h1>Benchmarking Tool</h1>
        <div>
            <label for=''>Адрес</label>
            <input v-model='form.target' type='text'>
            <label for=''>Потоки</label>
            <input v-model='form.threads' type='text'>
            <label for=''>Соединения</label>
            <input v-model='form.connections' type='text'>
            <label for=''>Запросы в секунду</label>
            <input v-model='form.requests' type='text'>
            <label for=''>Длительность</label>
            <input v-model='form.duration' type='text'>
            <button @click='begin'>СТАРТ</button>
        </div>
        <h1>Started</h1>
        <div 
            v-for="b of benchmarksStarted"
            :key='b.id'
        >
            <span>{{ b.id }}</span>
            <span>{{ b.result }}</span>
            <hr />
        </div>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron';

export default {
    data() {
        return {
            benchmarksStarted: [],
            form: {
                target: 'http://localhost/phpmyadmin/',
                threads: '1',
                connections: '5',
                requests: '5',
                duration: '5'
            }
        };
    },
    mounted() {
        ipcRenderer.on(EventsEnum.BENCH_STARTED, (event, { id, duration }) => {
            this.benchmarksStarted.push({ id, duration });
        });

        ipcRenderer.on(EventsEnum.BENCH_FINISHED, (event, { id, result }) => {
            this.benchmarksStarted = this.benchmarksStarted.map(item => {
                if (item.id === id) {
                    item.result = result;
                }
                return item;
            });
        });
    },
    methods: {
        begin() {
            ipcRenderer.send(EventsEnum.START_BENCH, this.form);
        }
    }
};
</script>

<style scoped>
input {
    display: block;
}
</style>
