/**
 * Phoenix blog project.
 *
 * Copyright 2016-2016 Arno Zhang <zyfgood12@163.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Request, Response} from "express";

import {RetCodes} from "../../base/RetCodes";


export default class CgiHelper {

    static receivePostData(req: Request, callback: (data: Buffer) => void) {
        let buffers: Array<Buffer> = [];

        req.on('data', (data: Uint8Array) => {
            buffers.push(new Buffer(data));
        });

        req.on('end', () => {
            try {
                let buffer = Buffer.concat(buffers);
                callback(buffer);
            } catch (e) {
                console.log(e);
                callback(null);
            }
        });
    }

    static receivePostDataString(req: Request, callback: (data: string) => void, encode?: string) {
        CgiHelper.receivePostData(req, (data: Buffer)=> {
            if (data) {
                callback(data.toString(encode ? encode : 'utf-8'));
            } else {
                callback(null);
            }
        });
    }

    static pageJs(name: string): string {
        return `/${name}.js`;
    }

    static notifySuccess(rsp: Response) {
        rsp.json({ret: RetCodes.OK});
    }

    static notifyError(rsp: Response, err?: any, retCode?: number) {
        if (retCode == null || retCode == undefined) {
            retCode = RetCodes.FAILED;
        }

        if (err) {
            console.log(err);
        }

        rsp.json({
            ret: retCode,
            error: err ? err.toString() : `Unknown Error! RetCode: ${retCode}`
        })
    }

    static dataUrlToBlob(dataUrl: string): {data: Buffer, ext?: string} {
        if (!dataUrl) {
            return null;
        }

        let match = dataUrl.match(/^data:.+\/(.+);base64,(.*)$/);
        if (!match || match.length < 2) {
            return null;
        }

        return {
            ext: match[1],
            data: new Buffer(match[2], 'base64')
        };
    }
}
