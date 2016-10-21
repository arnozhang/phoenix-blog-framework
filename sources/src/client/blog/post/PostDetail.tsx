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
import {RetCodes} from "../../../base/RetCodes";
import MiscUtils from "../../base/utils/MiscUtils";
import RenderEngines from "../../render/RenderEngines";

const cssStyles = require('../homepage/homepage.css');


declare var pageData: any;


export class PostDetail extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            post: null,
            loading: true
        };
    }

    componentDidMount() {
        let fromInternal = window.location.search.match(/fromInternal=true/i);

        $.get(MiscUtils.postDetailCgi(pageData.postId, fromInternal != null), (data) => {
            if (data && data.ret == RetCodes.OK && data.post) {
                document.title = data.post.title;
                this.setState({loading: false, post: data.post});
            } else {
                this.setState({loading: false, post: null});
            }
        });
    }

    render() {
        let PostDetailRender_ = RenderEngines.getRender().postDetail;
        return (
            <PostDetailRender_
                post={this.state.post}
                loading={this.state.loading}
                praisePost={this.onPraisePost.bind(this)}/>
        );
    }

    onPraisePost() {
        $.get((`/praise_post/${this.state.post._id}`), (data) => {
            if (data && data.ret === RetCodes.OK) {
                if (this.state.post.praiseCount) {
                    ++this.state.post.praiseCount;
                } else {
                    this.state.post.praiseCount = 1;
                }

                this.setState(this.state);
            }
        });
    }
}


const styles = {
    post_root: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 100
    },
    base_info: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    separator: {
        width: 3,
        height: 3,
        borderRadius: '100%',
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#333'
    },
    info_text: {
        fontSize: 12,
        color: '#888'
    },
    pre_tips: {
        color: '#EC407A'
    },
    clickable: {
        cursor: 'pointer'
    },
    tags_root: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10
    }
};


ReactDOM.render(
    <PostDetail />,
    document.getElementById('react-content'));
