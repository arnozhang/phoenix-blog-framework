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
import * as assign from "lodash/assign";

import MiscUtils from "../../../base/utils/MiscUtils";
import {RetCodes} from "../../../../base/RetCodes";
import PlainLink from "../../../base/component/PlainLink";
import FontAwesome from "../../../base/component/FontAwesome";
import MarkDownContent from "../../../base/markdown/MarkDownContent";
import TitleHeader from "../common/TitleHeader";
import BannerFrame from "../common/BannerFrame";

import {PostDetailRender, PostDetailProps} from "../../BlogRender";

const cssStyles = require('../styles.css');


declare var pageData: any;


export class DefPostDetailRender extends PostDetailRender<PostDetailProps, any> {

    renderPost(post: any) {
        let tags: any = null;
        if (post.tags) {
            tags = (
                <div style={styles.tags_root}>
                    {
                        post.tags.map((tag: string, index: number) => {
                            return (
                                <PlainLink
                                    style={{color: 'inherit'}}
                                    key={index}
                                    className={cssStyles.postTag}
                                    href={`/tag_posts/${tag}`}
                                    text={tag}/>
                            );
                        })
                    }
                </div>
            );
        }

        return (
            <div >
                <TitleHeader title={post.title}>
                    {tags}

                    <div style={styles.base_info}>
                        <span style={styles.info_text}>
                            <span style={styles.pre_tips}>
                                阅读&nbsp;
                            </span>

                            ({MiscUtils.ensure(post.watchCount, 0)})
                        </span>

                        <div style={styles.separator}/>

                        <span style={styles.info_text}>
                            <span style={styles.pre_tips}>
                                评论&nbsp;
                            </span>

                            ({MiscUtils.ensure(post.commentCount, 0)})
                        </span>

                        <div style={styles.separator}/>

                        <span
                            style={assign({}, styles.clickable, styles.info_text)}
                            onClick={this.props.praisePost}>
                            <span style={styles.pre_tips}>
                                点赞&nbsp;
                            </span>

                            ({MiscUtils.ensure(post.praiseCount, 0)})
                        </span>

                        <div style={styles.separator}/>

                        <span style={styles.info_text}>
                            {MiscUtils.getTimeDesc(post.publishTimestamp)}
                        </span>

                        <div className={cssStyles.praiseBtn}
                             onClick={this.props.praisePost}>
                            <FontAwesome name='thumbs-up'/>
                            <span
                                style={{marginLeft: 4, fontSize: 12}}>
                                赞赏博主
                            </span>
                        </div>
                    </div>
                </TitleHeader>

                <MarkDownContent
                    style={styles.post_root}
                    source={post.content}/>

                <div style={{marginTop: 20, marginLeft: 40, marginBottom: 60}}>
                    此博文来自于：
                    <PlainLink href={location.href} text={location.protocol + '//' + location.host}/>
                </div>
            </div>
        );
    }

    render() {
        let post: any = null;
        if (this.props.post) {
            post = this.renderPost(this.props.post);
        } else if (!this.props.loading) {
            post = <div style={{fontSize: 20, margin: 60}}>该帖子不存在！</div>;
        }

        return (
            <BannerFrame>
                {post}
            </BannerFrame>
        );
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
