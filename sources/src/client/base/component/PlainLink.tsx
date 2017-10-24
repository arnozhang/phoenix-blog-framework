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


interface Props {
    style?: React.CSSProperties;
    className?: string;
    href?: string;
    selfWindow?: boolean;
    text?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}


export default class PlainLink extends React.Component<Props, any> {

    render() {
        let className = 'plain-link';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return (
            <a className={className}
               style={this.props.style}
               target={this.props.selfWindow ? '_self' : '_blank'}
               href={this.props.href}
               onClick={this.props.onClick}>
                {this.props.text ? this.props.text : this.props.children}
            </a>
        );
    }
}
