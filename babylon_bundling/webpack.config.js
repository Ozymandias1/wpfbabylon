const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());

module.exports = [{
    entry: path.resolve(appDirectory, 'src/app.ts'),
    output: {
        filename: '../../wpfbabylon/bin/Debug/WebResources/js/bundle.js',
        library: ['App']
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'development',
    devtool: 'inline-source-map',
},{
    entry: path.resolve(appDirectory, 'src/app.ts'),
    output: {
        filename: '../../wpfbabylon/bin/Debug/WebResources/js/bundle.min.js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'production',
}];