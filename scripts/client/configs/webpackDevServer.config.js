/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const webpack = require('webpack')
const { realpathSync } = require('fs')
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin')
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const redirectServedPathMiddleware = require('react-dev-utils/redirectservedpathmiddleware')
const noopServiceWorkerMiddleware = require('react-dev-utils/noopserviceworkermiddleware')

const { IgnorePlugin } = webpack
const publicUrl = ' '
const appDirectory = realpathSync(process.cwd())
const appPath = path.resolve(appDirectory, '.')

module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, 'src', 'client', 'public')
    },
    compress: true,
    port: 3000,
    historyApiFallback: true
  },
  mode: 'production',
  entry: './src/client/index.tsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    pathinfo: true,
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].js',
    publicPath: publicUrl + '/',
    devtoolModuleFilenameTemplate: (info) =>
      path.relative('src', info.absoluteResourcePath).replace(/\\/g, '/'),
    globalObject: 'this'
  },
  devtool: 'source-map',
  resolve: {
    // Добавить разрешения '.ts' и '.tsx' к обрабатываемым
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          keep_classnames: true,
          keep_fnames: true,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          },
          sourceMap: true
        }
      })
    ],
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`
    }
  },
  module: {
    strictExportPresence: true,
    rules: [
      // { parser: { requireEnsure: false } },
      {
        oneOf: [
          {
            test: [/\.avif$/],
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/avif',
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [{ loader: 'ts-loader' }]
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: 'body',
          template: path.resolve(
            __dirname,
            'src',
            'client',
            'public',
            'index.html'
          )
        },
        {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
        }
      )
    ),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, { PUBLIC_URL: publicUrl }),
    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: publicUrl,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path
          return manifest
        }, seed)
        const entrypointFiles = entrypoints.main.filter(
          (fileName) => !fileName.endsWith('.map')
        )

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles
        }
      }
    }),
    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new ModuleNotFoundPlugin(appPath)
  ].filter(Boolean),
  performance: false
}
