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

import DialogFrame from "./DialogFrame";
import EventCenter from "./utils/SimpleEventCenter";
import {ButtonListener, DialogRender} from "./utils/AppUtils";
import assign = require("lodash/assign");

const buttonStyles = require('../admin/button.css');


export default class BlogBaseFrame extends React.Component<any, any> {

    tips: string;
    dialog: {
        show: boolean;
        message: string;
        leftBtn: string;
        rightBtn: string;
        fullyCustomized: boolean;
        leftBtnListener: ButtonListener;
        rightBtnListener: ButtonListener;
        customizedRender: DialogRender;
    };
    refs: {
        [key: string]: ReactInstance;
        tips: DialogFrame;
        dialog: DialogFrame;
    };

    componentDidMount() {
        EventCenter.on('show-tips', (tips: string, duration?: number) => {
            if (!duration || duration <= 0) {
                duration = 600;
            }

            this.tips = tips;
            this.setState({});

            setTimeout(() => {
                this.tips = null;
                this.setState({});
            }, duration);
        });

        EventCenter.on('get-ref', (refName: string) => {
            return this.refs[refName];
        });

        EventCenter.on(
            'show-dialog',
            (message: string, leftBtn: string,
             leftBtnListener: ButtonListener, rightBtn?: string,
             rightBtnListener?: ButtonListener, render?: DialogRender, fullyCustomized?: boolean) => {

                this.dialog = {
                    show: true,
                    message: message,
                    leftBtn: leftBtn,
                    rightBtn: rightBtn,
                    leftBtnListener: leftBtnListener,
                    rightBtnListener: rightBtnListener,
                    customizedRender: render,
                    fullyCustomized: fullyCustomized
                };

                this.setState({});
            });
    }

    render() {
        return (
            <div>
                {this.props.children}

                <DialogFrame
                    ref='tips' style={styles.tips} zIndex={1001}
                    show={this.tips && this.tips.length > 0}>
                    <span>{this.tips}</span>
                </DialogFrame>

                {this.renderDialog()}
            </div>
        );
    }

    hideDialog() {
        this.dialog = null;
        this.setState({});
    }

    bindListener(listener: ButtonListener) {
        return () => {
            if (listener) {
                if (!listener()) {
                    this.hideDialog();
                }

                return;
            }

            this.hideDialog();
        };
    }

    renderDialog() {
        if (!this.dialog || !this.dialog.show) {
            return null;
        }

        let rootContent: any = null;
        let content: any = null;
        if (this.dialog.customizedRender) {
            if (this.dialog.fullyCustomized) {
                rootContent = this.dialog.customizedRender();
            } else {
                content = this.dialog.customizedRender();
            }
        } else {
            content = (
                <span style={{fontSize: 18, marginLeft: 50, marginRight: 50}}>
                    {this.dialog.message}
                </span>
            );
        }

        if (!rootContent) {
            let rightBtn: any = null;
            if (this.dialog.rightBtn && this.dialog.rightBtn.length > 0) {
                rightBtn = (
                    <span className={buttonStyles.blueButton}
                          style={assign({marginLeft: 30}, styles.button)}
                          onClick={this.bindListener(this.dialog.rightBtnListener)}>
                        {this.dialog.rightBtn}
                    </span>
                );
            }

            rootContent = (
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {content}

                    <div style={{dialog: 'flex', flexDirection: 'row', marginTop: 60}}>
                        <span style={styles.button}
                              className={buttonStyles.redButton}
                              onClick={this.bindListener(this.dialog.leftBtnListener)}>
                            {this.dialog.leftBtn}
                        </span>

                        {rightBtn}
                    </div>
                </div>
            );
        }

        return (
            <DialogFrame
                ref='dialog'
                style={styles.dialog}
                zIndex={1000}
                show={true}>
                {rootContent}
            </DialogFrame>
        );
    }
}


const styles = {
    tips: {
        marginBottom: '20%',
        paddingLeft: 80,
        paddingRight: 80,
        paddingBottom: 20,
        paddingTop: 20
    },
    dialog: {
        marginBottom: '10%',
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 40,
        paddingTop: 40
    },
    button: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 30,
        paddingRight: 30
    }
};
