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
import {ReactInstance} from "react";
import * as ReactDOM from "react-dom";

import {RetCodes} from "../../../base/RetCodes";

import BannerFrame from "../common/BannerFrame";
import PostList from "./PostList";


declare var pageData: any;


export default class CategoryPost extends React.Component<any, any> {

    category: any;
    refs: {
        [key: string]: ReactInstance;
        postList: PostList;
    };


    componentDidMount() {
        $.get(`/category_info/${pageData.categoryId}`, (data: any) => {
            if (data && data.ret === RetCodes.OK
                && data.category && data.category.name && data.category.name.length > 0) {
                this.category = data.category;
                document.title = data.category.name;

                if (this.refs.postList) {
                    this.refs.postList.updateCategoryName(this.category.name);
                }
            }
        });
    }

    postListFetcher(currentPage: number, count: number, callback: (data: any) => void) {
        $.get(`/post_list/${pageData.categoryId}/${currentPage}/${count}`, callback);
    }

    render() {
        return (
            <BannerFrame>
                <PostList
                    ref='postList'
                    pageJumpIndex={`/category_post/${pageData.categoryId}`}
                    fetcher={this.postListFetcher.bind(this)}/>
            </BannerFrame>
        );
    }
}


ReactDOM.render(
    <CategoryPost />,
    document.getElementById('react-content'));
