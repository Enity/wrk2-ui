import crypto from 'crypto';
import os from 'os';
import path from 'path';
import util from 'util';
const writeFile = util.promisify(require('fs').writeFile);

export class LuaScript {
    constructor(code) {
        this.code = code;
    }

    async saveToTmpFile() {
        const randomName =
            'http-bench-' +
            crypto.randomBytes(3 * 4).toString('base64') +
            '.lua';

        const savePath = path.join(os.tmpdir(), randomName);
        await writeFile(savePath, this.code);
        return savePath;
    }
};
