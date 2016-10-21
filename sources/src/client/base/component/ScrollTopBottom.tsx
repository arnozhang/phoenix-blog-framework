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
import * as $ from "jquery";

import FontAwesome from "./FontAwesome";

const cssStyles = require('../base.css');


interface Props {
    scrollContent?: string;
}


export default class ScrollTopBottom extends React.Component<Props, any> {

    render() {
        return (
            <div style={styles.scroll_pin}>
                <FontAwesome
                    name='arrow-up'
                    className={cssStyles.scrollToBtn}
                    style={{marginBottom: 15}}
                    onClick={() => this.scrollToTop()}/>

                <FontAwesome
                    name='arrow-down'
                    className={cssStyles.scrollToBtn}
                    onClick={() => this.scrollToBottom()}/>
            </div>
        );
    }

    scrollToTop() {
        $(this.props.scrollContent).animate({scrollTop: 0}, 'slow');
    }

    scrollToBottom() {
        let node = $(this.props.scrollContent);
        node.animate({scrollTop: node[0].scrollHeight}, 'slow');
    }
}


const styles = {
    scroll_pin: {
        display: 'flex',
        flexDirection: 'column',
        adjustContent: 'center',
        alignItems: 'center',
        padding: '10px 15px',
        position: 'absolute',
        bottom: 40,
        right: 40,
        borderRadius: 10,
        backgroundColor: 'rgba(69, 90, 100, 0.8)',
        cursor: 'pointer'
    }
};
