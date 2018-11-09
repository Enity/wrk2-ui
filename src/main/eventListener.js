import { ipcMain } from 'electron';
import { EventsEnum } from '@root/enums';
import { BencmarkFabric } from './benchmark/BenchmarkFabric';

ipcMain.on(EventsEnum.START_BENCH, (event, formData) => {
    const benchmark = BencmarkFabric.create(formData);

    benchmark.onStart(benchData => {
        event.sender.send(EventsEnum.BENCH_STARTED, benchData);
    });

    benchmark.onTick(benchData => {
        event.sender.send(EventsEnum.BENCH_TICK, benchData);
    });

    benchmark.onError(benchData => {
        console.log(benchData);
    });

    benchmark.onFinish(benchData => {
        event.sender.send(EventsEnum.BENCH_FINISHED, benchData);
    });

    benchmark.start();
});
