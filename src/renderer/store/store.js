import Vue from 'vue';
import Vuex from 'vuex';
import { loggerPlugin } from './loggerPlugin';
import { EventsEnum, ActionsEnum } from '@root/enums';
import { ipcRenderer } from 'electron';

Vue.use(Vuex);

const state = {
    benchmarks: []
};

const mutations = {
    createBench(state, benchData) {
        state.benchmarks.unshift(benchData);
    },

    updateBench(state, { id, benchData }) {
        state.benchmarks = state.benchmarks.map(b => {
            if (b.id === id) {
                b = Object.assign(b, benchData);
            }
            return b;
        });
    }
};

const actions = {
    [ActionsEnum.SUBSCRIBE]({ commit }) {
        ipcRenderer.on(EventsEnum.BENCH_STARTED, (event, benchData) => {
            commit('createBench', benchData);
        });

        ipcRenderer.on(EventsEnum.BENCH_TICK, (event, benchData) => {
            commit('updateBench', {
                id: benchData.id,
                benchData
            });
        });

        ipcRenderer.on(EventsEnum.BENCH_FINISHED, (event, benchData) => {
            commit('updateBench', {
                id: benchData.id,
                benchData
            });
        });

        ipcRenderer.on(EventsEnum.BENCH_ERROR, (event, benchData) => {
            commit('updateBench', {
                id: benchData.id,
                benchData
            });
        });
    },

    [ActionsEnum.CREATE_BENCH](context, formData) {
        ipcRenderer.send(EventsEnum.START_BENCH, formData);
    }
};

export default new Vuex.Store({
    plugins: [loggerPlugin],
    state,
    actions,
    mutations
});
