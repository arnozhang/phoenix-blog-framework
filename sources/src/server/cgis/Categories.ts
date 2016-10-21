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
import {ReqRouter} from "./CgiBase";
import CgiHelper from "./CgiHelper";
import {CategoryModel, PostModel} from "../data/BlogModules";


export function categoryRouter() {

    class _ {

        @ReqRouter.RouteCgi('/category_list')
        static categoryList(req: Request, rsp: Response) {
            PostModel.aggregate()
                .project({categories: 1})
                .unwind('$categories')
                .group({_id: '$categories', count: {$sum: 1}})
                .exec((err: any, countResult: any) => {

                    if (err || !countResult) {
                        CgiHelper.notifyError(rsp, err);
                        return;
                    }

                    CategoryModel.find().sort('-timestamp').exec((err: any, res: Array<any>) => {
                        if (err || !res) {
                            CgiHelper.notifyError(rsp, err);
                            return;
                        }

                        let categories: any[] = [];
                        for (let category of res) {
                            let temp = category.toObject();
                            temp.postCount = 0;
                            categories.push(temp);

                            for (let item of countResult) {
                                if (temp._id.equals(item._id)) {
                                    temp.postCount = item.count;
                                    break;
                                }
                            }
                        }

                        rsp.json({
                            ret: RetCodes.OK,
                            categories: categories
                        });
                    });
                });
        }

        @ReqRouter.RouteCgi('/category_info/:categoryId')
        static getCategoryInfo(req: Request, rsp: Response) {
            CategoryModel.where('_id').equals(req.params.categoryId).exec((err: any, res: any) => {
                if (err || !res || res.length <= 0) {
                    CgiHelper.notifyError(rsp, err);
                    return;
                }

                rsp.json({
                    ret: RetCodes.OK,
                    category: res[0]
                });
            });
        }

        @ReqRouter.AdminRouteCgi('/add_category/:categoryName')
        static addCategory(req: Request, rsp: Response) {
            let name = req.params.categoryName;

            CategoryModel.where('name').equals(name).exec((err: any, res: any) => {
                if (err) {
                    CgiHelper.notifyError(rsp, err);
                    return;
                }

                if (res && res.length > 0) {
                    CgiHelper.notifyError(rsp, 'category already exist!', RetCodes.Category.CATEGORY_EXIST);
                } else {
                    let category = new CategoryModel({
                        name: name,
                        timestamp: new Date()
                    });

                    CategoryModel.insertMany([category], (err: any, doc: any[]) => {
                        if (!err && doc && doc.length > 0) {
                            rsp.json({
                                ret: RetCodes.OK,
                                category: doc[0]
                            });
                        } else {
                            CgiHelper.notifyError(rsp, err);
                        }
                    });
                }
            });
        }

        @ReqRouter.AdminRouteCgi('/remove_category/:categoryId')
        static removeCategory(req: Request, rsp: Response) {
            new Promise((resolve: Function, reject: Function) => {
                PostModel.update(
                    {},
                    {$pull: {categories: req.params.categoryId}},
                    {multi: true},
                    (err: any, raw: any) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve(null);
                    });
            }).then((value: any) => {
                CategoryModel.where('_id', req.params.categoryId).remove((err: any) => {
                    if (err) {
                        CgiHelper.notifyError(rsp, err);
                    } else {
                        CgiHelper.notifySuccess(rsp);
                    }
                });
            }).catch((err) => {
                CgiHelper.notifyError(rsp, err);
            });
        }
    }
}
