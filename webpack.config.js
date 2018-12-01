module.exports ={
    entry: ['@babel/polyfill', './theme/js/main.js'],
    output: {
        filename: "main.js"
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['transform-remove-strict-mode'],
                        compact: false
                    }
                }
            }
        ],
    },
    mode: 'production',
}