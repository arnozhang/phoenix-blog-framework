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


declare var hljs: any;


interface Props {
    content: string;
    language: string;
}


export default class CodeBlock extends React.Component<Props, any> {

    refs: {
        [key: string]: ReactInstance;
        code: Element;
    };

    componentDidMount() {
        this.highlightCode();
    }

    componentDidUpdate() {
        this.highlightCode();
    }

    highlightCode() {
        hljs.highlightBlock(this.refs.code);
    }

    render() {
        return (
            <pre>
                <code className={this.props.language} ref='code'>
                    {this.props.content}
                </code>
            </pre>
        );
    }
}
