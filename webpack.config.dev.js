const {merge} = require('webpack-merge');
const webpack = require('webpack');
const apiMocker = require('mocker-api');
const path = require('path');
const baseWebpackConfig = require('./webpack.config.base');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            DEV: JSON.stringify('dev'),   //字符串
            FLAG: 'true'  //FLAG 是个布尔类型
        })
    ],
    devServer: {
        // before(app) {
        //     app.get('/api/user', (req, res) => {
        //         res.json({name: 'test'})
        //     })
        // },
        before(app) {
            apiMocker(app, path.resolve('./mock/mocker.js'))
        },
        port: '3000', //默认是8080
        quiet: false, //默认不启用
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: "errors-only",  //终端仅打印 error
        overlay: false, //默认不启用
        clientLogLevel: 'silent', //日志等级
        compress: true,  //是否启用 gzip 压缩
        hot: true,
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                pathRewrite: {
                    '/api': ''
                }
            },
        },
    },
    devtool: 'cheap-module-eval-source-map'  // 开发环境下使用
})