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
import * as assign from "lodash/assign";
import * as ReactCodeMirror from "react-codemirror";

import MarkDownContent from "./MarkDownContent";
import AppUtils from "../utils/AppUtils";
import {RetCodes} from "../../../base/RetCodes";


// For Codemirror Highlight.
//
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
require('codemirror/mode/css/css');
require('codemirror/mode/clike/clike');



interface Props {
    style: any;
    source?: string;
    showPreview?: boolean;
    onContentChanged: (content: string) => void;
}


export default class MarkDownEditor extends React.Component<Props, any> {

    content: string;
    pasteEventHandler: (instance: any, event: any) => void;


    refs: {
        [key: string]: ReactInstance;
        display: MarkDownContent;
        codeMirror: any;        // actually is ReactCodeMirror
    };

    constructor(props: Props) {
        super(props);

        this.content = this.props.source;
        this.pasteEventHandler = this.onHandlePaste.bind(this);
    }

    componentDidMount() {
        this.installPastHook();
    }

    componentDidUpdate() {
        this.installPastHook();
    }

    installPastHook() {
        let codeMirror: any = this.refs.codeMirror.getCodeMirror();
        codeMirror.off('paste', this.pasteEventHandler);
        codeMirror.on('paste', this.pasteEventHandler);
    }

    onHandlePaste(instance: any, event: any) {
        if (!event.clipboardData
            || !event.clipboardData.items
            || !event.clipboardData.types
            || event.clipboardData.items.length <= 0
            || event.clipboardData.types.length <= 0) {
            return;
        }

        if (event.clipboardData.types[0] !== 'Files') {
            return;
        }

        let item = event.clipboardData.items[0];
        if (!item) {
            return;
        }

        let blob = item.getAsFile();
        if (!blob) {
            return;
        }

        let reader = new FileReader();
        reader.onload = (e: any) => {
            let imageData = e.target.result;
            if (imageData) {
                this.uploadImage(imageData);
            }
        };

        reader.readAsDataURL(blob);
    }

    uploadImage(imageData: string) {
        $.post('/upload_file/image', imageData, (data: any) => {
            if (!data || data.ret != RetCodes.OK) {
                AppUtils.showTips('图片上传失败！');
                return;
            }

            if (data.url) {
                let tips = '请输入名称';
                let codeMirror: any = this.refs.codeMirror.getCodeMirror();
                let encode = `![${tips}](${data.url})`;
                let start = codeMirror.getCursor(true);
                let end = codeMirror.getCursor(false);

                codeMirror.replaceSelection(encode);
                codeMirror.setSelection(
                    {line: start.line, ch: start.ch + 2},
                    {line: start.line, ch: start.ch + 2 + tips.length}
                );
            }
        });
    }

    componentWillReceiveProps(nextProps: Props) {
        this.content = nextProps.source;
        this.setState({});
    }

    render() {
        let options = {
            mode: 'markdown',
            theme: 'arno-phoenix',
            lineNumbers: true
        };

        let preview: any = null;
        if (this.props.showPreview) {
            preview = (
                <div style={styles.panel_wrapper}>
                    <div style={styles.content_panel} className='with-scroll-bar'>
                        <MarkDownContent
                            ref='display'
                            source={this.content}/>
                    </div>
                </div>
            );
        }

        return (
            <div style={assign({}, this.props.style, styles.editor_root)}>
                <div style={styles.panel_wrapper} className='editor-panel with-scroll-bar'>
                    <ReactCodeMirror
                        ref='codeMirror'
                        options={options}
                        value={this.content}
                        onChange={(content: string) => this.onContentChanged(content)}/>
                </div>

                {
                    this.props.showPreview
                        ? <span style={{height: '100%', width: 1, backgroundColor: '#fff'}}/>
                        : null
                }

                {preview}
            </div>
        );
    }

    onContentChanged(content: string) {
        this.content = content;
        this.refs.display.updateContent(content);
        this.props.onContentChanged(content);
        this.setState({});
    }
}


const styles = {
    editor_root: {
        display: 'flex',
        flexDirection: 'row'
    },
    panel_wrapper: {
        flex: 1,
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    content_panel: {
        paddingLeft: 20,
        paddingBottom: 10,
        paddingRight: 10,
        paddingTop: 10,
        borderLeft: 'dotted 1px #1976D2',
        overflow: 'auto',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    }
};
