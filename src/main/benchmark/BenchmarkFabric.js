import path from 'path';
import crypto from 'crypto';
import { Benchmark } from './Benchmark';
import util from 'util';
const exec = util.promisify(require('child_process').exec);

/**
 * @static
 */
export class BencmarkFabric {
    static getBenchmark(formData) {
        const command = this._getWrkLibPath() + this._getArgStringFromForm(formData);
        const id = crypto.randomBytes(3 * 4).toString('base64');
        return new Benchmark(command, { ...formData, id });
    }

    static async testRun() {
        return exec(
            `${this._getWrkLibPath()} -t1 -c1 -d1s -R1 -s ${this._getReportScriptPath()} http://127.0.0.1`
        );
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
        let args = [];
        args += ' -t' + threads;
        args += ' -c' + connections;
        args += ' -d' + duration + 's';
        args += ' -R' + requests;
        args += ' -s ' + this._getReportScriptPath();
        args += ' ' + target;
        return args;
    }
}
