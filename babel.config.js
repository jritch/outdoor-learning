module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            assets: './assets',
            components: './components',
            // modules: './src/modules',
            // lib: './src/lib',
            // types: './src/types',
            constants: './constants',
          },
        },
      ],
    ],
  };
};
