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
            CgiHelper.render(
                rsp,
                'with-scrollbar-markdown.pug',
                config.site.siteTitle,
                'homepage'
            );
        }

        @ReqRouter.RouteCgi('/post/:postId')
        static postDetail(req: Request, rsp: Response) {
            CgiHelper.render(
                rsp,
                'with-scrollbar-markdown.pug',
                '文章详情',
                'post',
                {
                    postId: req.params.postId
                }
            );
        }

        @ReqRouter.RouteCgi('/category_post/:categoryId')
        static categoryPosts(req: Request, rsp: Response) {
            CgiHelper.render(
                rsp,
                'with-scrollbar-markdown.pug',
                '分类列表',
                'category_post',
                {
                    categoryId: req.params.categoryId
                }
            );
        }

        @ReqRouter.RouteCgi('/timeline_list')
        static timelinePosts(req: Request, rsp: Response) {
            CgiHelper.render(
                rsp,
                'with-scrollbar-markdown.pug',
                '时间轴列表',
                'timeline_post',
                {
                    categoryId: req.params.categoryId
                }
            );
        }

        @ReqRouter.RouteCgi('/timeline_post_detail/:year/:month')
        static timelinePostsDetail(req: Request, rsp: Response) {
            CgiHelper.render(
                rsp,
                'with-scrollbar-markdown.pug',
                `时间轴列表 - ${req.params.year}年${req.params.month}月`,
                'timeline_post_detail',
                {
                    year: req.params.year,
                    month: req.params.month
                }
            );
        }

        @ReqRouter.RouteCgi('/tag_posts/:tagName')
        static tagPosts(req: Request, rsp: Response) {
            CgiHelper.render(
                rsp,
                'with-scrollbar-markdown.pug',
                '分类列表',
                'tag_post',
                {
                    tagName: req.params.tagName
                }
            );
        }

        @ReqRouter.RouteCgi('/tag_list')
        static tagList(req: Request, rsp: Response) {
            CgiHelper.render(
                rsp,
                'normal.pug',
                '标签列表',
                'tag_detail_list'
            );
        }
    }
}


export function adminPagesRouter() {
    class _ {

        @ReqRouter.AdminRouteCgi('/admin')
        static adminIndex(req: Request, rsp: Response) {
            CgiHelper.render(
                rsp,
                'with-scrollbar-markdown.pug',
                '后台管理系统',
                'admin_index'
            );
        }

        @ReqRouter.AdminRouteCgi('/category_manager')
        static categoryManager(req: Request, rsp: Response) {
            CgiHelper.render(
                rsp,
                'with-scrollbar-markdown.pug',
                '分类管理',
                'category_manager'
            );
        }

        @ReqRouter.AdminRouteCgi('/comment_manager')
        static commentManager(req: Request, rsp: Response) {
            CgiHelper.render(
                rsp,
                'with-scrollbar-markdown.pug',
                '评论管理',
                'comment_manager'
            );
        }

        @ReqRouter.AdminRouteCgi('/write_new_post')
        static writeNewPost(req: Request, rsp: Response) {
            CgiHelper.render(
                rsp,
                'write-new-post.pug',
                '写新文章',
                'write_new_post'
            );
        }

        @ReqRouter.AdminRouteCgi('/admin_category_post/:categoryId')
        static adminCategoryPost(req: Request, rsp: Response) {
            CgiHelper.render(
                rsp,
                'with-scrollbar-markdown.pug',
                '分类列表',
                'admin_category_post',
                {
                    categoryId: req.params.categoryId
                }
            );
        }
    }
}


export function errorPagesRouter() {
    class _ {

        @ReqRouter.RouteCgi('*')
        static error404(req: Request, rsp: Response) {
            console.log(`** No Route for ${req.url}`);

            CgiHelper.render(
                rsp,
                'with-scrollbar-markdown.pug',
                '404!',
                '404'
            );
        }
    }
}
