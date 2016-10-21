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

import MiscUtils from "../../../base/utils/MiscUtils";
import FontAwesome from "../../../base/component/FontAwesome";

const cssStyles = require('../../../blog/homepage/homepage.css');


interface Props {
    style?: React.CSSProperties;
    title?: string;
}


export default class TitleHeader extends React.Component<Props, any> {

    render() {
        let title: any = null;
        let icon: any = null;
        if (MiscUtils.visitByMobile()) {
            title = <h2 style={{marginTop: 0, marginBottom: 0}}>{this.props.title}</h2>;
        } else {
            title = <h1 style={{marginBottom: 15}}>{this.props.title}</h1>;
            icon = <FontAwesome
                name='book'
                style={{marginRight: 15, marginTop: 8, fontSize: 24, color: '#F06292'}}/>;
        }

        return (
            <div style={this.props.style} className={cssStyles.titleHeader}>
                <div style={styles.title_root}>
                    {icon}
                    {title}
                </div>

                {this.props.children}
            </div>
        );
    }
}


const styles = {
    title_root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    }
};
