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

import {ReqRouter} from "../cgis/CgiBase";
import CgiHelper from "../cgis/CgiHelper";
import {config} from "../config/server.config";


export function clientPagesRouter() {
    class _ {

        @ReqRouter.RouteCgi('/')
        static homepage(req: Request, rsp: Response) {
            rsp.render('with-scrollbar-markdown.pug', {
                title: config.site.siteTitle,
                js: [CgiHelper.pageJs('homepage')]
            });
        }

        @ReqRouter.RouteCgi('/post/:postId')
        static postDetail(req: Request, rsp: Response) {
            rsp.render('with-scrollbar-markdown.pug', {
                title: '文章详情',
                js: [CgiHelper.pageJs('post')],
                data: {
                    postId: req.params.postId
                }
            });
        }

        @ReqRouter.RouteCgi('/category_post/:categoryId')
        static categoryPosts(req: Request, rsp: Response) {
            rsp.render('with-scrollbar-markdown.pug', {
                title: '分类列表',
                js: [CgiHelper.pageJs('category_post')],
                data: {
                    categoryId: req.params.categoryId
                }
            });
        }

        @ReqRouter.RouteCgi('/timeline_list')
        static timelinePosts(req: Request, rsp: Response) {
            rsp.render('with-scrollbar-markdown.pug', {
                title: '时间轴列表',
                js: [CgiHelper.pageJs('timeline_post')],
                data: {
                    categoryId: req.params.categoryId
                }
            });
        }

        @ReqRouter.RouteCgi('/timeline_post_detail/:year/:month')
        static timelinePostsDetail(req: Request, rsp: Response) {
            rsp.render('with-scrollbar-markdown.pug', {
                title: `时间轴列表 - ${req.params.year}年${req.params.month}月`,
                js: [CgiHelper.pageJs('timeline_post_detail')],
                data: {
                    year: req.params.year,
                    month: req.params.month
                }
            });
        }

        @ReqRouter.RouteCgi('/about_author')
        static aboutAuthor(req: Request, rsp: Response) {
            rsp.render('normal.pug', {
                title: '关于作者',
                js: [CgiHelper.pageJs('about_author')]
            });
        }

        @ReqRouter.RouteCgi('/tag_posts/:tagName')
        static tagPosts(req: Request, rsp: Response) {
            rsp.render('with-scrollbar-markdown.pug', {
                title: '分类列表',
                js: [CgiHelper.pageJs('tag_post')],
                data: {
                    tagName: req.params.tagName
                }
            });
        }

        @ReqRouter.RouteCgi('/tag_list')
        static tagList(req: Request, rsp: Response) {
            rsp.render('normal.pug', {
                title: '标签列表',
                js: [CgiHelper.pageJs('tag_detail_list')]
            });
        }
    }
}


export function adminPagesRouter() {
    class _ {

        @ReqRouter.AdminRouteCgi('/admin')
        static adminIndex(req: Request, rsp: Response) {
            rsp.render('with-scrollbar-markdown.pug', {
                title: '后台管理系统',
                js: [CgiHelper.pageJs('admin_index')]
            });
        }

        @ReqRouter.AdminRouteCgi('/category_manager')
        static categoryManager(req: Request, rsp: Response) {
            rsp.render('with-scrollbar-markdown.pug', {
                title: '分类管理',
                js: [CgiHelper.pageJs('category_manager')]
            });
        }

        @ReqRouter.AdminRouteCgi('/comment_manager')
        static commentManager(req: Request, rsp: Response) {
            rsp.render('with-scrollbar-markdown.pug', {
                title: '评论管理',
                js: [CgiHelper.pageJs('comment_manager')]
            });
        }

        @ReqRouter.AdminRouteCgi('/write_new_post')
        static writeNewPost(req: Request, rsp: Response) {
            rsp.render('write-new-post.pug', {
                title: '写新文章',
                js: [CgiHelper.pageJs('write_new_post')]
            });
        }

        @ReqRouter.AdminRouteCgi('/admin_category_post/:categoryId')
        static adminCategoryPost(req: Request, rsp: Response) {
            rsp.render('with-scrollbar-markdown.pug', {
                title: '分类列表',
                js: [CgiHelper.pageJs('admin_category_post')],
                data: {
                    categoryId: req.params.categoryId
                }
            });
        }
    }
}


export function errorPagesRouter() {
    class _ {

        @ReqRouter.RouteCgi('*')
        static error404(req: Request, rsp: Response) {
            console.log(`** No Route for ${req.url}`);

            rsp.render('with-scrollbar-markdown.pug', {
                title: '404!',
                js: [CgiHelper.pageJs('404')]
            });
        }
    }
}
