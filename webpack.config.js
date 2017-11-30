const path = require('path');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        App: './demo/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[chunkhash:8].js',
    },
    module: {
        rules: [
            // css && less rules
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                    ],
                }),
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'less-loader',
                    ],
                }),
                exclude: /node_modules/,
            },
            // js rules
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                exclude: /node_modules/,
                options: {
                    formatter: eslintFriendlyFormatter,
                },
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['stage-2', 'react', 'es2015'],
                        },
                    },
                ],
            },
            // assets rules
            {
                test: /\.(svg|eot|woff2?|ttf|otf)$/,
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    name: 'fonts/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    name: 'images/[name].[hash:8].[ext]',
                },
            },
        ],
    },
    plugins: [
        // new ExtractTextPlugin("css/[name].css"),    //单独使用style标签加载css并设置其路径
        // 根据模板插入css/js等生成最终HTML
        new HtmlWebpackPlugin({
            // 生成的html存放路径，相对于 path
            filename: 'index.html',
            // html模板路径
            template: './demo/index.html',
            // 允许插件修改哪些内容，包括head与body
            inject: true,
            // 为静态资源生成hash值
            hash: true,
            // 压缩HTML文件
            minify: {
                // 移除HTML中的注释
                removeComments: true,
                // 删除空白符与换行符
                collapseWhitespace: false,
            },
        }),
    ],
    devServer: {
        port: 3030,
        proxy: {
        },
    },
};
