const webpack = require('webpack');


module.exports = {

    target: 'node',
    entry: {
        'client/404': './src/client/blog/errors/404.tsx',
        'client/homepage': './src/client/blog/homepage/Homepage.tsx',
        'client/about_author': './src/client/blog/misc/AboutAuthor.tsx',
        'client/post': './src/client/blog/post/PostDetail.tsx',
        'client/category_post': './src/client/blog/post/CategoryPost.tsx',
        'client/timeline_post': './src/client/blog/post/TimelinePost.tsx',
        'client/timeline_post_detail': './src/client/blog/post/TimelinePostDetail.tsx',
        'client/tag_post': './src/client/blog/post/TagPost.tsx',
        'client/tag_detail_list': './src/client/blog/post/TagDetailList.tsx',

        'admin/admin_index': './src/client/admin/AdminIndex.tsx',
        'admin/category_manager': './src/client/admin/CategoryManager.tsx',
        'admin/comment_manager': './src/client/admin/CommentManager.tsx',
        'admin/write_new_post': './src/client/admin/WriteNewPost.tsx',
        'admin/admin_auth_failed': './src/client/admin/AdminAuthInvalid.tsx',
        'admin/admin_category_post': './src/client/admin/AdminCategoryPost.tsx'
    },
    output: {
        path: './dist/build',
        filename: '[name].js'
    },

    devtool: "source-map",

    resolve: {
        extensions: ['', '.webpack.js', '.ts', '.tsx', '.js']
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|dist)/,
                loader: 'ts-loader'
            },
            {
                test: /\.json$/,
                exclude: /(node_modules|dist)/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|dist)/,
                loader: 'style!css?module&localIdentName=[name]__[local]-[hash:base64:5]'
            }
        ],

        preLoaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'jquery': 'window.$'
    }
};
