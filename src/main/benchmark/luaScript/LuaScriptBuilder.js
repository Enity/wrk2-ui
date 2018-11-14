import { LuaScript } from './LuaScript';
import util from 'util';
const readFile = util.promisify(require('fs').readFile);

export class LuaScriptBuilder {
    constructor() {
        this._method = 'GET';
        this._headers = [];
        this._body = '';
        this._code = '';
    }

    setMethod(methodName) {
        this._method = methodName;
        return this;
    }

    addHeaders(headers = {}) {
        this._headers = Object.keys(headers).map(key => {
            return {
                title: key,
                value: headers[key]
            };
        });
        return this;
    }

    addBody(body) {
        this._body = Object.keys(body)
            .map(key => key + '=' + String((body[key])))
            .join('&');
        return this;
    }

    async addFromFile(path) {
        const content = await readFile(path);
        this._code += content;
        return this;
    }

    build() {
        this._code += '\n\n\n';
        this._code += `wrk.method = "${this._method}"\n`;
        this._code += `wrk.body = "${this._body}"\n`;
        for (const header of this._headers) {
            this._code += `wrk.headers["${header.title}"] = "${header.value}"\n`;
        }
        return new LuaScript(this._code);
    }
}
