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

import * as React from "react";

import MiscUtils from "../../base/utils/MiscUtils";
import TitleHeader from "../../render/default/common/TitleHeader";
import RenderEngines from "../../render/RenderEngines";

const cssStyles = require('../homepage/homepage.css');


export type PostListFetcher =
    (currentPage: number, count: number, callback: (data: any) => void) => void;


interface Props {
    title?: string;
    hideCategoryTitle?: boolean;
    fetcher?: PostListFetcher;
    previewExtraRender?: (post: any) => any;
    pageJumpIndex?: string;
    fromInternal?: boolean;
}


export default class PostList extends React.Component<Props, any> {

    title: any;
    postList: any;
    currentPage: number = 0;
    count = 10;


    constructor(props: Props) {
        super(props);

        this.title = this.props.title;
    }

    componentDidMount() {
        if (window.location.search) {
            let match = window.location.search.match(/pageIndex=([0-9]*)/i);
            if (match && match.length > 1) {
                this.currentPage = Math.max(0, parseInt(match[1]));
            }

            match = window.location.search.match(/count=([0-9]*)/i);
            if (match && match.length > 1) {
                this.count = Math.max(this.count, parseInt(match[1]));
            }
        }

        let fetcher = this.props.fetcher;
        if (!fetcher) {
            fetcher = (currentPage: number, count: number, callback: (data: any) => void) => {
                $.get(`/post_list/all/${currentPage}/${count}`, callback);
            };
        }

        fetcher(this.currentPage, this.count, (data) => {
            this.postList = data;
            this.setState({});
        });
    }

    render() {
        let posts: any = null;
        let PostPreviewRender_ = RenderEngines.getRender().postPreview;

        if (this.postList && this.postList.posts && this.postList.posts.length > 0) {
            posts = this.postList.posts.map((post: any, index: number) => {
                return (
                    <PostPreviewRender_
                        key={index} post={post}
                        fromInternal={this.props.fromInternal}
                        extraRender={this.props.previewExtraRender}
                        isLast={index == this.postList.posts.length - 1}/>
                );
            });
        } else {
            posts = (
                <div
                    style={{paddingTop: 100, paddingBottom: 100, paddingLeft: 40, fontSize: 20}}>
                    该分类下暂无文章
                </div>
            );
        }

        let postsIndex: any = null;
        if (this.postList && this.postList.pageCount > 1) {
            let PageIndexesRender_ = RenderEngines.getRender().pageIndexes;
            postsIndex = (
                <PageIndexesRender_
                    pageJumpIndex={this.props.pageJumpIndex}
                    currentPage={this.currentPage}
                    pageCount={this.postList.pageCount}/>
            );
        }

        let categoryTitle: any = null;
        if (!this.props.hideCategoryTitle) {
            let headerStyle: any = null;
            if (MiscUtils.visitByMobile()) {
                headerStyle = {
                    paddingTop: 0,
                    paddingBottom: 0
                };
            }

            categoryTitle =
                <TitleHeader style={headerStyle} title={this.title ? this.title : '全部文章'}/>;
        }

        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {categoryTitle}
                {posts}
                {postsIndex}
            </div>
        );
    }

    updateCategoryName(name: any) {
        this.title = name;
        this.setState({});
    }

    removePost(postId: string) {
        if (!this.postList || !this.postList.posts) {
            return;
        }

        for (let i = 0; i < this.postList.posts.length; ++i) {
            if (postId === this.postList.posts[i]._id) {
                this.postList.posts.splice(i, 1);
                this.setState({});
                break;
            }
        }
    }
}


const styles = {};
