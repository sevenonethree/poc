const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const Uglify = require('uglifyjs-webpack-plugin');
const OptimizeCSS = require('optimize-css-assets-webpack-plugin');

let config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'output.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.jpg', '.jpeg', '.gif', '.png'],
        alias: {
            images: path.resolve(__dirname, 'src/assets/images'),
            services: path.resolve(__dirname, 'src/services'),
            data: path.resolve(__dirname, 'src/assets/data'),
            app: path.resolve(__dirname, 'src/app'),
            components: path.resolve(__dirname, 'src/app/Components')
        }
    },
    module: {
        rules: [{
            test: /\.jsx?$/, 
            exclude: /node_modules/, 
            loader: "babel-loader"
        },
        {
            test: /\.scss$/,
            use: [process.env.NODE_ENV == 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'sass-loader']
        },
        {
            test: /\.{jpe?g|png|gif|svg}$/i,
            loaders: ['file-loader?context=src/assets/images/&name=images/[path][name].[ext]', {
                loader: 'image-webpack-loader',
                query: {
                    mozjpeg: {
                        progressive: true
                    },
                    gifsicle: {
                        interlaced: false
                    },
                    optipng: {
                        optimizationLevel: 4
                    },
                    pngquant: {
                        quality: '75-90',
                        speed: 3
                    }
                }
            }],
            exclude: /node_modules/,
            include: __dirname
        }
        ]
    },
    plugins : [
        new MiniCssExtractPlugin('styles.css')
    ],
    devServer: {
        // publicPath: path.resolve(__dirname, './public'),
        contentBase: path.resolve(__dirname, './public'), // where is this content coming from?
        historyApiFallback: true, // falls back to index.html for SPA
        inline: true, //set this to false to disable including client scripts (like browser reload)
        open: true, //opens the default browser
        port: 3000
    },
    devtool: 'eval-source-map'
}
module.exports = config;

if (process.env.NODE_ENV === 'production'){
      module.exports.plugins.push(
          new Uglify(),
          new OptimizeCSS()
    );
}
