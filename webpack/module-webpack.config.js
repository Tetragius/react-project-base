const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (root) => ({
    mode: "production",
    entry: {
        'main': path.join(root, '/src/ts/modules/simple-module/main.tsx')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    output: {
        path: path.join(root, '/dist/pages/sme'),
        filename: 'index.min.js',
        library: 'Main',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: ['babel-loader', 'awesome-typescript-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                    { loader: "postcss-loader", options: { config: { path: root } } }
                ]
            }
        ]
    },
    externals: {
        'portal-service': 'portal-service',
        'react': 'react',
        'react-dom': 'react-dom',
        'lodash': 'lodash',
        'rxjs': 'rxjs',
        'history': 'history',
        'react-router': 'react-router',
        'redux': 'redux',
        'react-redux': 'react-redux',
        'redux-actions': 'redux-actions',
        'react-router-redux': 'react-router-redux'
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
})