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
import * as ReactDOM from "react-dom";

import AppUtils from "../base/utils/AppUtils";
import MiscUtils from "../base/utils/MiscUtils";
import DialogFrame from "../base/DialogFrame";
import BlogBaseFrame from "../base/BlogBaseFrame";
import MarkDownEditor from "../base/markdown/MarkDownEditor";
import {RetCodes} from "../../base/RetCodes";

import CategorySelector from "./CategorySelector";
import PostTagSelector from "./PostTagSelector";

const buttonStyles = require('./button.css');


interface PostDetail {
    title?: string;
    previewContent?: string;
    content?: string;
    tags?: string[];
    categories?: string[];
}


export default class WriteNewPost extends React.Component<any, any> {

    modifyPostId: string = null;
    post: PostDetail;


    refs: {
        [key: string]: ReactInstance;
        previewInput: HTMLTextAreaElement;
        tags: PostTagSelector;
    };


    constructor(props: any) {
        super(props);

        this.post = {};
        this.state = {
            showPreview: true,
            showFillInfo: false
        };
    }

    static reset(post: any) {
        post.title = '';
        post.previewContent = '';
        post.content = '';
        post.categories = [];
        post.tags = null;
    }

    componentDidMount() {
        if (window.location.search) {
            let match = window.location.search.match(/post_id=(.*)/i);
            if (match && match.length >= 2) {
                this.modifyPostId = match[1];
            }
        }

        if (this.modifyPostId && this.modifyPostId.length > 0) {
            $.get(MiscUtils.postDetailCgi(this.modifyPostId, true), (data: any) => {
                if (data && data.ret === RetCodes.OK
                    && data.post && data.post._id === this.modifyPostId) {

                    this.post = data.post;
                } else {
                    this.post = {};
                    this.modifyPostId = null;
                }

                this.setState({});
            });
        }

        this.handleFocus();
    }

    componentDidUpdate() {
        this.handleFocus();
    }

    handleFocus() {
        if (this.state.showFillInfo && this.refs.previewInput) {
            this.refs.previewInput.focus();
        }
    }

    render() {
        return (
            <BlogBaseFrame>
                <div style={styles.root}>
                    <div style={styles.editor_root}>
                        <div style={styles.title_zone}>
                            <h1 style={{flex: 1}}>写新文章</h1>

                            <span
                                style={{paddingLeft: 50, paddingRight: 50}}
                                className={buttonStyles.blueButton}
                                onClick={this.prepareSendPost.bind(this)}>发表</span>
                            <span
                                style={{paddingLeft: 50, paddingRight: 50, marginLeft: 20}}
                                className={buttonStyles.redButton}
                                onClick={this.cancelWritePost.bind(this)}>取消</span>

                            <div style={styles.vert_line}/>

                            <span
                                style={{paddingLeft: 20, paddingRight: 20}}
                                className={buttonStyles.blueButton}
                                onClick={() => {this.setState({showPreview: !this.state.showPreview})}}>
                            {this.state.showPreview ? '隐藏预览' : '展示预览'}
                        </span>
                        </div>

                        <input
                            placeholder='请输入文章标题'
                            style={styles.title}
                            value={this.post.title}
                            onChange={this.onTitleChanged.bind(this)}/>

                        <MarkDownEditor
                            source={this.post.content}
                            style={{flex: 1, backgroundColor: 'white'}}
                            showPreview={this.state.showPreview}
                            onContentChanged={this.onContentChanged.bind(this)}/>
                    </div>

                    {this.renderFillInfoFrame()}
                </div>
            </BlogBaseFrame>
        );
    }

