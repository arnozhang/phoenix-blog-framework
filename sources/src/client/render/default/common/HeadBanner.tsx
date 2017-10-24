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

import MiscUtils from "../../../base/utils/MiscUtils";
import FontAwesome from "../../../base/component/FontAwesome";
import PlainLink from "../../../base/component/PlainLink";

import BaseHeadBanner, {HeadBannerProps} from "./BaseHeadBanner";

const cssStyles = require('../default-styles.css');


interface TagItemProps {
    href: string;
    text: string;
}


class TagItem extends React.Component<TagItemProps, any> {

    render() {
        return (
            <PlainLink
                style={{color: 'white'}}
                className={cssStyles.categoryItem}
                href={this.props.href}>
                <FontAwesome
                    name='bookmark'
                    style={{marginRight: 10, color: '#80DEEA'}}/>

                {this.props.text}
            </PlainLink>
        );
    }
}


export default class HeadBanner extends BaseHeadBanner< any> {

    constructor(props: HeadBannerProps) {
        super(props);

        this.state = {};
    }

    render() {
        let root = {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflowX: 'hidden'
        } as React.CSSProperties;

        return (
            <div style={root}>
                {this.renderUserInfo()}

                <div style={styles.horz_line}/>
                <TagItem href='/tag_list' text='查看文章标签'/>
                <TagItem href='/timeline_list' text='查看时间轴'/>

                {this.renderCategories()}
            </div>
        );
    }

    renderUserInfo() {
        let info = this.state && this.state.info ? this.state.info : {};

        let rootStyle = {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        } as React.CSSProperties;

        return (
            <div style={rootStyle}>
                <PlainLink href='/' selfWindow={true}>
                    <img
                        style={styles.head_portrait}
                        src={MiscUtils.ensure(info.portrait, '/default_portrait.png')}/>
                </PlainLink>

                <PlainLink className={cssStyles.mainSite} href='/' selfWindow={true}>
                    {MiscUtils.ensure(info.siteTitle, '主站')}
                </PlainLink>
                <span style={{fontSize: 15, marginTop: 15, color: 'white'}}>
                    {info.subTitle}
                </span>

                <div style={styles.count_root}>
                    <PlainLink style={styles.count_item} href='/' selfWindow={true}>
                        <span style={styles.count}>阅读</span>
                        <span style={styles.count}>
                            {MiscUtils.ensure(info.watchCount, 0)}
                        </span>
                    </PlainLink>

                    <div style={styles.vert_line}></div>

                    <PlainLink style={styles.count_item} href='/' selfWindow={true}>
                        <span style={styles.count}>文章</span>
                        <span style={styles.count}>
                            {MiscUtils.ensure(info.postCount, 0)}&nbsp;篇
                        </span>
                    </PlainLink>

                    <div style={styles.vert_line}></div>

                    <div style={styles.count_item}>
                        <span style={styles.count}>赞赏</span>
                        <span style={styles.count}>
                            {MiscUtils.ensure(info.praiseCount, 0)}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    renderCategories() {
        if (!this.state.categories) {
            return null;
        }

        return this.state.categories.map((category: any, index: number) => {
            return (
                <TagItem
                    key={index}
                    href={`/category_post/${category._id}`}
                    text={`${category.name} (${category.postCount ? category.postCount : 0})`}/>
            );
        });
    }
}


const styles = {
    head_portrait: {
        width: 100,
        height: 100,
        marginTop: 80,
        marginBottom: 30,
        borderRadius: '50%',
        border: 'solid 3px rgba(255, 255, 255, 0.7)',
        cursor: 'pointer',
        userSelect: 'none'
    } as React.CSSProperties,
    count_root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    } as React.CSSProperties,
    count: {
        color: 'white',
        fontSize: 14,
        marginTop: 5
    } as React.CSSProperties,
    count_item: {
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        alignItems: 'center'
    } as React.CSSProperties,
    vert_line: {
        width: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        height: 40,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 5
    } as React.CSSProperties,
    horz_line: {
        width: '100%',
        height: 1,
        marginTop: 50,
        marginBottom: 40,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    } as React.CSSProperties
};
