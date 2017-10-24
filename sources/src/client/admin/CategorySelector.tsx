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

import {RetCodes} from "../../base/RetCodes";
import {ReactStyles} from "../base/component/ReactStyles";

const cssStyles = require('./admin.css');


interface Props {
    seledCategories: string[];
    onCategoriesChanged: (categories: string[]) => void;
}


export default class CategorySelector extends React.Component<Props, any> {

    categories: any[] = null;
    seledCategories: string[] = null;


    constructor(props: any) {
        super(props);
        this.seledCategories = this.props.seledCategories;
        if (!this.seledCategories) {
            this.seledCategories = [];
        }
    }

    componentDidMount() {
        $.get('/category_list', (data) => {
            this.categories = null;
            if (data && data.ret === RetCodes.OK) {
                this.categories = data.categories;
            }

            this.setState({});
        });
    }

    componentWillReceiveProps() {
        this.setState({});
    }

    render() {
        let categories: any = null;
        if (this.categories == null || this.categories.length <= 0) {
            categories = <span style={{color: '#EF5350', marginTop: 15}}>未获取到分类</span>;
        } else {
            categories = this.categories.map((category: any, index: number) => {
                let categoryStyle = this.isSelected(category._id)
                    ? cssStyles.categoryItem : cssStyles.categoryUnSelectItem;

                return (
                    <span key={index}
                          style={styles.category_item}
                          className={categoryStyle}
                          onClick={() => this.switchCategoryStatus(category._id)}>
                        {category.name}
                    </span>
                );
            })
        }

        return (
            <div>
                <div style={styles.selector}>
                    {categories}
                </div>
            </div>
        );
    }

    switchCategoryStatus(_id: string) {
        let removed = false;
        for (let i = 0; i < this.seledCategories.length; ++i) {
            if (this.seledCategories[i] === _id) {
                this.seledCategories.splice(i, 1);
                removed = true;
                break;
            }
        }

        if (!removed) {
            this.seledCategories.push(_id);
        }

        this.props.onCategoriesChanged(this.seledCategories);
        this.setState({});
    }

    isSelected(_id: string) {
        if (!this.seledCategories) {
            return false;
        }

        for (let category of this.seledCategories) {
            if (category === _id) {
                return true;
            }
        }

        return false;
    }
}


const styles: ReactStyles = {
    selector: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        border: 'solid 1px #ddd',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
        marginBottom: 20
    },
    category_item: {
        padding: '10px 15px',
        marginRight: 15,
        marginTop: 15
    }
};
