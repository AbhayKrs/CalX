import { StyleProp, View, Dimensions } from "react-native";
import { useState, useEffect, useRef } from "react";
import Svg, { G, Rect, Line, Text, Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import React from "react";
import * as d3 from "d3";
import { useColorScheme } from "nativewind";

const LineChart = ({ data }) => {
    const svgRef = useRef(null);
    const { colorScheme } = useColorScheme();

    const width = Dimensions.get("window").width - 15;
    const height = 300;

    const [paths, setPaths] = useState({ curPath: '', tarPath: '', areaPath: '' });
    const [xTicks, setXTicks] = useState([]);
    const [yTicks, setYTicks] = useState([]);
    const [activePoint, setActivePoint] = useState(null); // To track the active (hovered/pressed) point
    const [pressedPoint, setPressedPoint] = useState(null);  // To track the pressed point

    // const xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const xLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const targets = [87.5, 86, 85, 84, 83, 80, 78, 77, 76, 75, 74.5, 74, 73, 72, 70];
    const maxY = Math.round(Math.max(...data) / 10) * 10 + 10;
    const minY = Math.round(Math.min(...data) / 10) * 10 - 10;

    useEffect(() => {
        const dataset = data.map((d, i) => ({ x: i, y: d }));

        console.log("test", maxY, minY);

        const xScale = d3.scaleLinear()
            .domain([0, dataset.length - 1])
            .range([40, width - 20]);

        const yScale = d3.scaleLinear()
            .domain([minY, maxY])
            .range([height - 40, 40]);

        const lineFn = d3.line()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y))
            .curve(d3.curveCatmullRom.alpha(0.5));
        const linePath = lineFn(dataset);
        const tarPath = lineFn(targets.map((d, i) => ({ x: i, y: d })));

        const areaFn = d3.area()
            .x(d => xScale(d.x))
            .y0(height - 40)
            .y1(d => yScale(d.y))
            .curve(d3.curveCatmullRom.alpha(0.5));
        const areaPath = areaFn(dataset);

        setPaths({ linePath, tarPath, areaPath });

        const xTicks = xScale.ticks(dataset.length).map(value => ({
            value,
            xOffset: xScale(value)
        }));

        const yTicks = d3.range(minY, 101, 10).map(value => ({
            value,
            yOffset: yScale(value)
        }));

        setXTicks(xTicks);
        setYTicks(yTicks);
    }, [data]);

    // Handle touch events to simulate hover effect
    const handlePointPress = (index) => {
        console.log("Data", index);
        setActivePoint(index);
        setPressedPoint(index - 1);  // Track the pressed point
    };

    const handlePointRelease = () => {
        setActivePoint(null);
        setPressedPoint(null);  // Reset the pressed point
    };

    const pressedPointX = pressedPoint !== null ? d3.scaleLinear().domain([0, data.length - 1]).range([40, width - 20])(pressedPoint + 1) : null;
    const pressedPointY = pressedPoint !== null ? d3.scaleLinear().domain([minY, 100]).range([height - 40, 40])(data[pressedPoint]) : null;

    return (
        <Svg ref={svgRef} width={width} height={height}>
            {/* Background Rectangle */}
            <Rect
                x={0}
                y={0}
                width={width}
                height={height}
                rx={5}  // Horizontal radius
                ry={5}  // Vertical radius
                fill={colorScheme === "light" ? "#e2e8f0" : "#262626"}  // Background color
            />

            {/* Grid Lines */}
            <G stroke="#e0e0e0" strokeWidth="1">
                {xTicks.map(({ xOffset }) => (
                    <Line
                        key={`grid-x-${xOffset}`}
                        x1={xOffset}
                        y1={40}
                        x2={xOffset}
                        y2={height - 40}
                        stroke={colorScheme === "light" ? "#000" : "#fff"}
                        strokeOpacity={0.1}
                        strokeDasharray="4,4"
                    />
                ))}
                {yTicks.map(({ yOffset }) => (
                    <Line
                        key={`grid-y-${yOffset}`}
                        x1={40}
                        y1={yOffset}
                        x2={width - 20}
                        y2={yOffset}
                        stroke={colorScheme === "light" ? "#000" : "#fff"}
                        strokeOpacity={0.1}
                        strokeDasharray="4,4"
                    />
                ))}
            </G>

            {/* X Axis */}
            <G>
                <Line x1={40} y1={height - 40} x2={width - 20} y2={height - 40} stroke="#71717a" />
                {xTicks.map(({ value, xOffset }) => (
                    <G key={value} transform={`translate(${xOffset}, ${height - 40})`}>
                        <Line y2="3" stroke={colorScheme === "light" ? "#262626" : "#d1d5db"} />
                        <Text y="18" textAnchor="middle" fill={colorScheme === "light" ? "#262626" : "#d1d5db"}>{xLabels[value]}</Text>
                    </G>
                ))}
            </G>

            {/* Y Axis */}
            <G>
                <Line x1={40} y1={40} x2={40} y2={height - 40} stroke="#71717a" />
                {yTicks.map(({ value, yOffset }) => (
                    <G key={value} transform={`translate(40, ${yOffset})`}>
                        <Line x2="-3" stroke={colorScheme === "light" ? "#262626" : "#d1d5db"} />
                        <Text x="-10" y="5" textAnchor="end" fill={colorScheme === "light" ? "#262626" : "#d1d5db"}>{value}</Text>
                    </G>
                ))}
            </G>

            <Path d={paths.areaPath} stroke={"none"} fill={"#000"} fillOpacity={0.2} />

            <Path d={paths.linePath} stroke={"#2563eb"} fill={"none"} strokeWidth={1.5} />
            <Path d={paths.tarPath} stroke={colorScheme === "light" ? "#ec4899" : "#ec4899"} fill={"none"} strokeWidth={1.5} />

            {/* Pressed line */}
            {pressedPoint !== null && pressedPointX !== null && pressedPointY !== null && (
                <Line
                    x1={pressedPointX}
                    y1={pressedPointY}
                    x2={pressedPointX}
                    y2={height - 40}
                    stroke="#e11d48"
                    strokeWidth={2}
                    strokeDasharray="4,4"
                />
            )}

            {data.map((d, i) => (
                <Circle
                    key={i}
                    cx={d3.scaleLinear().domain([0, data.length - 1]).range([40, width - 20])(i)}
                    cy={d3.scaleLinear().domain([minY, 100]).range([height - 40, 40])(d)}
                    r={activePoint === i ? 6 : 4}  // Change size on hover
                    fill={activePoint === i ? "#e11d48" : "#1d4ed8"}  // Change color on hover
                    onPress={() => handlePointPress(i)}
                    onPressOut={handlePointRelease}
                />
            ))}
        </Svg>
    );
};

export default LineChart;