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
import {FormEvent, ReactInstance} from "react";

import {RetCodes} from "../../base/RetCodes";
import AppUtils from "../base/utils/AppUtils";
import PlainLink from "../base/component/PlainLink";
import AdminFrame, {ManageTabType} from "./AdminFrame";
import PostList, {PostListFetcher} from "../blog/post/PostList";

const buttonStyles = require('./button.css');


interface Props {
    tabType?: ManageTabType;
    fetcher?: PostListFetcher;
    pageJumpIndex?: string;
}


export default class AdminPostPreviewFrame extends React.Component<Props, any> {

    publishTimestamp: string = '';
    refs: {
        [key: string]: ReactInstance;
        postList: PostList;
    };


    componentDidUpdate() {
        let inputRef = AppUtils.getRef('publishTimestamp');
        if (inputRef) {
            (inputRef as HTMLInputElement).focus();
        }
    }

    render() {
        return (
            <AdminFrame tabType={this.props.tabType}>
                <PostList
                    ref='postList'
                    fromInternal={true}
                    fetcher={this.props.fetcher}
                    pageJumpIndex={this.props.pageJumpIndex}
                    hideCategoryTitle={true}
                    previewExtraRender={this.previewExtraRender.bind(this)}/>
            </AdminFrame>
        );
    }

    previewExtraRender(post: any) {
        return (
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: 40, marginRight: 20}}>
                <PlainLink
                    style={{paddingTop: 5, paddingBottom: 5, fontSize: 13, color: 'white'}}
                    className={buttonStyles.blueButton}
                    href={`/write_new_post?post_id=${post._id}`}
                    text='修改'/>
                <PlainLink
                    style={{paddingTop: 5, paddingBottom: 5, marginTop: 10, fontSize: 13, color: 'white'}}
                    className={buttonStyles.blueButton}
                    onClick={(e: any) => this.modifyTimestamp(post._id)}
                    text='修改时间'/>
                <PlainLink
                    style={{paddingTop: 5, paddingBottom: 5, marginTop: 10, fontSize: 13, color: 'white'}}
                    className={buttonStyles.redButton}
                    onClick={() => this.deletePost(post._id)}
                    text='删除'/>
            </div>
        );
    }

    deletePost(postId: string) {
        AppUtils.showTwoBtnDialog('确定要删除该帖子吗？', '取消', '确定', null, () => {
            $.post(`/remove_post/${postId}`, (data: any) => {
                if (data && data.ret === RetCodes.OK) {
                    AppUtils.showTips('已删除帖子！');
                    this.refs.postList.removePost(postId);
                } else {
                    AppUtils.showTips('删除帖子失败！' + data ? data.error : null);
                }
            });
        });
    }

    modifyTimestamp(postId: string) {
        let render = () => {
            return (
                <input
                    ref='publishTimestamp'
                    style={styles.input}
                    value={this.publishTimestamp}
                    placeholder='请输入发布时间...'
                    onChange={this.onPublishTimestampChanged.bind(this)}/>
            );
        };

        AppUtils.showTwoBtnDialog(null, '取消', '确定', null, () => {
            let value = this.publishTimestamp.trim();
            if (value.length <= 0) {
                AppUtils.showTips('请输入时间，例如： 2016-9-13 12:25:14');
                return true;
            }

            let date = new Date(value);
            if (!(date.getFullYear() > 0 && date.getMonth() >= 0 && date.getDate() > 0
                && date.getHours() >= 0 && date.getMinutes() >= 0 && date.getSeconds() >= 0)) {
                AppUtils.showTips('请输入正确的时间格式，例如： 2016-9-13 12:25:14');
                return true;
            }

            $.post(`/modify_publish_timestamp/${postId}?time=${date.getTime()}`, (data: any) => {
                if (data && data.ret === RetCodes.OK) {
                    AppUtils.showTips('帖子发布时间修改成功！');
                } else {
                    AppUtils.showTips('帖子发布时间修改失败！' + data ? data.error : null);
                    return true;
                }
            });
        }, render);
    }

    onPublishTimestampChanged(event: FormEvent<HTMLInputElement>) {
        this.publishTimestamp = (event.target as HTMLInputElement).value;
        this.setState({});
    }
}


const styles = {
    input: {
        width: 320,
        border: 'solid 1px #ddd',
        outline: 'none',
        padding: 15,
        fontSize: 16,
        color: '#EC407A'
    }
};
