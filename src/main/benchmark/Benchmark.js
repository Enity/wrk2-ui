import { execFile } from 'child_process';
import { EventSource } from '../abstract/EventSource';
import { BenchmarkResult } from './BenchmarkResult';
import { BenchmarkTimer } from './BenchmarkTimer';

export class Benchmark extends EventSource {
    constructor(command, id, benchData) {
        super();
        this.id = id;
        this.data = benchData;
        this.state = {
            error: false,
            errorMsg: '',
            progress: 0,
            finished: false
        };
        this.result = {};
        this._command = command;
        this._timer = new BenchmarkTimer(benchData.duration * 1000);
    }

    start() {
        this._invokeListener('onStart', this._getPublicFields());
        this._startTimer();

        execFile(this._command.path, this._command.args, (err, stdout) => {
            if (err) this._handleError(err);
            else this._handleFinish(stdout);
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

    onTick(fn) {
        this._addListener(fn, 'onTick');
    }

    _handleError(err) {
        this._timer.stop();
        this.state.error = true;
        this.state.finished = true;
        this.state.errorMsg = err.message.split('\n').slice(1).join(' ');
        this._invokeListener('onError', this._getPublicFields());
    }

    _handleFinish(stdout) {
        this._timer.stop();
        this.state.finished = true;
        this.state.progress = 100;
        this.result = new BenchmarkResult(this._extractCustomReport(stdout));
        this._invokeListener('onFinish', this._getPublicFields());
    }

    _startTimer() {
        this._timer.onTick(progress => {
            this.state.progress = progress;
            this._invokeListener('onTick', this._getPublicFields());
        });
        this._timer.start();
    }

    _extractCustomReport(stdoutRes) {
        return stdoutRes.split('CUSTOM_REPORT')[1];
    }

    _getPublicFields() {
        return {
            id: this.id,
            data: this.data,
            state: this.state,
            result: this.result
        };
    }
}
