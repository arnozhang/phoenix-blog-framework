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

import forIn = require("lodash/forIn");


export default class SimpleEventCenter {

    private static _eventMap: any = {};


    static on(name: string, callback: Function) {
        let list: any[] = SimpleEventCenter._eventMap[name];
        if (!list) {
            list = [];
            SimpleEventCenter._eventMap[name] = list;
        }

        list.push(callback);
    }

    static emit(name: string, ...args: any[]): any {
        let list: any[] = SimpleEventCenter._eventMap[name];
        if (list) {
            for (let callback of list) {
                let ret = callback(...args);
                if (ret) {
                    return ret;
                }
            }
        }
    }

    static removeListener(name: string, callback: Function) {
        let list: any[] = SimpleEventCenter._eventMap[name];
        if (list) {
            for (let i = 0; i < list.length; ++i) {
                if (list[i] === callback) {
                    list.splice(i, 1);
                    return;
                }
            }
        }
    }
}
