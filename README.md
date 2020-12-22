# react-native-svg-path-gradient

[![Version](https://img.shields.io/npm/v/react-native-svg-path-gradient.svg)](https://www.npmjs.com/package/react-native-svg-path-gradient) [![Downloads](https://img.shields.io/npm/dw/react-native-svg-path-gradient)](https://www.npmjs.com/package/react-native-svg-path-gradient)

[![GitHub pull requests](https://img.shields.io/github/issues-pr/investingwolf/react-native-svg-path-gradient)](https://github.com/investingwolf/react-native-svg-path-gradient/pulls) [![GitHub issues](https://img.shields.io/github/issues-raw/investingwolf/react-native-svg-path-gradient)](https://github.com/investingwolf/react-native-svg-path-gradient/issues) [![GitHub Repo stars](https://img.shields.io/github/stars/investingwolf/react-native-svg-path-gradient?style=social)](https://github.com/investingwolf/react-native-svg-path-gradient/stargazers)

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

| Prop Name      | Type     | Default Value |
| -------------- | -------- | ------------- |
| d              | String   | -             |
| colors         | String[] | -             |
| strokeWidth    | Number   | 1             |
| precision      | Number   | 8             |
| roundedCorners | Boolean  | false         |
| percent        | Number   | 1             |

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

### roundedCorners

Takes a boolean value, default is `false`. If `true` the corners of the path become rounded. Due to being a boolean value it is possible to just write `roundedCorners` as a prop with no value and `react-native` will treat it as true

**Note:** Rounded Corners effectively doesn't round the corners as much as it extrudes the line caps. This means that your path can become slightly longer when the linecap is added. Also linecaps can be added for "closed" paths which will present an issue so this prop should be avoided

### percent

Takes a number, default is `1`. This draws a percent of the actual path. e.g. `0.5` will draw roughly half of the path. This value can be used to make animations.

## Examples

### Ribbon

The following code will produce something like this:

![Example code result](https://i.imgur.com/z4pbYKY.png)

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
</Svg>;
```

### HorseShoe

The following code will produce something like this:

![Example code result](https://i.imgur.com/CSlMyoR.png)

```javascript
import GradientPath from 'react-native-svg-path-gradient';
import {Svg} from 'react-native-svg';

<Svg height="100%" width="100%" viewBox="-2 -2 295 256">
  <GradientPath
    d={
      'M55.5,237.2c-23.5-23.3-38.1-55.6-38.1-91.3C17.3,75,74.8,17.5,145.7,17.5C216.5,17.5,274,75,274,145.9  c0,35.7-14.6,68-38.1,91.3'
    }
    colors={['#A35AFF', '#5AF5FF']}
    strokeWidth={35}
    roundedCorners
  />
</Svg>;
```

### Animated Heart

**Note:** `useNativeDriver` must be `false`. The performance of this animation can be impacted heavily by the complexity of the path. This library is not designed for animating svgs, we suggest using a library like [Airbnb's Lottie](https://github.com/lottie-react-native/lottie-react-native)

The following code will produce something like this:

![Example code result](https://i.imgur.com/uM8UtLn.gif)

```javascript
import {useRef, useEffect} from 'react';
import {Easing, Animated} from 'react-native';
import GradientPath from 'react-native-svg-path-gradient';
import {Svg} from 'react-native-svg';
const AnimatedGradientPath = Animated.createAnimatedComponent(GradientPath);

const fillPercent = useRef(new Animated.Value(0)).current;

useEffect(() => {
  const fillAnim = () => {
    Animated.timing(fillPercent, {
      toValue: 1,
      duration: 800,
      delay: 0,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };
  fillAnim();
}, []);

<Svg height="100%" width="100%" viewBox="0 0 500 500">
  <AnimatedGradientPath
    d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9
    c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4"
    colors={['#FF69B4', '#FF69B4', 'red', 'red', '#FF69B4']}
    strokeWidth={8}
    precision={4}
    percent={fillPercent}
    roundedCorners
  />
</Svg>;
```

## License

MIT
