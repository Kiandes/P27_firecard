module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@native-base/icons': '@native-base/icons/lib',
        },
      },
    ],
  ],
};
