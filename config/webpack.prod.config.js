const { resolve, join } = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


const vendors = [
    'react',
    'react-dom',
    'mobx',
    'mobx-react',
    'react-router',
    'lodash'
]

const rootPath = join(__dirname, '../')

module.exports = {
    context: resolve(rootPath, 'src'),
    entry: { bundle: './index.tsx', vendor: vendors },
    output: {
        filename: '[name].[chunkhash:5].js',
        chunkFilename: '[name].[chunkhash:5].chunk.js',
        publicPath: '/packages/',
        // the output bundle
        path: resolve(rootPath, 'static/packages'),
        // libraryTarget: "umd",
        // library: "Hotloader",
    },
    devtool: 'source-map',
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: [
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
                ]
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
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        }, {
                            loader: "postcss-loader",
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })
            },
            // { test: /\.less$/, loaders: ["style-loader", "css-loader", "less-loader"]},
            { test: /\.png$/, loader: "url-loader?limit=100000" },
            { test: /\.jpg$/, loader: "file-loader" },
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "[chunkhash:5].styles.css",
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: "react-mobx-ts-antd-start",
            inject: true,
            filename: resolve(rootPath, 'static/index.html'),
            template: resolve(rootPath, 'src/index.html'),
            chunksSortMode: 'dependency'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            },
            sourceMap: true
        }),
        new webpack.ProvidePlugin({
            _: 'lodash'
        }),

        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } }
        }),

        new webpack.DefinePlugin({
            routes: (function () {
                let pages = fs.readdirSync(join(__dirname, '../src/pages/'))
                return JSON.stringify(pages)
            })(),
            "process.env": { NODE_ENV: JSON.stringify('production') }
        }),

        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(join(__dirname, '../node_modules')) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: join(__dirname, "manifest.json")
        // }),


        new webpack.optimize.OccurrenceOrderPlugin(),

    ],
};