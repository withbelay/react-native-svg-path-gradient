import React, { Component } from "react";
import { Path, G, Circle } from "react-native-svg";
import PropTypes from "prop-types";
import { svgPathProperties } from "svg-path-properties";
import Color from "color";

export default class GradientPath extends Component {
  render() {
    const {
      d,
      colors,
      strokeWidth,
      precision,
      roundedCorners,
      percent,
    } = this.props;
    const path = new svgPathProperties(d);
    const pathList = quads(samples(path, precision));
    const gradientArray = interpolateColors(colors, pathList.length);

    const percent_ = Math.max(0, Math.min(percent, 1));
    const croppedPathIndex = Math.round(pathList.length * percent_);

    const PATH_START = path.getPointAtLength(0);
    const PATH_END = path.getPointAtLength(
      Math.round(path.getTotalLength() * percent_)
    );

    return (
      <G>
        {roundedCorners && (
          <G>
            <Circle
              cx={PATH_START.x}
              cy={PATH_START.y}
              r={strokeWidth / 2}
              fill={gradientArray[0]}
            />
            <Circle
              cx={PATH_END.x}
              cy={PATH_END.y}
              r={strokeWidth / 2}
              fill={gradientArray[croppedPathIndex - 1]}
            />
          </G>
        )}
        {pathList.map((path, i) => (
          <>
            {i <= croppedPathIndex ? (
              <Path
                d={lineJoin(
                  path[0],
                  path[1],
                  path[2],
                  path[3],
                  strokeWidth - 1
                )}
                stroke={gradientArray[i]}
                fill={gradientArray[i]}
              />
            ) : (
              <></>
            )}
          </>
        ))}
      </G>
    );
  }
}

GradientPath.defaultProps = {
  strokeWidth: 1,
  precision: 8,
  roundedCorners: false,
  percent: 1,
};

GradientPath.propTypes = {
  d: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  strokeWidth: PropTypes.number,
  precision: PropTypes.number,
  roundedCorners: PropTypes.bool,
  percent: PropTypes.number,
};

// color interpolation function
function interpolateColors(colors, colorCount) {
  if (colors.length === 0) {
    return Array(colorCount).fill("#000000");
  }
  if (colors.length === 1) {
    return Array(colorCount).fill(colors[0]);
  }
  const colorArray = [];

  for (let i = 0; i < colors.length - 1; i++) {
    const start = Color(colors[i]).object();
    const end = Color(colors[i + 1]).object();
    colorArray.push(Color(start).hex());
    const segmentLength =
      i === colors.length - 2
        ? colorCount - (colorArray.length - 1)
        : Math.round(colorCount / (colors.length - 1));

    for (
      let i = 0, blend = 0;
      i < segmentLength - 2;
      i++, blend += 1.0 / (segmentLength - 1)
    ) {
      const r = end.r * blend + (1 - blend) * start.r;
      const g = end.g * blend + (1 - blend) * start.g;
      const b = end.b * blend + (1 - blend) * start.b;

      colorArray.push(Color.rgb(r, g, b).hex());
    }
  }
  colorArray.push(Color(colors[colors.length - 1]).hex());
  return colorArray;
}

// Sample the SVG path uniformly with the specified precision.
function samples(path, precision) {
  const n = path.getTotalLength();
  const normalizedLengths = [0];
  const dt = precision;
  for (let i = dt; i < n; i += dt) {
    normalizedLengths.push(i);
  }
  normalizedLengths.push(n);
  return normalizedLengths.map((t) => {
    var p = path.getPointAtLength(t),
      a = [p.x, p.y];
    a.t = t / n;
    return a;
  });
}

// Compute quads of adjacent points [p0, p1, p2, p3].
function quads(points) {
  return [...Array(points.length - 1).keys()].map(function (i) {
    const a = [points[i - 1], points[i], points[i + 1], points[i + 2]];
    a.t = (points[i].t + points[i + 1].t) / 2;
    return a;
  });
}

// Compute stroke outline for segment p12.
function lineJoin(p0, p1, p2, p3, width) {
  const u12 = perp(p1, p2);
  const r = width / 2;
  let a = [p1[0] + u12[0] * r, p1[1] + u12[1] * r];
  let b = [p2[0] + u12[0] * r, p2[1] + u12[1] * r];
  let c = [p2[0] - u12[0] * r, p2[1] - u12[1] * r];
  let d = [p1[0] - u12[0] * r, p1[1] - u12[1] * r];

  if (p0) {
    // clip ad and dc using average of u01 and u12
    var u01 = perp(p0, p1),
      e = [p1[0] + u01[0] + u12[0], p1[1] + u01[1] + u12[1]];
    a = lineIntersect(p1, e, a, b);
    d = lineIntersect(p1, e, d, c);
  }

  if (p3) {
    // clip ab and dc using average of u12 and u23
    var u23 = perp(p2, p3),
      e = [p2[0] + u23[0] + u12[0], p2[1] + u23[1] + u12[1]];
    b = lineIntersect(p2, e, a, b);
    c = lineIntersect(p2, e, d, c);
  }

  return "M" + a + "L" + b + " " + c + " " + d + "Z";
}

// Compute intersection of two infinite lines ab and cd.
function lineIntersect(a, b, c, d) {
  const x1 = c[0];
  const x3 = a[0];
  const x21 = d[0] - x1;
  const x43 = b[0] - x3;
  const y1 = c[1];
  const y3 = a[1];
  const y21 = d[1] - y1;
  const y43 = b[1] - y3;
  const ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
  return [x1 + ua * x21, y1 + ua * y21];
}

// Compute unit vector perpendicular to p01.
function perp(p0, p1) {
  const u01x = p0[1] - p1[1];
  const u01y = p1[0] - p0[0];
  const u01d = Math.sqrt(u01x * u01x + u01y * u01y);
  return [u01x / u01d, u01y / u01d];
}
