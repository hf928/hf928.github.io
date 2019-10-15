const withImages = require('next-images');
const withSass = require('@zeit/next-sass');

const conf = {
    webpack: (config) => {

        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty',
        };

        config.module.rules.push(
            // 字型檔的設置
            {
                test: /\.(eot|woff|svg|ttf)([\?]?.*)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        publicPath: (url) => `/static/fonts/${url}`,
                        outputPath: '../static/fonts/'
                    }
                }
            },
            // sass 設置
            {
                test: /\.(s[ac]ss|css)$/,
                use: [
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss'
                        }
                    },
                    'sass-loader'
                ]
            }
        );
    
        return config;
    
    },
    // 設置一些其他的設定
    publicRuntimeConfig: {
        staticFolder: '/static'
    },
    // server 的設定
    serverRuntimeConfig: {},
    cssModules: true,
};

module.exports = withImages(withSass(conf));
