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

import PlainLink from "../../base/component/PlainLink";

import TitleHeader from "../../render/default/common/TitleHeader";
import BannerFrame from "../../render/default/common/BannerFrame";


export default class PostTimeline extends React.Component<any, any> {

    list: any[] = null;


    componentDidMount() {
        $.get('/post_timeline_list', (data: any) => {
            this.list = data.list;
            this.setState({});
        });
    }

    render() {
        let postList: any = null;
        if (!this.list || this.list.length <= 0) {
            postList = (
                <span style={{fontSize: 20, marginTop: 40}}>
                    暂无时间轴列表！
                </span>
            );
        } else {
            postList = this.list.map((item: any, index: number) => {
                return (
                    <li>
                        <PlainLink
                            key={index}
                            style={{marginTop: 10}}
                            text={`${item.date} (${Math.max(0, item.count)})`}
                            href={`/timeline_post_detail/${item.year}/${item.month}`}/>
                    </li>
                );
            });
        }

        return (
            <BannerFrame>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <TitleHeader title='时间轴列表'/>
                    <div style={styles.time_list}>
                        <ul>
                            {postList}
                        </ul>
                    </div>
                </div>
            </BannerFrame>
        );
    }
}


const styles = {
    time_list: {
        marginTop: 40,
        marginLeft: 30,
        marginBottom: 80
    }
};


ReactDOM.render(
    <PostTimeline />,
    document.getElementById('react-content'));
