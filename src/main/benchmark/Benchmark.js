import { exec } from 'child_process';
import { EventSource } from '../abstract/EventSource';
import { BenchmarkResult } from './BenchmarkResult';

export class Benchmark extends EventSource {
    constructor(command, id, duration) {
        super();
        this.command = command;
        this.id = id;
        this.duration = duration;
    }

    start() {
        this._invokeListener('onStart', {
            id: this.id,
            duration: this.duration
        });

        exec(this.command, (err, stdout) => {
            if (err) {
                this._invokeListener('onError', {
                    id: this.id,
                    errorMessage: err.message.split('\n').slice(1).join(' ')
                });
            } else {
                const result = new BenchmarkResult(this._extractCustomReport(stdout));
                this._invokeListener('onFinish', {
                    id: this.id,
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
