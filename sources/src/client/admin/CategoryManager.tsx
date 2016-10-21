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
import * as ReactDOM from "react-dom";
import * as $ from "jquery";

import AppUtils from "../base/utils/AppUtils";
import {RetCodes} from "../../base/RetCodes";
import DialogFrame from "../base/DialogFrame";
import FontAwesome from "../base/component/FontAwesome";

import AdminFrame, {ManageTabType} from "./AdminFrame";

let cssStyles = require('./admin.css');
let buttonStyles = require('./button.css');


interface ItemProps {
    category: any;
    onRemoveCategory: (id: string) => void;
}


class CategoryItem extends React.Component<ItemProps, any> {

    render() {
        return (
            <div style={styles.item_root} className={cssStyles.categoryItem}
                 onClick={() => location.href =`/admin_category_post/${this.props.category._id}`}>

                <span style={styles.item_text}>{this.props.category.name}</span>
                <span style={{marginLeft: 10, marginRight: 20, fontSize: 14}}>
                    文章数（{this.props.category.postCount ? this.props.category.postCount : 0}）
                </span>

                <FontAwesome
                    style={{color: '#EF5350', cursor: 'pointer'}}
                    onClick={this.onRemoveItemClick.bind(this)}
                    name='times'
                    size={2}/>
            </div>
        )
    }

    onRemoveItemClick(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble = true;
        this.props.onRemoveCategory(this.props.category._id)
    }
}


export default class CategoryManager extends React.Component<any, any> {

    categories: any;
    refs: {
        [key: string]: ReactInstance;
        dialog: DialogFrame;
        categoryInput: HTMLInputElement;
    };


    constructor(props: any) {
        super(props);

        this.state = {
            categoryName: ''
        };
    }

    componentDidMount() {
        $.get('/category_list', (data: any) => {
            this.categories = null;
            if (data) {
                if (data.ret == RetCodes.OK) {
                    this.categories = data.categories;
                }
            }

            this.setState({});
        });

        this.focusCategoryInput();
    }

    componentDidUpdate() {
        this.focusCategoryInput();
    }

    focusCategoryInput() {
        if (this.refs.categoryInput) {
            this.refs.categoryInput.focus();
        }
    }

    render() {
        let extras = (
            <span className={buttonStyles.blueButton}
                  onClick={() => this.refs.dialog.show()}>
                添加类别
            </span>
        );

        let category = this.renderCategories(this.categories);
        return (
            <div>
                <AdminFrame
                    style={{paddingBottom: 40}}
                    tabType={ManageTabType.CategoryManager}
                    extraNodes={extras}>
                    {category}
                </AdminFrame>

                <DialogFrame ref='dialog' style={{padding: 40}}>
                    <span style={{fontSize: 20}}>请输入类别名称：</span>
                    <input
                        ref='categoryInput'
                        value={this.state.categoryName}
                        style={styles.category_name}
                        onChange={e => this.setState({categoryName: (e.target as HTMLInputElement).value})}/>

                    <span style={{marginTop: 35}}
                          className={buttonStyles.blueButton}
                          onClick={this.addCategory.bind(this)}>
                        添加
                    </span>
                </DialogFrame>
            </div>
        );
    }

    renderCategories(categories: Array<any>) {
        if (!this.categories || this.categories.length <= 0) {
            return (
                <div style={{marginTop: 30, padding: '30px 20px', fontSize: 20}}>
                    暂无类别
                </div>
            );
        }

        return (
            <div>
                {
                    this.categories.map((category: any, index: number) => {
                        return <CategoryItem
                            key={index} category={category}
                            onRemoveCategory={this.removeCategory.bind(this)}/>
                    })
                }
            </div>
        );
    }

    addCategorySuccess(category: any) {
        if (!this.categories) {
            this.categories = [];
        }

        this.categories.splice(0, 0, category);
        this.setState({categoryName: ''});
        this.refs.dialog.hide();
    }

    addCategory() {
        if (!this.state.categoryName || this.state.categoryName.length <= 0) {
            AppUtils.showTips('请输入类别名称！');
            return;
        }

        $.get(`/add_category/${this.state.categoryName}`, (data: any, textStatus: string) => {
            let error: string = null;

            if (data) {
                if (data.ret === RetCodes.OK && data.category) {
                    this.addCategorySuccess(data.category);
                    return;
                } else if (data.ret == RetCodes.Category.CATEGORY_EXIST) {
                    error = '这个类别已经存在了，不能重复添加！';
                } else {
                    error = data.error;
                }
            }

            if (!error) {
                error = '添加类别失败！';
            }

            AppUtils.showTips(error);
        });
    }

    removeCategory(id: string) {
        AppUtils.showTwoBtnDialog('确定要删除该类别吗？', '取消', '确定', null, () => {
            $.get(`/remove_category/${id}`, (data: any) => {
                if (data && data.ret === RetCodes.OK) {
                    let temp = Array<any>();
                    for (let category of this.categories) {
                        if (category._id !== id) {
                            temp.push(category);
                        }
                    }

                    this.categories = temp;
                    this.setState({});
                } else {
                    AppUtils.showTips('删除类别失败！');
                }
            });
        });
    }
}


const styles = {
    item_root: {
        display: 'flex',
        flexDirection: 'row',
        padding: '15px 20px',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center'
    },
    item_text: {
        flex: 1,
        fontSize: 18
    },
    category_name: {
        fontSize: 20,
        width: 400,
        padding: 10,
        marginTop: 20,
        border: 'solid 1px #ddd',
        outline: 'none'
    }
};


ReactDOM.render(
    <CategoryManager />,
    document.getElementById('react-content'));
