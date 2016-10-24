# phoenix-blog-framework 文档

### 1、简介

**`phoenix-blog-framework`** 是一款个人博客框架。比如我的个人博客，就是采用这个框架完成的：[http://arnozhang.com/](http://arnozhang.com/)

![博客截图](https://github.com/arnozhang/phoenix-blog-framework/blob/master/docs/arnozhang-blog.png?raw=true)

前后台均采用 Typescript 编写。各模块采用技术如下：

|模块|技术|
|---|---|
|语言|Typescript|
|页面|React.js + CSS-Modules + pug + jQuery|
|后台|Node.js + Express|
|数据库|MongoDB + mongoose|

`phoenix-blog-framework` 的特点：

- 前后台均采用 Typescript 编写，管理方便；
- 拥有强大的后台管理系统，以及 Markdown 博客写作系统；
- 部署方便；
- 博客采用 Markdown 存放；
- 可自由添加实现渲染模板，可定制页面展示。

#### 2、博客环境配置

在 `sources/src/server/server.config.ts` 中配置了博客环境，其中指定了 MongoDB 的 host 和端口、博客管理后台的帐号密码，以及页面的渲染组件。这些配置可以根据你的需求灵活修改：

```typescript
export var config = {
    db: {
        host: 'localhost',
        port: 27017,
        database_name: 'phoenix_blog'
    },

    user: {
        userName: 'phoenix blog',
        email: 'zyfgood12@163.com',
        portrait: '/default_portrait.png'
    },

    site: {
        siteTitle: 'Phoenix Blog',
        subTitle: 'github.com@phoenix_blog',
    },

    // render engine.
    render: 'default',

    admin: {
        name: 'admin',
        password: '123456'
    }
};
```

页面渲染引擎自定义可以通过参考 `sources/src/client/render/RenderEngines.ts` 文件，来实现页面渲染自定义。

### 3、部署 & 运行

#### 3.1、部署环境

先要安装 [Node.js](https://nodejs.org/en/) 、 [npm](https://www.npmjs.org/) 以及 [Webpack](https://www.npmjs.com/package/webpack)。然后安装 `Typescript` 和 `Typings`。

```
npm install --global typescript
npm install --global typings
npm install --global webpack
```

#### 3.2、拉取代码

```
git clone https://github.com/arnozhang/phoenix-blog-framework
```

#### 3.3、安装依赖包

```
cd phoenix-blog-framework/sources

npm install
npm link typescript
```

#### 3.4、安装 MongoDB，并启动 MongoDB

具体方法参考 [MongoDB 官网](http://www.mongodb.org/)。

### 4、启动博客

#### 4.1、编译 Server 端代码（将 Typescript 转化为 Javascript）

```
cd phoenix-blog-framework/sources
tsc
```

#### 4.2、启动 Webpack，编译客户端代码

这里有两种方法，一种是用来调试，这时候会 watch 本地代码更新，如果有更新，则 Webpack 会同步编译：

```
cd phoenix-blog-framework/sources
webpack --watch
```

另一种是部署到正式环境，则不会 watch：

```
cd phoenix-blog-framework/sources
webpack -p
```

#### 4.3、启动博客

仍然有两种方法，第一种是调试运行：

```
node ./dist/build/server/index.js
```

第二种是正式部署时，这时候我们可以用 `forever` 这个 npm 包，来让博客永久运行：

```
forever start ./dist/build/server/index.js
```

**需要注意的是，在 Linux 环境下，当启动 80 端口时，需要 sudo 权限。**

#### 4.4、打开博客

打开博客首页：[http://localhost](http://localhost)

打开博客后台管理页面：[http://localhost/admin](http://localhost/admin)

打开博客写作页面：[http://localhost/write_new_post](http://localhost/write_new_post)

博客写作、后台管理页面均需要输入管理员帐号和密码——亦即在 `server.config.js` 文件中配置的帐号和密码。


