import path from 'path';
import crypto from 'crypto';
import { Benchmark } from './Benchmark';
import util from 'util';
const execFile = util.promisify(require('child_process').execFile);

/**
 * @static
 */
export class BencmarkFabric {
    static create(formData) {
        const command = {
            path: this._getWrkLibPath(),
            args: this._getArgStringFromForm(formData)
        };
        const id = crypto.randomBytes(3 * 4).toString('base64');
        return new Benchmark(command, id, formData);
    }

    static async testRun() {
        const args = ['-t1', '-c1', '-d1s', '-R1', '-s', this._getReportScriptPath(), 'http://127.0.0.1'];
        return execFile(this._getWrkLibPath(), args);
    }

    static _getWrkLibPath() {
        const platform = process.platform;
        const pathTolib = path.resolve(__static, `third-party/${platform}/wrk`);
        return pathTolib;
    }

    static _getReportScriptPath() {
        const pathTolib = path.resolve(__static, 'third-party/report.lua');
        return pathTolib;
    }

    static _getArgStringFromForm({
        target, connections, threads, duration, requests
    }) {
        return [
            ['-t'], threads,
            ['-c'], connections,
            ['-d'], duration,
            ['-R'], requests,
            ['-s'], this._getReportScriptPath(),
            target
        ];
    }
}
