import { BuildOptions } from "./types/config";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  const { paths } = options;
  return {
    static: paths.build,
    historyApiFallback: true,
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /^\/$/, to: '/start' }, // Перенаправление с / на /start
    //   ],
    // },
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /^\/$/, to: '/start' },
    //   ],
    // },
    // proxy: {
    //   '/': '/start'
    // },
    port: options.port,
    open: true,
    // open: ['/start'],
    hot: true,
  };
}
