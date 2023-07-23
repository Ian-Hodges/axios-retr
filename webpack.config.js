import path from 'path';

export const mode = "development";
export const devtool = "inline-source-map";
export const entry = {
  main: "./src/app.ts",
};
export const output = {
  path: path.resolve(__dirname, './dist'),
  filename: "app-bundle.js" // <--- Will be compiled to this single file
};
export const resolve = {
  extensions: [".ts", ".tsx", ".js"],
};
export const module = {
  rules: [
    {
      test: /\.tsx?$/,
      loader: "ts-loader"
    }
  ]
};
