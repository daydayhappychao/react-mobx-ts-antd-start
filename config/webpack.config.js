const { resolve, join } = require('path');
const fs = require('fs')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const localPort = 3000
const apiHost = 'http://localhost:8080/'
const proxy = { "/api/*": apiHost }

const rootPath = join(__dirname, '../')

module.exports = {
    context: resolve(rootPath, 'src'),
    entry: [
        'react-hot-loader/patch',
        // activate HMR for React
        'webpack-dev-server/client?http://localhost:' + localPort,
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        './index.tsx'
        // the entry point of our app
    ],
    output: {
        filename: 'bundle.js',
        // the output bundle
        path: resolve(rootPath, 'dist'),
        publicPath: '/',
        // necessary for HMR to know where to load the hot update chunks
        chunkFilename: '[name].chunk.js'
    },
    devtool: 'inline-source-map',
    // devtool: "eval",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            '@': resolve('src')
        }
    },
    devServer: {
        hot: true,
        port: localPort,
        host: '0.0.0.0',
        // enable HMR on the server
        // noInfo: true,
        // quiet: false,
        historyApiFallback: true,
        // minimize the output to terminal.
        contentBase: resolve(rootPath, 'src'),
        // match the output path
        publicPath: '/',
        proxy: proxy
        // match the output `publicPath`
    },

    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(ts|tsx)?$/,
                loader: 'tslint-loader',
                exclude: [resolve(rootPath, "node_modules")],
            },

            {
                test: /\.(ts|tsx)?$/,
                use: [
                    { loader: 'react-hot-loader/webpack' },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            // getCustomTransformers: () => ({
                            //     before: [tsImportPluginFactory({
                            //         libraryName: 'antd',
                            //         // libraryDirectory: 'es',
                            //         // style: 'css',
                            //     })]
                            // }),
                            compilerOptions: {
                                module: 'es2015'
                            }
                        },
                    },
                ],
                exclude: [resolve(rootPath, "node_modules")],
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })
            },
            { test: /\.png$/, loader: "url-loader?limit=100000" },
            { test: /\.jpg$/, loader: "file-loader" },
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin("styles.css"),
        // prints more readable module names in the browser console on HMR updates
        new HtmlWebpackPlugin({ template: resolve(rootPath, 'src/index.html'), inject: true }),
        new webpack.DllReferencePlugin({ context: __dirname, manifest: join(__dirname, "manifest.json") }),
        new webpack.ProvidePlugin({ _: 'lodash' }),
        new webpack.DefinePlugin({
            routes: (function () {
                let pages = fs.readdirSync(join(__dirname, '../src/pages/'))
                return JSON.stringify(pages)
            })()
        })
    ],
};