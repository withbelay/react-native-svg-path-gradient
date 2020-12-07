# react-native-svg-path-gradient

[![Version](https://img.shields.io/npm/v/react-native-svg-path-gradient.svg)](https://www.npmjs.com/package/react-native-svg-path-gradient)

Adds a `<GradientPath>` componenet used for creating color gradients along a custom path

## Table of Contents

- [Installation](#installation)
- [Examples](#examples)
- [Props](#props)
- [License](#license)

## Installation

Using npm

```sh
npm install react-native-svg-path-gradient
```

Using Yarn

```sh
yarn add react-native-svg-path-gradient
```

## Examples

### Simple

The following code will produce something like this:

![Example code result](https://raw.githubusercontent.com/react-native-community/react-native-linear-gradient/master/images/example.png)

```javascript

<Svg height="500" width="500" viewBox="0 0 960 500">
<GradientPath
   d="M86,388L203,330C320,272,554,156,673.8333333333334,165.83333333333334C793.6666666666666,175.66666666666666,799.3333333333334,311.3333333333333,683.5,316.6666666666667C567.6666666666666,322,330.3333333333333,197,211.66666666666666,134.5L93,72"
   colors={[
     'rgb(110, 64, 170)',
     'rgb(223, 64, 161)',
     'rgb(255, 112, 78)',
     'rgb(210, 201, 52)',
     'rgb(107, 247, 92)',
     'rgb(27, 217, 172)',
     'rgb(57, 136, 225)',
     'rgb(110, 64, 170)',
   ]}
/>
</Svg>
```

## License

MIT