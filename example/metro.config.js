const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { createOxcResolver } = require('..'); // react-native—oxc

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    resolveRequest: createOxcResolver(),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
