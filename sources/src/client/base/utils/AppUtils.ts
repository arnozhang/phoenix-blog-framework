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

import {ReactInstance} from "react";

import EventCenter from "./SimpleEventCenter";


export type ButtonListener = () => void;
export type DialogRender = () => any;


export default class AppUtils {

    static showTips(tips: string, duration?: number) {
        EventCenter.emit('show-tips', tips, duration);
    }

    static showDialog(message: string, button: string, listener?: ButtonListener) {
        EventCenter.emit('show-dialog', message, button, listener);
    }

    static showTwoBtnDialog(message: string, leftBtn: string, rightBtn: string,
                            leftListener?: ButtonListener, rightListener?: ButtonListener,
                            render?: DialogRender) {

        EventCenter.emit('show-dialog', message, leftBtn, leftListener, rightBtn, rightListener, render);
    }

    static showCustomizedDialog(render: DialogRender) {
        EventCenter.emit('show-dialog', null, null, null, null, null, render, true);
    }

    static getRef(refName: string): ReactInstance {
        return EventCenter.emit('get-ref', refName);
    }
}
