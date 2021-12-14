const path = require('path');

module.exports = {
    entry: ['./src/script.js', './src/credentials.js'],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'docs'),
    },
    mode: 'development'
};