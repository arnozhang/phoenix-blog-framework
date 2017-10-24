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
import {FormEvent, ReactInstance} from "react";


interface Props {
    tags: string[];
}


export default class PostTagSelector extends React.Component<Props, any> {

    currentInputTag: string = '';
    tags: string[] = [];
    refs: {
        [key: string]: ReactInstance;
        tagInput: HTMLInputElement;
    };


    constructor(props: Props) {
        super(props);
        this.tags = props.tags;
        if (!this.tags) {
            this.tags = [];
        }
    }

    componentDidUpdate() {
        if (this.refs.tagInput) {
            this.refs.tagInput.focus();
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.tags) {
            this.tags = nextProps.tags;
            this.setState({});
        }
    }

    render() {
        let tags: any = null;
        if (!this.tags || this.tags.length <= 0) {
            tags = <span style={{marginTop: 15}}>暂无标签</span>;
        } else {
            tags = this.tags.map((tag: string, index: number) => {
                return (
                    <div key={index} style={styles.tag_item}
                         onClick={() => this.removeTag(index)}>
                        {tag}
                    </div>
                );
            });
        }

        return (
            <div>
                <div style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
                    <input
                        ref='tagInput'
                        style={styles.input} placeholder='请输入文章标签...'
                        value={this.currentInputTag}
                        onKeyPress={this.onKeyPress.bind(this)}
                        onChange={this.onInputTagChanged.bind(this)}/>
                </div>

                <div style={styles.tags_root}>
                    {tags}
                </div>
            </div>
        );
    }

    onInputTagChanged(event: FormEvent<HTMLInputElement>) {
        this.currentInputTag = event.currentTarget.value;
        this.setState({});
    }

    removeTag(index: number) {
        this.tags.splice(index, 1);
        this.setState({});
    }

    onKeyPress(event: KeyboardEvent) {
        if (event.charCode == 13) {
            // Enter Pressed.
            if (this.currentInputTag && this.currentInputTag.trim().length > 0) {
                this.tags.push(this.currentInputTag.trim());
                this.currentInputTag = '';

                this.setState({});
            }
        }
    }

    getTags() {
        return this.tags;
    }
}


const styles = {
    input: {
        flex: 1,
        border: 'solid 1px #ddd',
        outline: 'none',
        padding: 15,
        fontSize: 16,
        color: '#EC407A'
    } as React.CSSProperties,
    tags_root: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '0 15px 15px 15px',
        backgroundColor: '#f0f0f0',
        marginBottom: 20
    } as React.CSSProperties,
    tag_item: {
        backgroundColor: '#FFEBEE',
        border: 'solid 1px #FFCDD2',
        cursor: 'pointer',
        borderRadius: 5,
        padding: '5px 15px',
        marginTop: 15,
        marginRight: 15,
        fontSize: 15,
        WebkitUserSelect: 'none'
    } as React.CSSProperties
};
