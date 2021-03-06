import { ipcMain } from 'electron';
import { EventsEnum } from '@root/enums';
import { BencmarkFabric } from '../benchmark/BenchmarkFabric';

export class BenchmarksService {
    constructor() {
        this.benchmarks = [];
    }

    initListeners() {
        ipcMain.on(EventsEnum.START_BENCH, async(event, formData) => {
            const b = await BencmarkFabric.create(formData);

            b.onStart(benchData => {
                event.sender.send(EventsEnum.BENCH_STARTED, benchData);
            });

            b.onTick(benchData => {
                event.sender.send(EventsEnum.BENCH_TICK, benchData);
            });

            b.onError(benchData => {
                event.sender.send(EventsEnum.BENCH_ERROR, benchData);
            });

            b.onFinish(benchData => {
                event.sender.send(EventsEnum.BENCH_FINISHED, benchData);
            });

            b.start();
            this.benchmarks.push(b);
        });
    }
}
