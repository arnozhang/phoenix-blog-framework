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

export module Module {

    interface Post {
        id: string;
        title: string;
        previewContent: string;
        content: string;
        watchCount: number;
        commentCount: number;
        publishTimestamp: number;
        modifyTimestamp: number;
        categories: Array<string>;
    }

    interface Category {
        id: string;
        name: string;
    }

    interface Comment {
        id: string;
        userName: string;
        userEmail: string;
        content: string;
        timestamp: number;
    }
}
