const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = env => {
    const isProd = env && env.production;
    return {
        entry: {
            app: './src/client/index.js',
        },
        //resolve: {
        //    extensions: ['.js', '.jsx', '.json'],
        //},
        plugins: [
            new CopyWebpackPlugin([
                { from: 'src/client/CSInterface.js', to: 'CSInterface.js' },
            ]),
            new HtmlWebpackPlugin({
                title: 'CEP Panel',
                alwaysWriteToDisk: true,
            }),
            new HtmlWebpackIncludeAssetsPlugin({
                assets: './CSInterface.js',
                append: false,
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'stage-2', 'react'],
                            //plugins: ['transform-runtime'],
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader',
                            options: { sourceMap: !isProd },
                        },
                        {
                            loader: 'css-loader',
                            options: { sourceMap: !isProd, importLoaders: 1 },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: !isProd,
                                ident: 'postcss',
                                plugins: loader => [
                                    require('postcss-import')({ root: loader.resourcePath }),
                                    require('postcss-cssnext')(),
                                ],
                            },
                        },
                    ],
                },
            ],
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist', 'client'),
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        devServer: {
            contentBase: path.join("dist", "client")
        }
    };
};
