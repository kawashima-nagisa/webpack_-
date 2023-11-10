const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

// const ImageminWebp = require("imagemin-webp");
// const ImageminSvgo = require("imagemin-svgo");

const MODE = "production";
const enabledSourceMap = MODE === "development";

module.exports = {
  mode: MODE,
  entry: {
    // entry: "./src/js/index.js",
    index: "./src/js/index.js",
    about: "./src/js/about.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    // filename: "js/main.js",
    //エントリーポイントの名前に基づいた動的なファイル名を生成
    filename: "js/[name].js",
    // assetModuleFilename: "imgs/[name][ext]",
    assetModuleFilename: "imgs/[name][ext][query]",
  },
  performance: {
    hints: process.env.NODE_ENV === "production" ? "warning" : false,
    maxAssetSize: 700 * 1024,
    maxEntrypointSize: 700 * 1024,
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              url: true,
              sourceMap: enabledSourceMap,
              importLoaders: 3,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer", { grid: true }]],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: enabledSourceMap,
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        //Asset Modules の設定
        //対象とするアセットファイルの拡張子を正規表現で指定
        test: /\.(png|jpe?g|gif|svg)$/i,
        //画像をコピーして出力
        type: "asset/resource",
        generator: {
          filename: "imgs/[name][ext]",
        },
      },
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: "html-loader",
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Home",
      template: "./src/index.html", // ソースディレクトリの index.html
      filename: "index.html", // 出力されるファイル名。dist/index.html
      chunks: ["index"],
      inject: true,
      // JSファイルなどにハッシュが付く（キャッシュ対策）
      hash: true,
    }),

    new HtmlWebpackPlugin({
      title: "About",
      template: "./src/about.html", // ソースディレクトリの index.ejs
      // filename: "about.html", // 出力されるファイル名。dist/index.html
      filename: "about/index.html",
      chunks: ["about"],
      inject: true,
      // JSファイルなどにハッシュが付く（キャッシュ対策）
      hash: true,
    }),

    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/images", to: "imgs" }],
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
            [
              "svgo",
              {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        removeViewBox: false,
                        addAttributesToSVGElement: {
                          params: {
                            attributes: [
                              {
                                xmlns: "http://www.w3.org/2000/svg",
                              },
                            ],
                          },
                        },
                      },
                    },
                  },
                ],
              },
            ],
          ],
        },
      },
      generator: [
        {
          type: "asset", //変換された画像ファイルを出力するための設定 ここをコメントアウトしたりしないと両方の画像形式で出力されない
          //type: 'asset/resource' は元のファイルをそのまま出力する設定
          preset: "webp",
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [["imagemin-webp", { quality: 75 }]],
          },
        },
      ],
    }),
  ],
  // 追加
  resolve: {
    alias: {
      "@image": path.resolve(__dirname, "./dist/imgs/"),
    },
  },
  devServer: {
    // static: "dist",
    static: path.join(__dirname, "dist"),
    //サーバー起動時にブラウザを自動的に起動
    open: true,
    // devMiddleware: {
    // 	writeToDisk: true, //バンドルされたファイルを出力する（実際に書き出す）
    // },
    client: {
      // overlay: {
      // 	errors: true, //エラーの場合は表示
      // 	warnings: false, //警告の場合は表示しない
      // },
      overlay: false,
    },
    historyApiFallback: {
      rewrites: [
        { from: /^\/about$/, to: "/about.html" },
        // その他のリライトルール...
      ],
    },
  },
  target: ["web", "es5"],
};