    renderFillInfoFrame() {
        if (!this.state.showFillInfo) {
            return null;
        }

        let tags = this.post.tags;
        if (this.post.tags) {
            this.post.tags = null;
        }

        return (
            <DialogFrame
                ref='dialog'
                zIndex={10}
                style={{padding: '10px 40px 40px 40px', zIndex: 1000, width: 700}}
                show={true}>

                <h2>完善其他信息</h2>

                <CategorySelector
                    seledCategories={this.post.categories}
                    onCategoriesChanged={this.onCategoriesChanged.bind(this)}/>

                <PostTagSelector tags={tags} ref='tags'/>

                <textarea
                    ref='previewInput'
                    className='with-scroll-bar'
                    placeholder='请输入文章简介...'
                    value={this.post.previewContent}
                    onChange={this.onPreviewContentChanged.bind(this)}
                    style={styles.preview_content}/>

                <div
                    style={{display: 'flex', flexDirection: 'row', marginTop: 30, justifyContent: 'flex-end'}}>
                    <span
                        style={{paddingLeft: 50, paddingRight: 50}}
                        className={buttonStyles.redButton}
                        onClick={() => this.cancelFillInfo(true)}>取消</span>
                    <span
                        style={{paddingLeft: 50, paddingRight: 50, marginLeft: 40}}
                        className={buttonStyles.blueButton}
                        onClick={this.sendPost.bind(this)}>发表</span>
                </div>
            </DialogFrame>
        );
    }

    onPreviewContentChanged(event: FormEvent<HTMLTextAreaElement>) {
        this.post.previewContent = (event.target as HTMLTextAreaElement).value;
        this.setState({});
    }

    onContentChanged(content: string) {
        this.post.content = content;
        this.setState({});
    }

    onCategoriesChanged(categories: string[]) {
        this.post.categories = categories;
        this.setState({});
    }

    onTitleChanged(event: FormEvent<HTMLInputElement>) {
        this.post.title = (event.target as HTMLInputElement).value;
        this.setState({});
    }

    cancelWritePost() {
        location.href = '/admin';
    }

    cancelFillInfo(syncTags?: boolean) {
        if (syncTags) {
            this.post.tags = this.refs.tags.getTags();
        }

        this.setState({showFillInfo: false});
    }

    prepareSendPost() {
        if (!this.post.title || this.post.title === '') {
            AppUtils.showTips('请输入文章标题');
            return;
        }

        this.setState({showFillInfo: true});
    }

    sendPost() {
        if (!this.post.title || this.post.title === '') {
            AppUtils.showTips('请输入文章标题');
            return;
        }

        let postInfo = {
            title: this.post.title,
            previewContent: this.post.previewContent,
            content: this.post.content,
            categories: this.post.categories,
            tags: this.refs.tags.getTags()
        };

        let router = '/add_post';
        if (this.modifyPostId && this.modifyPostId.length > 0) {
            router = `/modify_post/${this.modifyPostId}`;
        }

        $.post(router, JSON.stringify(postInfo), (data: any) => {
            if (data && data.ret === RetCodes.OK) {
                WriteNewPost.reset(this.post);
                this.cancelFillInfo(false);
                AppUtils.showTips('文章已发布！');

                location.href = '/write_new_post';
            }
        });
    }
}


const styles = {
    root: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundImage: 'url(/main_bkg.jpg)'
    },
    editor_root: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        margin: 20
    },
    preview_content: {
        height: 200,
        fontSize: 16,
        textAlign: 'top',
        outline: 'none',
        padding: 15,
        border: 'solid 1px #ddd'
    },
    title_zone: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'rgba(128, 203, 196, 0.6)'
    },
    title: {
        fontSize: 20,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        color: '#01579B',
        border: 'dashed 1px #FFCDD2',
        outline: 'none'
    },
    vert_line: {
        backgroundColor: 'white',
        marginLeft: 40,
        marginRight: 40,
        width: 1,
        height: 40
    },
    category_selector: {
        marginBottom: 20,
        border: 'solid 1px #ddd',
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        outline: 'none'
    },
    category_option: {
        paddingTop: 10,
        paddingBottom: 10
    }
};


ReactDOM.render(
    <WriteNewPost />,
    document.getElementById('react-content'));