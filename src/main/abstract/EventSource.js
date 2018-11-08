export class EventSource {
    constructor() {
        this.listeners = {};
    }

    _addListener(fn, name) {
        if (!this.listeners.hasOwnProperty(name)) {
            this.listeners[name] = [];
        }
        this.listeners[name].push(fn);
    }

    _invokeListener(name, ...args) {
        this.listeners[name].forEach(fn => fn(...args));
    }
};
