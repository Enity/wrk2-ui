import Vue from 'vue';
import Vuex from 'vuex';
import { EventsEnum, ActionsEnum } from '@root/enums';
import { ipcRenderer } from 'electron';

Vue.use(Vuex);

const state = {
    benchmarks: []
};

const mutations = {
    createBench(state, { id, duration, target }) {
        state.benchmarks.push({
            id,
            duration,
            target,
            progress: 0
        });
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

        ipcRenderer.on(EventsEnum.BENCH_TICK, (event, { id, progress }) => {
            commit('updateBench', {
                id,
                benchData: { progress }
            });
        });

        ipcRenderer.on(EventsEnum.BENCH_FINISHED, (event, benchData) => {
            commit('updateBench', {
                id: benchData.id,
                benchData: {
                    ...benchData,
                    finished: true
                }
            });
        });
    },

    [ActionsEnum.CREATE_BENCH](context, formData) {
        ipcRenderer.send(EventsEnum.START_BENCH, formData);
    }
};

export default new Vuex.Store({
    state,
    actions,
    mutations
});
