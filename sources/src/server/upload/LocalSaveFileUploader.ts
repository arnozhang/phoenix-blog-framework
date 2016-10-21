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

import * as mongoose from "mongoose";
import * as child_process from "child_process";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";

import {RetCodes} from "../../base/RetCodes";

import {FileUploader} from "./FileUploader";
import CgiHelper from "../cgis/CgiHelper";


export default class LocalSaveFileUploader implements FileUploader {

    constructor() {
    }

    upload(blob: any, callback: (err: any, url: string) => void) : void {
        let tempPath = path.join('dist', 'files', 'temp');
        if (!fs.existsSync(tempPath)) {
            fs.mkdirSync(tempPath);
        }

        let id: any = new new mongoose.Types.ObjectId();
        let fileName = id.toHexString();
        fs.writeFile(`${tempPath}/${fileName}`, blob.data, (err: any) => {
            if (err) {
                callback(err, null);
                return;
            }

            callback(null, `/upload_images/${fileName}`);
        });
    }

    moveImageFile(postId: string, fileName: string): string {
        let src = path.join('dist', 'files', 'temp', fileName);
        if (!fs.existsSync(src)) {
            return null;
        }

        let dstPath = path.join('dist', 'files', 'image', postId);
        let dst = path.join(dstPath, fileName);

        if (!fs.existsSync(dstPath)) {
            fs.mkdirSync(dstPath);
        }

        let move = os.platform() === 'win32' ? 'move' : 'mv';
        child_process.exec(`${move} ${src} ${dst}`, (err: Error) => {
            if (err) {
                console.log(err);
            }
        });

        return `/images/${postId}/${fileName}`;
    }

    removeFilesByPostId(postId: string) : void {
        let imagePath = path.join('dist', 'files', 'image', postId);
        if (fs.existsSync(imagePath)) {
            let cmd = os.platform() === 'win32'
                ? `RD /S /Q ${imagePath}`
                : `rm -rf ${imagePath}`;
            child_process.exec(cmd, (err: Error) => {
                console.log(err);
            });
        }
    }
}
