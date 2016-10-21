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

export default class MiscUtils {

    static ensure<T>(val: T, def: T): T {
        return (val !== null && val !== undefined) ? val : def;
    }

    static visitByMobile(req?: any) {
        let userAgent: string = null;
        if (req && req.headers) {
            userAgent = req.headers['user-agent'];
        }

        if (!userAgent || userAgent.length <= 0) {
            userAgent = navigator.userAgent;
        }

        userAgent = userAgent.toLowerCase();
        return userAgent.match(/(android|iphone|ipad|ipod|windows phone|symbian)/i);
    }

    static getTimeDesc(timestamp: any): string {
        let _ensure2 = (val: number)=> {
            if (val >= 10) {
                return '' + val;
            }

            return '0' + val;
        };

        let date: Date = null;
        if (typeof timestamp === 'number') {
            date = new Date();
            date.setTime(timestamp);
        } else if (typeof timestamp === 'string') {
            date = new Date(Date.parse(timestamp));
        } else {
            date = new Date();
        }

        return `${date.getFullYear()}-${_ensure2(date.getMonth() + 1)}-${_ensure2(date.getDate())}`
            + ` ${_ensure2(date.getHours())}:${_ensure2(date.getMinutes())}`;
    }

    static postDetailHref(postId: string, fromInternal?: boolean) {
        if (fromInternal) {
            return `/post/${postId}?fromInternal=true`;
        }

        return `/post/${postId}`;
    }

    static postDetailCgi(postId: string, fromInternal?: boolean) {
        if (fromInternal) {
            return `/post_detail/${postId}?fromInternal=true`;
        }

        return `/post_detail/${postId}`;
    }
}

