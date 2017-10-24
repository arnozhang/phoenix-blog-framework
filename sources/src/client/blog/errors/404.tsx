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

import BlogFooter from "../../base/BlogFooter";
import FontAwesome from "../../base/component/FontAwesome";
import RenderEngines from "../../render/RenderEngines";
import {ReactStyles} from "../../base/component/ReactStyles";


export class Error404Page extends React.Component<any, any> {

    render() {
        let Error404Render_ = RenderEngines.getRender()._404;
        if (Error404Render_) {
            return (
                <Error404Render_ />
            );
        }

        return this.default404();
    }

    default404() {
        return (
            <div style={styles.root}>
                <div style={styles.content}>
                    <div style={styles.tips_root_content}>
                        <div style={styles.tips_content}>
                            <FontAwesome
                                style={{color: '#EF5350', fontSize: 50}}
                                name='exclamation-triangle'/>
                            <span style={{fontSize: 24, marginLeft: 20}}>
                                抱歉，没找到该页面！
                            </span>
                        </div>

                        <a style={{marginTop: 30, fontSize: 20}} href='/'>访问博客首页</a>
                    </div>

                    <BlogFooter style={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}/>
                </div>
            </div>
        );
    }
}


const styles: ReactStyles = {
    root: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafafa'
    },
    content: {
        border: 'solid 2px #EF9A9A',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 20,
        marginBottom: 80,
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px'
    },
    tips_root_content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 150,
        marginBottom: 100,
        marginLeft: 240,
        marginRight: 240
    },
    tips_content: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
};


ReactDOM.render(
    <Error404Page />,
    document.getElementById('react-content'));
