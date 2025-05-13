import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const { mode } = options;
  const babelLoader = {
    test: /\.(ts|js)x?$/i,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
      },
    },
  };

  const styleLoader = {
    test: /\.(scss|css)$/,
    use: [
      mode !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
      "css-loader",
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
        },
      },
    ],
  };

  // const typescriptLoader = {
  //   test: /\.tsx?$/,
  //   use: "ts-loader",
  //   exclude: /node_modules/,
  // };

  const fileLoader = {
    test: /\.(png|gif|pdf|mp3|svg)$/,
    // alternative old plugin. Depends on representation of files in browsers
    // use: ['file-loader']
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 8192,
        },
      },
    ],
  };

  const secondFileLoader = {
    test: /\.(jpe?g)$/,
    // alternative old plugin. Depends on representation of files in browsers
    use: ['file-loader']
  };

  // const svgLoader = {
  //   test: /\.svg$/i,
  //   issuer: /\.[jt]sx?$/,
  //   use: ["@svgr/webpack"],
  // };

  // return [babelLoader, styleLoader, fileLoader, svgLoader];
  return [babelLoader, styleLoader, fileLoader, secondFileLoader];
}
