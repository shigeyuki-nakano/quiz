const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const envFilePath = path.resolve(__dirname, `.env.${process.env.NODE_ENV}`);

module.exports = {
    entry: './resources/ts/app.ts',
    module: {
        rules: [
            {
                test: /\.(tsx?|jsx?)$/,
                exclude: /node_modules/,
                use: "ts-loader"
            },
            {
                test: /\.(c|sa|sc)ss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { url: false }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new Dotenv({ path: envFilePath })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/ts'),
        },
        extensions: ['.ts', '.js', '.tsx', 'jsx']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: 'dist/',
    },
    devServer: {
        hot: true,
        open: true
    }
}