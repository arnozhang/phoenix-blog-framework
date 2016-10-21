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


export interface HeadBannerProps {
    changeTitle?: boolean;
}


export default class BaseHeadBanner<S> extends React.Component<HeadBannerProps, any> {

    state: any;

    constructor(props: HeadBannerProps) {
        super(props);
    }

    componentDidMount() {
        $.get('/user_info', (data: any) => {
            if (this.props.changeTitle && data && data.siteTitle) {
                document.title = data.siteTitle;
            }

            this.setState({info: data});
        });

        $.get('/category_list', (data: any) => {
            this.setState({categories: data.categories});
        });
    }
}
