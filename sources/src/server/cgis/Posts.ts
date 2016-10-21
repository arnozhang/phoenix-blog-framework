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
import * as fs from "fs";
import * as child_process from "child_process";
import * as mongoose from "mongoose";
import * as os from "os";
import * as path from "path";

import {RetCodes} from "../../base/RetCodes";
import {RouteType, ReqRouter} from "./CgiBase";
import {PostModel} from "../data/BlogModules";
import CgiHelper from "./CgiHelper";


export function postRouter() {
    class _ {

        static postPreviewProjection = {
            _id: 1,
            title: 1,
            previewContent: 1,
            previewImage: 1,
            publishTimestamp: 1,
            modifyTimestamp: 1,
            watchCount: 1,
            praiseCount: 1
        };


        @ReqRouter.RouteCgi('/praise_post/:postId')
        static praisePost(req: Request, rsp: Response) {
            PostModel
                .where('_id', req.params.postId)
                .update({$inc: {'praiseCount': 1}}, (err: any, affectedRow: number) => {
                    if (err || affectedRow <= 0) {
                        CgiHelper.notifyError(rsp, err);
                    } else {
                        CgiHelper.notifySuccess(rsp);
                    }
                });
        }

        @ReqRouter.RouteCgi('/post_list/:categoryId/:pageIndex/:count')
        static postList(req: Request, rsp: Response) {
            let condition: any = null;
            if (req.params.categoryId && req.params.categoryId !== 'all') {
                condition = {categories: {$in: [req.params.categoryId]}};
            }

            _._postPreviewListInternal(rsp, condition, req.params.pageIndex, req.params.count);
        }

        @ReqRouter.RouteCgi('/tag_post_list/:tagName/:pageIndex/:count')
        static tagPostList(req: Request, rsp: Response) {
            let condition: any = {tags: {$in: [req.params.tagName]}};
            _._postPreviewListInternal(rsp, condition, req.params.pageIndex, req.params.count);
        }

        static _postPreviewListInternal(rsp: Response, condition: any, pageIndex: any, reqCount: any) {
            reqCount = parseInt(reqCount);
            if (reqCount <= 0) {
                reqCount = 10;
            }

            new Promise((resolve: Function, reject: Function) => {
                PostModel.count(condition, (err: any, count: number) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (count <= 0) {
                        rsp.json({
                            ret: RetCodes.OK,
                            posts: [],
                            pageCount: 0
                        });

                        return;
                    }

                    resolve(count);
                });
            }).then((count: number) => {
                let start: number = Math.max(0, parseInt(pageIndex)) * reqCount;
                PostModel.find(condition, _.postPreviewProjection, (err: any, res: any[]) => {
                    if (err) {
                        CgiHelper.notifyError(rsp, err);
                        return;
                    }

                    rsp.json({
                        ret: RetCodes.OK,
                        posts: res,
                        pageCount: Math.ceil(count / reqCount)
                    });
                }).limit(reqCount)
                    .skip(start)
                    .sort({'publishTimestamp': -1});
            }).catch((err: any) => {
                CgiHelper.notifyError(rsp, err);
            });
        }

        @ReqRouter.RouteCgi('/post_detail/:postId')
        static postDetail(req: Request, rsp: Response) {
            PostModel.where('_id', req.params.postId).findOne((err: any, res: any) => {
                if (err) {
                    CgiHelper.notifyError(rsp, err);
                    return;
                }

                if (!res) {
                    CgiHelper.notifyError(rsp, err, RetCodes.Post.POST_NOT_EXIST);
                    return;
                }

                rsp.json({
                    ret: RetCodes.OK,
                    post: res
                });

                if (!req.query.fromInternal || req.query.fromInternal.toString().toLowerCase() !== 'true') {
                    PostModel.where('_id', req.params.postId)
                        .update({$inc: {'watchCount': 1}}).exec();
                }
            });
        }

        @ReqRouter.RouteCgi('/post_tag_list')
        static postTagList(req: Request, rsp: Response) {
            PostModel.aggregate()
                .project({name: '$tags'})
                .unwind('$name')
                .group({_id: '$name', count: {$sum: 1}})
                .sort({'count': -1})
                .exec((err: any, result: any) => {
                    if (err || !result) {
                        CgiHelper.notifyError(rsp, err);
                        return;
                    }

                    for (let item of result) {
                        item.name = item._id;
                        item._id = null;
                    }

                    rsp.json({
                        ret: RetCodes.OK,
                        tags: result
                    });
                });
        }

        @ReqRouter.RouteCgi('/post_timeline_list')
        static postTimelineList(req: Request, rsp: Response) {
            let group = {
                keyf: (doc: any) => {
                    let date = new Date(doc.publishTimestamp);
                    return {
                        year: date.getFullYear(),
                        month: date.getMonth() + 1,
                        date: `${date.getFullYear()}年${date.getMonth() + 1}月`
                    };
                },
                condition: {},
                initial: {count: 0},
                reduce: (doc: any, result: any) => {
                    ++result.count;
                },
                finalize: () => {
                }
            };

            PostModel.collection.group(
                group.keyf, group.condition, group.initial,
                group.reduce, group.finalize, true,
                (err: any, result: any[]) => {
                    if (err) {
                        CgiHelper.notifyError(rsp, err);
                        return;
                    }

                    result = result.sort((a: any, b: any) => {
                        if (a.year > b.year) {
                            return -1;
                        } else if (a.year < b.year) {
                            return 1;
                        }

                        if (a.month > b.month) {
                            return -1;
                        } else if (a.month < b.month) {
                            return 1;
                        }

                        return 0;
                    });

                    rsp.json({
                        ret: RetCodes.OK,
                        list: result
                    });
                });
        }

        @ReqRouter.RouteCgi('/timeline_post_list_detail/:year/:month/:pageIndex/:count')
        static timelinePostListDetail(req: Request, rsp: Response) {
            let nextYear = req.params.year;
            let nextMonth = req.params.month;
            if (req.params.month >= 12) {
                ++nextYear;
                nextMonth = 0;
            }

            let condition = {
                publishTimestamp: {
                    $gte: new Date(req.params.year, req.params.month - 1, 1),
                    $lt: new Date(nextYear, nextMonth, 1)
                }
            };

            _._postPreviewListInternal(rsp, condition, req.params.pageIndex, req.params.count);
        }

        @ReqRouter.AdminRouteCgi('/remove_post/:postId', RouteType.POST)
        static removePost(req: Request, rsp: Response) {
            PostModel.remove({_id: req.params.postId}, (err: any) => {
                if (err) {
                    CgiHelper.notifyError(rsp, err);
                    return;
                }

                let imagePath = path.join('dist', 'files', 'image', req.params.postId);
                if (fs.existsSync(imagePath)) {
                    let cmd = os.platform() === 'win32'
                        ? `RD /S /Q ${imagePath}`
                        : `rm -rf ${imagePath}`;
                    child_process.exec(cmd, (err: Error) => {
                        console.log(err);
                    });
                }

                CgiHelper.notifySuccess(rsp);
            });
        }

        @ReqRouter.AdminRouteCgi('/modify_publish_timestamp/:postId', RouteType.POST)
        static modifyPostPublishTimestamp(req: Request, rsp: Response) {
            let millSeconds = Math.max(0, parseInt(req.query.time));
            if (millSeconds == 0) {
                CgiHelper.notifyError(rsp);
                return;
            }

            PostModel.update(
                {_id: req.params.postId},
                {
                    $set: {publishTimestamp: new Date(millSeconds)}
                },
                (err: any, raw: any) => {
                    if (err) {
                        CgiHelper.notifyError(rsp, err);
                        return;
                    }

                    CgiHelper.notifySuccess(rsp);
                }
            );
        }

        static _getPostContent(req: Request, callback: (post: any) => void) {
            CgiHelper.receivePostDataString(req, (data: string) => {
                if (data) {
                    try {
                        callback(JSON.parse(data));
                        return;
                    } catch (e) {
                        console.log(e);
                    }
                }

                callback(null);
            });
        }

        @ReqRouter.AdminRouteCgi('/add_post', RouteType.POST)
        static addPost(req: Request, rsp: Response) {
            _._getPostContent(req, (post: any) => {
                if (post) {
                    _.savePost(rsp, post);
                } else {
                    CgiHelper.notifyError(rsp);
                }
            });
        }

        @ReqRouter.AdminRouteCgi('/modify_post/:postId', RouteType.POST)
        static modifyPost(req: Request, rsp: Response) {

            _._getPostContent(req, (post: any) => {
                if (post) {
                    post._id = req.params.postId;
                    _.savePost(rsp, post);
                } else {
                    CgiHelper.notifyError(rsp);
                }
            });
        }

        static savePost(rsp: Response, post: any) {
            post.modifyTimestamp = new Date();

            let success = (_id: string) => {
                rsp.json({
                    ret: RetCodes.OK,
                    post: {
                        _id: _id
                    }
                });
            };

            let postId = post._id;
            if (post.content) {
                if (!postId || postId.length <= 0) {
                    postId = new mongoose.Types.ObjectId().toHexString();
                }

                _.handlePostTempImage(postId, post);

                let imgReg = /!\[.*\]\((.*)\)/i;
                let matched = post.content.match(imgReg);
                if (matched && matched.length >= 2) {
                    post.previewImage = matched[1];
                }
            }

            if (post._id && post._id.length > 0) {
                PostModel
                    .where('_id', post._id)
                    .update({$set: post}, (err: any, affectedRows: number) => {
                        if (err) {
                            CgiHelper.notifyError(rsp, err);
                        } else {
                            success(post._id);
                        }
                    });
            } else {
                post._id = postId;
                post.publishTimestamp = new Date();
                PostModel.insertMany([post], (err: any, doc: any[]) => {
                    if (err || !doc || doc.length <= 0) {
                        CgiHelper.notifyError(rsp, err);
                    } else {
                        success(doc[0]._id);
                    }
                });
            }
        }

        static handlePostTempImage(postId: string, post: any) {
            let reg = /!\[.*\]\(\/upload_images\/(.+)\)/ig;
            let matches = post.content.match(reg);
            if (!matches || matches.length <= 0) {
                return;
            }

            let imgNameReg = /!\[(.*)\]\(\/upload_images\/(.+)\)/i;
            for (let item of matches) {
                let match = item.match(imgNameReg);
                if (!match || match.length < 3) {
                    continue;
                }

                _.moveImageFile(postId, match[2]);
                post.content = post.content.replace(
                    item, `![${match[1]}](/images/${postId}/${match[2]})]`);
            }
        }

        static moveImageFile(postId: string, fileName: string): string {
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
    }
}
