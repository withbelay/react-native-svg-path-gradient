# react-native-svg-path-gradient

[![Version](https://img.shields.io/npm/v/react-native-svg-path-gradient.svg)](https://www.npmjs.com/package/react-native-svg-path-gradient) [![Downloads](https://img.shields.io/npm/dw/react-native-svg-path-gradient)](https://www.npmjs.com/package/react-native-svg-path-gradient)

[![GitHub pull requests](https://img.shields.io/github/issues-pr/investingwolf/react-native-svg-path-gradient)](https://github.com/investingwolf/react-native-svg-path-gradient/pulls) [![GitHub issues](https://img.shields.io/github/issues-raw/investingwolf/react-native-svg-path-gradient)](https://github.com/investingwolf/react-native-svg-path-gradient/issues) ![GitHub Repo stars](https://img.shields.io/github/stars/investingwolf/react-native-svg-path-gradient?style=social)

Adds a `<GradientPath>` component used for creating color gradients along a custom path

## Table of Contents

- [Installation](#installation)
- [Props](#props)
- [Examples](#examples)
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

## Props

This component does **NOT** share the same props as `<Path>` from `react-native-svg`. Only the props listed below are available:

### d

A string with an svg path. For refrence on how to make a path see the [Path documentation of SVG](https://www.w3.org/TR/SVG/paths.html) or the [react-native-svg path component](https://github.com/react-native-svg/react-native-svg#path)

### colors

An array of color strings. These can be hex (`#FF0000`), rgb (`rgba(255, 0, 0)`), or css color names (`red`).

**Note:** rgba and hexa are not supported. While they will work the alpha value will be ignored. The color interpolationg algorithm ignores these since they appear different between stroke and fill colors on the `<Path>` component of `react-native-svg`.

### strokeWidth

Takes a number value for the stroke width of the path, default is 1.

### precision

Takes a number value for the precision of the path segments. Lower is more accurate. The default value is 8. Reccomended values are between 5 and 20.
**Note:** Going outside the reccomended range can cause issues with render times or the accuracy of the render. Use at your own risk.

## Examples

### Simple

The following code will produce something like this:

![Example code result](https://raw.githubusercontent.com/investingwolf/react-native-svg-path-gradient/main/images/react-native-svg-path-gradient.png)

```javascript
import GradientPath from 'react-native-svg-path-gradient';
import {Svg} from 'react-native-svg';

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
