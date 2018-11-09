import { execFile } from 'child_process';
import { EventSource } from '../abstract/EventSource';
import { BenchmarkResult } from './BenchmarkResult';

export class Benchmark extends EventSource {
    constructor(command, benchData) {
        super();
        this.command = command;
        this.benchData = benchData;
    }

    start() {
        this._invokeListener('onStart', this.benchData);

        execFile(this.command.path, this.command.args, (err, stdout) => {
            if (err) {
                this._invokeListener('onError', {
                    ...this.benchData,
                    errorMessage: err.message.split('\n').slice(1).join(' ')
                });
            } else {
                const result = new BenchmarkResult(this._extractCustomReport(stdout));
                this._invokeListener('onFinish', {
                    ...this.benchData,
                    result
                });
            }
        });
    }

    onStart(fn) {
        this._addListener(fn, 'onStart');
    }

    onFinish(fn) {
        this._addListener(fn, 'onFinish');
    }

    onError(fn) {
        this._addListener(fn, 'onError');
    }

    _extractCustomReport(stdoutRes) {
        return stdoutRes.split('CUSTOM_REPORT')[1];
    }
}
