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

import {config} from "../config/server.config";
import {PostModel} from "../data/BlogModules";
import {ReqRouter} from "./CgiBase";
import CgiHelper from "./CgiHelper";


export function userInfoRouter() {
    class _ {

        @ReqRouter.RouteCgi('/user_info')
        static userInfo(req: Request, rsp: Response) {
            new Promise((resolve: Function, reject: Function) => {
                PostModel.count(null, (err: any, count: number) => {
                    if (err) {
                        resolve(0);
                    } else {
                        resolve(count);
                    }
                });
            }).then((count: number) => {
                PostModel
                    .aggregate()
                    .group({
                        _id: null,
                        praiseTotal: {$sum: '$praiseCount'},
                        watchTotal: {$sum: '$watchCount'},
                        count: {$sum: '$_id'}
                    })
                    .exec((err: any, doc: any[]) => {
                        let praiseCount = 0;
                        let watchCount = 0;
                        if (!err && doc && doc.length > 0) {
                            praiseCount = Math.max(doc[0].praiseTotal, 0);
                            watchCount = Math.max(doc[0].watchTotal, 0);
                        }

                        rsp.json({
                            userName: config.user.userName,
                            email: config.user.email,
                            portrait: config.user.portrait,
                            siteTitle: config.site.siteTitle,
                            subTitle: config.site.subTitle,

                            postCount: Math.max(count, 0),
                            praiseCount: praiseCount,
                            watchCount: watchCount,
                            bannerImg: '/banner.png'
                        });
                    });
            }).catch((err: any) => {
                CgiHelper.notifyError(rsp, err);
            });
        }
    }
}
