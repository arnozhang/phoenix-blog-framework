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

import {PostListFetcher} from "../blog/post/PostList";


//
// Post preview render.
//
export interface PostPreviewProps {
    post: any;
    isLast: boolean;
    extraRender?: (post: any) => any;
    fromInternal?: boolean;
}

export class PostPreviewRender<P extends PostPreviewProps, S> extends React.Component<P, S> {
}


//
// Category post list render.
//
export interface CategoryPostProps {
    categoryId: string;
    fetcher?: PostListFetcher;
}

export class CategoryPostRender<P extends CategoryPostProps, S> extends React.Component<P, S> {
}


//
// Post detail page render.
//
export interface PostDetailProps {
    post: any;
    loading: boolean;
    praisePost: () => void;
}

export class PostDetailRender<P extends PostDetailProps, S> extends React.Component<P, S> {
}


//
// Page indexes render.
//
export interface PageIndexesProps {
    pageCount: number;
    currentPage: number;
    pageJumpIndex?: string;
}

export class PageIndexesRender<P extends PageIndexesProps, S> extends React.Component<P, S> {
}


//
// Tag detail list render.
//
export interface TagDetailListProps {
    tags: any[];
}

export class TagDetailListRender<P extends TagDetailListProps, S> extends React.Component<P, S> {
}


//
// Tag post list render.
//
export interface TagPostListProps {
    tagName: string;
    fetcher: PostListFetcher;
}

export class TagPostListRender<P extends TagPostListProps, S> extends React.Component<P, S> {
}


//
// Tag post list render.
//
export interface TimelineListProps {
    list: any[];
}

export class TimelineListRender<P extends TimelineListProps, S> extends React.Component<P, S> {
}


//
// Tag post list render.
//
export interface TimelinePostListProps {
    year: string;
    month: string;
    fetcher: PostListFetcher;
}

export class TimelinePostListRender<P extends TimelinePostListProps, S> extends React.Component<P, S> {
}


export interface BlogRender {

    name: string;

    pageIndexes: any;
    homepage: any;
    _404?: any;
    postPreview: any;
    postDetail: any;
    categoryPost: any;
    tagDetailList: any;
    tagPostList: any;
    timelineList: any;
    timelinePostList: any;
}
