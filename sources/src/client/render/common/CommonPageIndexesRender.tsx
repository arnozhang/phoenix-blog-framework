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
import PlainLink from "../../base/component/PlainLink";
import {PageIndexesRender, PageIndexesProps} from "../BlogRender";

const cssStyles = require('./common-render.css');


export default class CommonPageIndexesRender extends PageIndexesRender<PageIndexesProps, any> {

    pageHref(index: number) {
        if (this.props.pageJumpIndex && this.props.pageJumpIndex.length > 0) {
            if (index == 0) {
                return this.props.pageJumpIndex;
            } else {
                return `${this.props.pageJumpIndex}?pageIndex=${index}`;
            }
        }

        if (index == 0) {
            return '/';
        }

        return `?pageIndex=${index}`;
    }

    render() {
        const showCount = 5;

        let indexes: Array<any> = [];
        for (let i = 0; i < Math.min(this.props.pageCount, showCount); ++i) {
            let extraStyle: any = {};

            if (i == this.props.currentPage) {
                extraStyle.backgroundColor = '#eaebec';
            }

            let className = i === this.props.currentPage
                ? cssStyles.pageIndexSelected
                : cssStyles.pageIndex;

            indexes.push((
                <PlainLink
                    key={i}
                    className={className}
                    selfWindow={true}
                    text={`${i + 1}`}
                    href={this.pageHref(i)}/>
            ));
        }

        let prevPage: any = null;
        let nextPage: any = null;

        if (this.props.currentPage > showCount) {
            prevPage = (
                <PlainLink
                    className={cssStyles.pageIndex}
                    selfWindow={true}
                    text='上一页'
                    href={this.pageHref(this.props.currentPage - 1)}/>
            );
        }

        if (this.props.pageCount > showCount
            && this.props.currentPage < this.props.pageCount - 1) {
            nextPage = (
                <PlainLink
                    className={cssStyles.pageIndex}
                    selfWindow={true}
                    text='下一页'
                    href={this.pageHref(this.props.currentPage + 1)}/>
            );
        }

        return (
            <div style={styles.indexes_root}>
                <p style={{fontSize: 13, marginRight: 10}}>
                    共 {this.props.pageCount} 页
                </p>

                {prevPage}
                {indexes}
                {nextPage}

                <PlainLink
                    className={cssStyles.pageIndex}
                    selfWindow={true}
                    text='尾页'
                    href={this.pageHref(this.props.pageCount - 1)}/>
            </div>
        );
    }
}


const styles = {
    indexes_root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 40,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center'
    } as React.CSSProperties
};
