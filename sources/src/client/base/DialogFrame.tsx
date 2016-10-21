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
import {ReactInstance} from "react";

const cssStyles = require('./base.css');


interface Props {
    style?: React.CSSProperties;
    show?: boolean;
    cannotCancel?: boolean;
    zIndex?: number;
}


export default class DialogFrame extends React.Component<Props, any> {

    refs: {
        [key: string]: ReactInstance;
        root: HTMLElement;
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            show: this.props.show
        };
    }

    componentDidMount() {
        if (this.refs.root) {
            this.refs.root.focus();
        }
    }

    componentDidUpdate() {
        if (this.refs.root) {
            this.refs.root.focus();
        }
    }

    componentWillReceiveProps(props: Props) {
        if (this.props.show !== props.show) {
            this.setState({show: props.show});
        }
    }

    render() {
        if (!this.state.show) {
            return null;
        }

        let style: any = {
            zIndex: this.props.zIndex
        };

        return (
            <div
                style={style}
                ref='root'
                className={cssStyles.dialogRoot}
                tabIndex={100}
                onKeyDown={this.onKeyPress.bind(this)}>
                <div style={this.props.style}
                     className={cssStyles.dialogContent}>
                    {this.props.children}
                </div>
            </div>
        );
    }

    show() {
        this.setState({show: true});
    }

    hide() {
        this.setState({show: false});
    }

    onKeyPress(event: KeyboardEvent) {
        if (event.keyCode == 27) {
            this.hide();
        }
    }
}
