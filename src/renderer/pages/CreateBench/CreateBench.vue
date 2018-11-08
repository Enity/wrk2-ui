<template>
    <div class='createBenchForm'>
        <span>TARGET</span>
        <input type="text" v-model="formData.target">
        <span>Duration (sec)</span>
        <input type="text" v-model="formData.duration">
        <RangeSlider
            min="10"
            max="500"
            step="5"
            v-model="formData.duration"
        />
        <span>Connections</span>
        <input type="text" v-model="formData.connections">
        <RangeSlider
            min="1"
            max="1000"
            step="50"
            v-model="formData.connections"
        />
        <span>Requests/second</span>
        <input type="text" v-model="formData.requests">
        <RangeSlider
            min="100"
            max="5000"
            step="100"
            v-model="formData.requests"
        />
        <button @click='begin'>
            BEGIN
        </button>
    </div>
</template>

<script>
import RangeSlider from '@/components/RangeSlider/RangeSlider.vue';
import { EventsEnum } from '@root/enums/EventsEnum';
import { ipcRenderer } from 'electron';

export default {
    data() {
        return {
            formData: {
                target: 'http://',
                threads: 2,
                duration: 30,
                connections: 300,
                requests: 2000
            }
        };
    },
    methods: {
        begin() {
            ipcRenderer.send(EventsEnum.START_BENCH, this.formData);
        }
    },
    components: { RangeSlider }
};
</script>

<style scoped> 
.createBenchForm {
    text-align: center;
}
</style>
