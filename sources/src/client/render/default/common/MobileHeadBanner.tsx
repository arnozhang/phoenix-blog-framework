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
import PlainLink from "../../../base/component/PlainLink";

import BaseHeadBanner, {HeadBannerProps} from "./BaseHeadBanner";

const cssStyles = require('../default-styles.css');


export default class MobileHeadBanner extends BaseHeadBanner<any> {

    constructor(props: HeadBannerProps) {
        super(props);

        this.state = {};
    }

    render() {
        let info = this.state.info ? this.state.info : {};

        return (
            <div style={styles.root}>
                <div
                    style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <PlainLink href='/' selfWindow={true}>
                        <img
                            style={styles.head_portrait}
                            src={MiscUtils.ensure(info.portrait, '/default_portrait.png')}/>
                    </PlainLink>

                    <div
                        style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                        <PlainLink
                            style={{fontSize: 20}}
                            className={cssStyles.mainSite}
                            href='/' selfWindow={true}>
                            {MiscUtils.ensure(info.siteTitle, '主站')}
                        </PlainLink>
                        <span
                            style={{fontSize: 14, color: 'white'}}>
                            {info.subTitle}
                        </span>

                        <div style={styles.bottom_info}>
                            <span style={styles.info_text}>
                                <PlainLink style={styles.pre_tips} href='/' selfWindow={true}>
                                    阅读&nbsp;
                                </PlainLink>

                                ({MiscUtils.ensure(info.watchCount, 0)})
                            </span>

                            <div style={styles.separator}/>

                            <span style={styles.info_text}>
                                <PlainLink style={styles.pre_tips} href='/' selfWindow={true}>
                                    文章&nbsp;
                                </PlainLink>

                                ({MiscUtils.ensure(info.postCount, 0)}&nbsp;篇)
                            </span>

                            <div style={styles.separator}/>

                            <span style={styles.info_text}>
                                <span style={styles.pre_tips}>
                                    赞赏&nbsp;
                                </span>

                                ({MiscUtils.ensure(info.praiseCount, 0)})
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const styles = {
    root: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 30,
        paddingBottom: 30,
        display: 'flex',
        flexDirection: 'column'
    } as React.CSSProperties,
    head_portrait: {
        width: 100,
        height: 100,
        marginRight: 20,
        borderRadius: '50%',
        border: 'solid 3px rgba(255, 255, 255, 0.7)',
        cursor: 'pointer',
        userSelect: 'none'
    } as React.CSSProperties,
    bottom_info: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginTop: 5
    } as React.CSSProperties,
    separator: {
        width: 3,
        height: 3,
        borderRadius: '100%',
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'white'
    } as React.CSSProperties,
    info_text: {
        fontSize: 12,
        color: '#ddd'
    } as React.CSSProperties,
    pre_tips: {
        color: '#EC407A',
        cursor: 'pointer'
    } as React.CSSProperties
};
