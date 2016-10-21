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
import * as Remarkable from "remarkable";


declare var hljs: any;


interface Props {
    style?: React.CSSProperties;
    source?: string;
}


export default class MarkDownContent extends React.Component<Props, any> {

    remarkable: Remarkable;

    constructor(props: Props) {
        super(props);

        this.state = {
            source: this.props.source
        };

        this.remarkable = new Remarkable({
            langPrefix: 'lang-',
            highlight: (str: string, language: string) => {
                if (language && hljs.getLanguage(language)) {
                    try {
                        return hljs.highlight(language, str).value;
                    } catch (err) {
                    }
                }

                try {
                    return hljs.highlightAuto(str).value;
                } catch (err) {
                }

                return '';
            }
        });
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({source: nextProps.source});
    }

    render() {
        let content = {
            __html: this.remarkable.render(this.state.source)
        };

        return (
            <div
                style={this.props.style}
                dangerouslySetInnerHTML={content}/>
        );
    }

    updateContent(content: string) {
        this.setState({source: content});
    }
}
