import React, { useState, useCallback, useRef } from "react";
import { SafeAreaView, View, Text, Dimensions } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import { interpolate } from "react-native-reanimated";
import RoutineCard from "../components/RoutineCard";

const exampleItems = [
    {
        title: "Novice",
        level: 0,
        duration: "1 month",
    },
    {
        title: "Intermediate",
        level: 3,
        duration: "1 month",
    },
    {
        title: "Advanced",
        level: 6,
        duration: "1 month",
    },
    {
        title: "Expert",
        level: 8,
        duration: "1 month",
    },
];

const Routine = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [carouselItems, setCarouselItems] = useState(exampleItems);
    const ref = useRef(null);

    return (
        <SafeAreaView className="flex-1 bg-slate-100 dark:bg-neutral-900">
            <View className="mx-5">
                <Text className="font-josefinregular text-black dark:text-white mb-2">A routine consists of the set of exercises you will perform during the selected duration with focus to a specific goal.</Text>
                <Carousel
                    // key={`${loop}`}
                    ref={ref}
                    className="flex h-32 w-full rounded-md items-center justify-center bg-neutral-800"
                    width={Dimensions.get('window').width / 2}
                    height={100}
                    data={exampleItems}
                    renderItem={({ item, animationValue }) => {
                        return <RoutineCard
                            animationValue={animationValue}
                            item={item}
                            onPress={() =>
                                ref.current?.scrollTo({
                                    count: animationValue.value,
                                    animated: true,
                                })
                            }
                        />
                    }}
                />
                <View>
                    <Text className="font-caviarbold text-lg text-black dark:text-white">Create Routine</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Routine;