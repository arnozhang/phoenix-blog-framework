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

import CgiHelper from "./CgiHelper";
import {ReqRouter, RouteType} from "./CgiBase";


export function fileUploadRouter() {

    class _ {

        @ReqRouter.AdminRouteCgi('/upload_file/image', RouteType.POST)
        static uploadImage(req: Request, rsp: Response) {

            CgiHelper.receivePostDataString(req, (imageData: string) => {
                if (!imageData || imageData.length <= 0) {
                    CgiHelper.notifyError(rsp);
                    return;
                }

                let blob = CgiHelper.dataUrlToBlob(imageData);
                if (!blob || !blob.data) {
                    CgiHelper.notifyError(rsp);
                    return;
                }

                CgiHelper.uploader.upload(blob, (err: any, url: string) => {
                    if (err) {
                        CgiHelper.notifyError(rsp, err);
                        return;
                    }

                    rsp.json({
                        ret: RetCodes.OK,
                        url: url
                    });
                });
            });
        }
    }
}
