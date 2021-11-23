const path = require("path");

module.exports = {
    mode: "none",
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8080,
    },
    "module": {
        "rules": [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                "test": /\.js$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "babel-loader",
                    "options": {
                        "presets": [
                        "@babel/preset-env",
                        ]
                    }
                }
            },
        ]
    },
};
