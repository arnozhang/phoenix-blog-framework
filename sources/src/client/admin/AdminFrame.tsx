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
import {ReactNode} from "react";

import BlogBaseFrame from "../base/BlogBaseFrame";
import BlogFooter from "../base/BlogFooter";
import ScrollTopBottom from "../base/component/ScrollTopBottom";

let cssStyles = require('./admin.css');
let buttonStyles = require('./button.css');


export enum ManageTabType {
    Index,
    CategoryManager,
    CommentManager,
    WriteNewPost
}


interface ItemProps {
    title: string;
    onClick: () => void;
    isSelected?: boolean;
}


class TabItem extends React.Component<ItemProps, any> {
    render() {
        return (
            <span
                style={{marginRight: 20}}
                className={this.props.isSelected ? buttonStyles.redButton : buttonStyles.blueButton}
                onClick={this.props.onClick}>
                {this.props.title}
            </span>
        );
    }
}


interface Props {
    tabType: ManageTabType;
    extraNodes?: ReactNode;
    style?: React.CSSProperties;
}


export default class AdminFrame extends React.Component<Props, any> {

    render() {
        return (
            <BlogBaseFrame>
                <div style={styles.admin_root}>
                    <div style={styles.content_root}>
                        <div className='with-scroll-bar content-root-frame'>
                            <div style={{flexDirection: 'row', alignItems: 'center'}}
                                 className={cssStyles.titleHeader}>
                                <img style={{width: 36, height: 36, marginRight: 15}}
                                     src='/blog-icon.png'/>
                                <h1>后台管理系统</h1>
                            </div>

                            <div style={styles.tabs}>
                                <div style={{flex: 1}}>
                                    <TabItem
                                        title='文章列表'
                                        onClick={() => this.gotoPage('/admin')}
                                        isSelected={this.props.tabType == ManageTabType.Index}/>

                                    <TabItem
                                        title='分类管理'
                                        onClick={() => this.gotoPage('/category_manager')}
                                        isSelected={this.props.tabType == ManageTabType.CategoryManager}/>

                                    <TabItem
                                        title='评论管理'
                                        onClick={() => this.gotoPage('/comment_manager')}
                                        isSelected={this.props.tabType == ManageTabType.CommentManager}/>

                                    <TabItem
                                        title='写新文章'
                                        onClick={() => this.gotoPage('/write_new_post')}
                                        isSelected={this.props.tabType == ManageTabType.WriteNewPost}/>
                                </div>

                                {this.props.extraNodes}
                            </div>

                            <div style={this.props.style}>
                                {this.props.children}
                            </div>

                            <BlogFooter/>
                        </div>
                    </div>

                    <ScrollTopBottom scrollContent='.content-root-frame'/>
                </div>
            </BlogBaseFrame>
        );
    }

    gotoPage(target: string) {
        location.href = target;
    }
}


const styles = {
    admin_root: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(/main_bkg_1.jpg)',
        backgroundSize: 'cover'
    } as React.CSSProperties,
    content_root: {
        left: '10%',
        right: '10%',
        top: 0,
        bottom: 0,
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px'
    } as React.CSSProperties,
    tabs: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#B2DFDB',
        display: 'flex',
        flexDirection: 'row'
    } as React.CSSProperties
};
