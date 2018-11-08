import { ipcMain } from 'electron';
import { EventsEnum } from '@root/enums/EventsEnum';
import { BencmarkFabric } from './benchmark/BenchmarkFabric';

ipcMain.on(EventsEnum.START_BENCH, (event, formData) => {
    const benchmark = BencmarkFabric.getBenchmark(formData);

    benchmark.onStart(benchData => {
        event.sender.send(EventsEnum.BENCH_STARTED, benchData);
    });

    benchmark.onError(err => {
        console.log(err);
    });

    benchmark.onFinish(benchData => {
        event.sender.send(EventsEnum.BENCH_FINISHED, benchData);
    });

    benchmark.start();
});
