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

import {RetCodes} from "../../../base/RetCodes";
import MiscUtils from "../../base/utils/MiscUtils";
import PlainLink from "../../base/component/PlainLink";
import MarkDownContent from "../../base/markdown/MarkDownContent";

const cssStyles = require('./../homepage/homepage.css');


interface Props {
    post: any;
    isLast: boolean;
    extraRender?: (post: any) => any;
    fromInternal?: boolean;
}


export default class PostPreview extends React.Component<Props, any> {

    render() {
        let post = this.props.post;
        let postImage: any = null;
        if (post.previewImage && !MiscUtils.visitByMobile()) {
            let style = {
                width: 100,
                height: 100,
                borderRadius: 5,
                border: 'solid 1px #eee'
            };

            postImage = <img style={style} src={post.previewImage}/>;
        }

        let titleStyle: any = null;
        if (MiscUtils.visitByMobile()) {
            titleStyle = {
                fontSize: 16
            };
        }

        return (
            <div className={cssStyles.postPreview}>
                <div style={styles.content_root}>
                    <PlainLink style={titleStyle}
                               className={cssStyles.postTitle}
                               href={this.postClickHref()}>
                        {post.title}
                    </PlainLink>

                    <MarkDownContent
                        style={styles.content}
                        source={post.previewContent}/>

                    <div style={styles.bottom_info}>
                        <span style={styles.info_text}>
                            <PlainLink style={styles.pre_tips} href={this.postClickHref()}>
                                阅读&nbsp;
                            </PlainLink>

                            ({MiscUtils.ensure(post.watchCount, 0)})
                        </span>

                        <div style={styles.separator}/>

                        <span style={styles.info_text}>
                            <PlainLink style={styles.pre_tips} href={this.postClickHref()}>
                                评论&nbsp;
                            </PlainLink>

                            ({MiscUtils.ensure(post.commentCount, 0)})
                        </span>

                        <div style={styles.separator}/>

                        <span style={styles.info_text}>
                            <span style={styles.pre_tips}
                                  onClick={this.onPraisePost.bind(this)}>
                                点赞&nbsp;
                            </span>

                            ({MiscUtils.ensure(post.praiseCount, 0)})
                        </span>

                        <div style={styles.separator}/>

                        <span style={styles.info_text}>
                        {MiscUtils.getTimeDesc(post.publishTimestamp)}
                    </span>
                    </div>
                </div>

                {postImage}
                {this.props.extraRender ? this.props.extraRender(post) : null}
            </div>
        );
    }

    postClickHref() {
        return MiscUtils.postDetailHref(this.props.post._id, this.props.fromInternal);
    }

    onPraisePost() {
        $.get((`/praise_post/${this.props.post._id}`), (data) => {
            if (data && data.ret === RetCodes.OK) {
                if (this.props.post.praiseCount) {
                    ++this.props.post.praiseCount;
                } else {
                    this.props.post.praiseCount = 1;
                }

                this.setState(this.state);
            }
        });
    }
}


const styles = {
    content_root: {
        flex: 1,
    },
    content: {
        fontSize: 14
    },
    bottom_info: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 20,
        marginRight: 10
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
        color: '#EC407A',
        cursor: 'pointer'
    }
};
