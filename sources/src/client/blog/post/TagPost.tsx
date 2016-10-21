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
import * as ReactDOM from "react-dom";
import * as $ from "jquery";

import PostList from "./PostList";
import BannerFrame from "../common/BannerFrame";


declare var pageData: any;


export default class TagPost extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        document.title = pageData.tagName;
    }

    postListFetcher(currentPage: number, count: number, callback: (data: any) => void) {
        $.get(`/tag_post_list/${pageData.tagName}/${currentPage}/${count}`, callback);
    }

    render() {
        return (
            <BannerFrame>
                <PostList
                    ref='postList'
                    title={pageData.tagName}
                    pageJumpIndex={`/tag_posts/${pageData.tagName}`}
                    fetcher={this.postListFetcher.bind(this)}/>
            </BannerFrame>
        );
    }
}


ReactDOM.render(
    <TagPost />,
    document.getElementById('react-content'));
