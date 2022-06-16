var path = require('path');
var webpack = require('webpack');
 
module.exports = {
    entry: {
        DocuSign: './src/index.js'
    },
    output: {
        path: __dirname + '/',
        filename: 'dist/[name]/[name]_bundle.js'
    },
    resolve: {
        alias: {
            'modules': path.join(__dirname, 'node_modules')
        }
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/i,
                use: [
                    'url-loader'
                ]
            }
        ]
    },
    // devtool: 'eval-source-map'
};
