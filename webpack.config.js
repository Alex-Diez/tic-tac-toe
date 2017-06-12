let path = require('path');
let src = path.resolve('.', 'src');

module.exports = {
    entry: {
        app: src,
        react: ['react', 'react-dom'],
    },
    output: {
        path: path.resolve('public'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                include: src
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
                include: src
            }
        ]
    }
};
