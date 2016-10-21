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

import PostList from "./PostList";
import BannerFrame from "../../render/default/common/BannerFrame";


declare var pageData: any;


export default class TimelinePostDetail extends React.Component<any, any> {

    render() {
        return (
            <BannerFrame>
                <PostList
                    title={`${pageData.year}年${pageData.month}月`}
                    pageJumpIndex={`/timeline_post_detail/${pageData.year}/${pageData.month}`}
                    fetcher={this.postListFetcher.bind(this)}/>
            </BannerFrame>
        );
    }

    postListFetcher(currentPage: number, count: number, callback: (data: any) => void) {
        $.get(`/timeline_post_list_detail/${pageData.year}/${pageData.month}/${currentPage}/${count}`, callback);
    }
}


ReactDOM.render(
    <TimelinePostDetail />,
    document.getElementById('react-content'));
