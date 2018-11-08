import { EventSource } from '../abstract/EventSource';

export class BenchmarkTimer extends EventSource {
    constructor(duration) {
        super();
        this.duration = duration;
        this._intervalId = 0;
        this._tickTime = 1000;
        this._progress = 0;
        this._perTickValue = this._calculatePerTickValue();
    }

    start() {
        this._intervalId = setInterval(() => this._tick(), this._tickTime);
        setTimeout(() => this.stop(), this.duration + 50);
    }

    stop() {
        clearInterval(this._intervalId);
    }

    onTick(fn) {
        this._addListener(fn, 'onTick');
    }

    _tick() {
        this._progress += this._perTickValue;
        this._invokeListener('onTick', this._progress);
    }

    _calculatePerTickValue() {
        return 100 / (this.duration / this._tickTime);
    }
}
