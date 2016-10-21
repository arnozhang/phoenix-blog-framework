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
import *as $ from "jquery";

import {RetCodes} from "../../../base/RetCodes";
import RenderEngines from "../../render/RenderEngines";


export default class TagDetailList extends React.Component<any, any> {

    tags: any[] = [];


    componentDidMount() {
        $.get('/post_tag_list', (data: any) => {
            this.tags = [];
            if (data && data.ret == RetCodes.OK) {
                this.tags = data.tags;
            }

            this.setState({});
        });
    }

    render() {
        let TagDetailListRender_ = RenderEngines.getRender().tagDetailList;
        return (
            <TagDetailListRender_ tags={this.tags}/>
        );
    }
}


const styles = {
    tags_root: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 80
    },
    tag_item: {
        color: 'inherit',
        fontSize: 16,
        marginRight: 20,
        marginTop: 25,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20
    }
};


ReactDOM.render(
    <TagDetailList />,
    document.getElementById('react-content'));
