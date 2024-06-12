import nodeExternals from 'webpack-node-externals';
import { RunScriptWebpackPlugin } from 'run-script-webpack-plugin';

export default function (options, webpack) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({
        name: options.output.filename,
        autoRestart: false,
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@custom/middlewares': path.resolve(
          __dirname,
          'src/common/middlewares/index.ts',
        ),
        '@custom/validators': path.resolve(
          __dirname,
          'src/common/validators/index.ts',
        ),
        '@custom/decorators': path.resolve(
          __dirname,
          'src/common/decorators/index.ts',
        ),
        '@custom/filters': path.resolve(
          __dirname,
          'src/common/filters/index.ts',
        ),
        '@custom/guards': path.resolve(__dirname, 'src/common/guards/index.ts'),
        '@custom/interceptors': path.resolve(
          __dirname,
          'src/common/interceptors/index.ts',
        ),
        '@custom/pipes': path.resolve(__dirname, 'src/common/pipes/index.ts'),
        '@custom/configs': path.resolve(__dirname, 'src/common/configs/index.ts')
      },
    },
  };
}
