import { ipcMain } from 'electron';
import { EventsEnum } from '@root/enums/EventsEnum';
import { BencmarkFabric } from './benchmark/BenchmarkFabric';
import { BenchmarkTimer } from './benchmark/BenchmarkTimer';

ipcMain.on(EventsEnum.START_BENCH, (event, formData) => {
    const benchmark = BencmarkFabric.getBenchmark(formData);
    const benchmarkTimer = new BenchmarkTimer(formData.duration * 1000);

    benchmark.onStart(benchData => {
        event.sender.send(EventsEnum.BENCH_STARTED, benchData);

        benchmarkTimer.onTick(progress => {
            event.sender.send(EventsEnum.BENCH_TICK, { ...benchData, progress });
        });
        benchmarkTimer.start();
    });

    benchmark.onError(err => {
        benchmarkTimer.stop();
        console.log(err);
    });

    benchmark.onFinish(benchData => {
        benchmarkTimer.stop();
        event.sender.send(EventsEnum.BENCH_FINISHED, benchData);
    });

    benchmark.start();
});
