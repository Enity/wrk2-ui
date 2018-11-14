import path from 'path';
import crypto from 'crypto';
import { Benchmark } from './Benchmark';
import { LuaScriptBuilder } from './luaScript/LuaScriptBuilder';

/**
 * @static
 */
export class BencmarkFabric {
    static async create(formData) {
        const command = {
            path: this._getWrkLibPath(),
            args: await this._buildArgs(formData)
        };
        const id = crypto.randomBytes(3 * 4).toString('base64');
        return new Benchmark(command, id, formData);
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

    static async _buildArgs(formData) {
        const simpleArgs = this._getArgStringFromForm(formData);
        if (!formData.hasAdvanced) {
            simpleArgs.push('-s', this._getReportScriptPath());
        } else {
            const advFields = formData.advanced;

            const builder = new LuaScriptBuilder()
                .setMethod(advFields.type)
                .addBody(advFields.body)
                .addHeaders(advFields.headers);
            await builder.addFromFile(this._getReportScriptPath());
            const script = builder.build();

            const savedScriptPath = await script.saveToTmpFile();
            simpleArgs.push('-s', savedScriptPath);
        }
        return simpleArgs;
    }

    static _getArgStringFromForm({
        target, connections, threads, duration, requests
    }) {
        return [
            '-t', threads,
            '-c', connections,
            '-d', duration,
            '-R', requests,
            target
        ];
    }
}
