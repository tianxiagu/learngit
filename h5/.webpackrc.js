var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log('__dirname', __dirname);
export default {
    externals: {
        lodash: 'lodash'
    },
    alias: { 
        '@': path.resolve('./src')
    },
    env: {
        development: {
            extraBabelPlugins: [
            "dva-hmr"
          ]
        }
    },
    proxy: {        
        "/usercenter": {
          "target": "http://192.168.1.199:3000/mock/28/",
          "changeOrigin": true
        },
        "/trade": {
            "target": "http://192.168.1.199:3000/mock/28",
            "changeOrigin": true
        }
    },
    extraBabelPlugins:[
        [
            "import",{
                "libraryName":"antd",
                "libraryDirectory":"es",
                "style":true
            }
        ]
    ],
    hash: true,
    html: { "template": "./src/index.ejs" }

}

