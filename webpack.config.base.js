// 首先引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    // entry: './src/index.js',
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),  // 必须是绝对路径
        filename: '[name].[hash:6].js',
        publicPath: '/'  //通常是CDN地址
    },
    // mode: isDev ? 'development' : 'production',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/ //排除 node_modules 目录
            },
            // {
            //     test: /\.(le|c)ss$/,
            //     use: ['style-loader', 'css-loader', {
            //         loader: 'postcss-loader',
            //         options: {
            //             plugins: () => {
            //                 return [
            //                     require('autoprefixer')({
            //                         "overrideBrowserslist": [
            //                             ">0.25%",
            //                             "not dead"
            //                         ]
            //                     })
            //                 ]
            //             }
            //         }
            //     }, 'less-loader'],
            //     exclude: /node_modules/
            // },
            {
                test: /\.(le|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => {
                            return [
                                require('autoprefixer')()
                            ]
                        }
                    }
                }, 'less-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240, //10K
                            esModule: false,
                            name: '[name]_[hash:6].[ext]'
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', //打包后的文件名
            minify: {
                removeAttributeQuotes: false,  //是否删除属性的双引号
                collapseWhitespace: false //是否折叠空白
            },
            chunks: ['index'],
            config: config.template
            // hash: true  //是否加上hash，默认是 false
        }),
        new HtmlWebpackPlugin({
            template: './public/login.html',
            filename: 'login.[hash:6].html', //打包后的文件名
            minify: {
                removeAttributeQuotes: false,  //是否删除属性的双引号
                collapseWhitespace: false //是否折叠空白
            },
            chunks: ['login']
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns:['**/*', '!dll', '!dll/**'] //不删除dll目录下的文件
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public/js/*.js',
                    to: path.resolve(__dirname, 'dist', 'js'),
                    flatten: true,  // 它只会拷贝文件，而不会把文件夹路径都拷贝上
                    globOptions: {
                        ignore: ['**/other.**']
                    }
                }
                //还可以继续配置其它要拷贝的文件
            ]
        }),
        new webpack.ProvidePlugin({
            _: 'lodash'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:6].css',
            publicPath: '/'
        }),
        new OptimizeCssPlugin(),
        new webpack.HotModuleReplacementPlugin() //热更新插件
    ],
}