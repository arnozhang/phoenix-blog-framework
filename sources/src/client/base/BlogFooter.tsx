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

import PlainLink from "./component/PlainLink";
import assign = require("lodash/assign");


interface Props {
    style?: React.CSSProperties;
}


export default class BlogFooter extends React.Component<Props, any> {

    render() {
        return (
            <div style={assign({}, styles.footer, this.props.style)}>
                <img
                    style={{width: 12, height: 12, marginRight: 8}}
                    src='/favicon.ico'/>

                <span style={{fontSize: 12, WebkitUserSelect: 'none'}}>
                    Copyright © 2016-2016 build by
                    <PlainLink
                        href='https://github.com/arnozhang/phoenix_blog'
                        text='github@phoenix_blog'/>
                    .
                </span>
            </div>
        );
    }
}


const styles = {
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 40,
        paddingBottom: 20,
        backgroundColor: '#E8F2F1'
    }
};
