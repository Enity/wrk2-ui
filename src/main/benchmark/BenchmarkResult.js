export class BenchmarkResult {
    constructor(rawData) {
        this.summary = {};
        this.requests = {};
        this.latency = {};
        this.raw = '';
        this._parseRawData(rawData);
    }

    _parseRawData(rawData) {
        const reports = rawData.split('CUSTOM_REPORT');
        const customPartOfReport = reports[1];
        this.raw = reports[0];
        this._parseData(customPartOfReport);
    }

    _parseData(data) {
        try {
            const { summary, latency } = JSON.parse(data);
            const duration = (((summary.duration / 1000) % 60000) / 1000).toFixed(2);

            this.summary = {
                duration: duration + ' sec',
                requests: summary.requests,
                size: this._formatBytes(summary.bytes),
                requestPerSecond: (summary.requests / duration).toFixed(2),
                dataPerSecond: this._formatBytes((summary.bytes / duration)),
                errors: summary.errors
            };

            this.latency = Object.keys(latency).reduce((accum, key) => {
                accum[key] = this._formatMicroseconds(latency[key]);
                return accum;
            }, {});
        } catch (error) {
            throw error;
        }
    }

    _formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        var c = 1024;
        var e = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb'];
        var f = Math.floor(Math.log(bytes) / Math.log(c));
        return {
            value: parseFloat((bytes / Math.pow(c, f)).toFixed(2)),
            unit: e[f]
        };
    }

    _formatMicroseconds(us) {
        return {
            value: (us / 1000).toFixed(2),
            unit: 'ms'
        };
    }
}
