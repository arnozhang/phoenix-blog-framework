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
import HeadBanner from "./HeadBanner";

import BlogFooter from "../../../base/BlogFooter";
import MiscUtils from "../../../base/utils/MiscUtils";
import ScrollTopBottom from "../../../base/component/ScrollTopBottom";

import MobileHeadBanner from "./MobileHeadBanner";


interface Props {
    changeTitle?: boolean;
}


class FrameForDesktop extends React.Component<Props, any> {

    static innerStyles = {
        root: {
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#33888b',
            backgroundSize: 'cover',
            backgroundImage: 'url(/main_bkg_2.jpg)'
        } as React.CSSProperties,
        content_root: {
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '10%',
            right: '10%',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px'
        },
        content: {
            flex: 1,
            backgroundColor: 'white'
        },
        banner: {
            width: 305,
            overflowY: 'auto',
            backgroundColor: 'rgba(69, 90, 100, 0.5)'
        }
    };

    render() {
        return (
            <div style={FrameForDesktop.innerStyles.root}>
                <div style={FrameForDesktop.innerStyles.content_root}>
                    <div style={FrameForDesktop.innerStyles.banner} className='with-scroll-bar'>
                        <HeadBanner changeTitle={this.props.changeTitle}/>
                    </div>

                    <div style={FrameForDesktop.innerStyles.content}
                         className='with-scroll-bar banner-frame-content'>
                        {this.props.children}

                        <BlogFooter/>
                    </div>
                </div>

                <ScrollTopBottom scrollContent='.banner-frame-content'/>
            </div>
        );
    }
}

class FrameForMobile extends React.Component<Props, any> {

    static innerStyles = {
        root: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#0f3041',
            backgroundSize: 'cover',
            backgroundImage: 'url(/main_bkg_2.jpg)'
        },
        content_root: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white'
        }
    };

    render() {
        return (
            <div style={FrameForMobile.innerStyles.root}>
                <MobileHeadBanner changeTitle={this.props.changeTitle}/>

                <div style={FrameForMobile.innerStyles.content_root}>
                    {this.props.children}
                    <BlogFooter/>
                </div>
            </div>
        );
    }
}


export default class BannerFrame extends React.Component<Props, any> {

    render() {
        if (!MiscUtils.visitByMobile()) {
            return (
                <FrameForDesktop changeTitle={this.props.changeTitle}>
                    {this.props.children}
                </FrameForDesktop>
            );
        } else {
            return (
                <FrameForMobile changeTitle={this.props.changeTitle}>
                    {this.props.children}
                </FrameForMobile>
            );
        }
    }
}
