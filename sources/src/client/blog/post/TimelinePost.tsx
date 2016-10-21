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
import * as $ from "jquery";

import RenderEngines from "../../render/RenderEngines";


export default class PostTimeline extends React.Component<any, any> {

    list: any[] = null;


    componentDidMount() {
        $.get('/post_timeline_list', (data: any) => {
            this.list = data.list;
            this.setState({});
        });
    }

    render() {
        let TimeListRender_ = RenderEngines.getRender().timelineList;
        return (
            <TimeListRender_ list={this.list}/>
        );
    }
}


ReactDOM.render(
    <PostTimeline />,
    document.getElementById('react-content'));
