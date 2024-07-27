import * as React from "react";
import { View, Pressable } from "react-native";
import Animated, {
    Extrapolate,
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

const RoutineCard = (props) => {
    const { animationValue, item, onPress } = props;

    const translateY = useSharedValue(0);

    const containerStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            animationValue.value,
            [-1, 0, 1],
            [0.5, 1, 0.5],
            Extrapolate.CLAMP,
        );

        const backgroundColor = interpolateColor(
            animationValue.value,
            [-1, 0, 1],
            ["#404040", "#7e22ce", "#404040"],
        );

        const scale = interpolate(
            animationValue.value,
            [-1, 0, 1],
            [0.85, 1, 0.85],
            Extrapolate.CLAMP,
        );

        return {
            opacity,
            backgroundColor,
            transform: [{ scale }, { translateY: translateY.value }],
        };
    }, [animationValue, translateY]);

    const onPressIn = React.useCallback(() => {
        translateY.value = withTiming(-8, { duration: 250 });
    }, [translateY]);

    const onPressOut = React.useCallback(() => {
        translateY.value = withTiming(0, { duration: 250 });
    }, [translateY]);

    return (
        <Pressable
            className="flex-1 align-center justify-center"
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
        >
            <Animated.View
                style={[
                    {
                        height: "100%",
                        width: "100%",
                        justifyContent: "center",
                        borderRadius: 5,
                        padding: 5
                    },
                    containerStyle,
                ]}
            >
                <Animated.Text className="font-caviarbold text-xl text-white">
                    {item.title}
                </Animated.Text>
                <Animated.Text className="font-josefinregular">
                    Level: {item.level}
                </Animated.Text>
                <Animated.Text className="font-josefinregular">
                    Duration: {item.duration}
                </Animated.Text>
            </Animated.View>
        </Pressable>
    );
}

export default RoutineCard;