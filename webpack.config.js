const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',

    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        clean: true,
        globalObject: 'this'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    externals: {
        react: 'react',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
        ],
    },
};
