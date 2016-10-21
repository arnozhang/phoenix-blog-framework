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

import * as express from "express";
import * as bodyParser from "body-parser";
import * as pug from "pug";


export var app = express();


function configurationViewEngine() {
    app.set('views', 'dist/res/views');
    app.engine('pug', (path: string, options: any, fn?: any) => {
        options.pretty = true;
        return pug.renderFile(path, options, fn);
    });
    app.set('view engine', 'pug');
}


function configurationApp() {
    app.use(express.static('dist/build/admin'));
    app.use('', express.static('dist/res/html'));
    app.use('', express.static('dist/res/img'));
    app.use('', express.static('dist/build/client'));
    app.use('/images', express.static('dist/files/image'));
    app.use('/upload_images', express.static('dist/files/temp'));
    app.use('/js', express.static('dist/res/js'));
    app.use('/css', express.static('dist/res/css'));

    app.use(bodyParser.json());

    configurationViewEngine();
}


configurationApp();
