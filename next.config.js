/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import CopyWebpackPlugin from "copy-webpack-plugin"
/** @type {import("next").NextConfig} */
const config = {
  output: "standalone",
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: "node_modules/geoip-lite/data/geoip-country.dat",
              to: "data/geoip-country.dat",
            },
            {
              from: "node_modules/geoip-lite/data/geoip-country6.dat",
              to: "data/geoip-country6.dat",
            },
          ],
        }),
      );
    }
    config.node = {
      __dirname: true
    }
    return config
  }
}

export default config;
