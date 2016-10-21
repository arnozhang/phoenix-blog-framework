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

import {Request, Response} from "express";
import {app} from "../Application";
import * as basicAuth from "basic-auth";
import {BasicAuthResult} from "basic-auth";

import CgiHelper from "./CgiHelper";
import {config} from "../config/server.config";


type RouteFunction = (req: Request, rsp: Response) => void;


export enum RouteType {
    GET,
    POST
}


export class ReqRouter {

    static RouteCgi(routePath: string, routeType?: RouteType) {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            let proc = target[propertyKey];
            if (routeType == RouteType.POST) {
                app.post(routePath, proc);
            } else {
                app.get(routePath, proc);
            }
        };
    }

    static AdminRouteCgi(routePath: string, routeType?: RouteType) {
        let authFailed = (rsp: Response) => {
            rsp.set('WWW-Authenticate', 'Basic realm="Please Enter UserName & Password"');

            return rsp.status(401).render('normal.jade', {
                title: 'Auth Failed',
                js: [CgiHelper.pageJs('admin_auth_failed')]
            });
        };

        let authProc = (req: Request, rsp: Response, next?: Function) => {
            let user: BasicAuthResult = basicAuth(req);
            if (user && user.name && user.pass &&
                user.name === config.admin.name && user.pass === config.admin.password) {
                return next();
            } else {
                return authFailed(rsp);
            }
        };

        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            let proc = target[propertyKey];
            if (routeType == RouteType.POST) {
                app.post(routePath, authProc, proc);
            } else {
                app.get(routePath, authProc, proc);
            }
        };
    }
}
