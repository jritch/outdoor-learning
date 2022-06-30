// Learn more https://docs.expo.io/guides/customizing-metro
const {getDefaultConfig} = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Support direct require of ptl models
defaultConfig.resolver.assetExts.push('ptl');

module.exports = defaultConfig;
