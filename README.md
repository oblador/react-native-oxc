# react-native-oxc

The [Oxidation Compiler](https://oxc.rs) is creating a collection of high-performance tools for JavaScript and TypeScript written in Rust.

This library lets you leverage it for resolution (and soon ™ transpilation) to boost your react-native development environment.

## Installation

```sh
npm install react-native-oxc
```

## Usage

Modify the metro config to look something like this:

```js
// metro.config.js
const { createOxcResolver } = require('react-native—oxc');

const config = {
  resolver: {
    resolveRequest: createOxcResolver({
      // optional oxc resolver options
    }),
  },
};
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
