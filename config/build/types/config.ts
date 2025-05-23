

export type BuildMode = "production" | "development";

export interface BuildEnv {
  NODE_ENV: BuildMode;
  port: number;
  envFile: string;
}

export interface BuildPaths {
  entry: string;
  build: string;
  html: string;
  src: string;
}

export interface BuildOptions {
  paths: BuildPaths;
  mode: BuildMode;
  port: number;
  envFileAddition: string;
}
