import { View, Text, Dimensions } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { useColorScheme } from "nativewind";

const Chart = () => {
    const { colorScheme } = useColorScheme();

    return (
        <View className="flex-col w-full justify-center">
            <LineChart
                bezier
                width={Dimensions.get("window").width - 15} // from react-native
                height={250}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#000",
                    backgroundGradientFrom: colorScheme === "light" ? "#e2e8f0" : "#262626",
                    backgroundGradientTo: colorScheme === "light" ? "#d1d5db" : "#262626",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => colorScheme === "light" ? `rgba(0, 0, 0, ${opacity})` : `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => colorScheme === "light" ? `rgba(0, 0, 0, ${opacity})` : `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "4"
                    }
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 5,
                }}
                data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                        {
                            data: [87.5, 87, 86, 86, 84, 82, 81, 79, 78, 76, 75, 74],
                            color: () => 'rgb(134, 65, 244)',
                            strokeWidth: 1 // optional
                        }
                    ],
                    legend: ["Rainy Days"] // optional
                }}
                verticalLabelRotation={30}
                yLabelsOffset={10}
                segments={5}
                onDataPointClick={({ value, dataset, getColor }) => console.log("Test", value)}
            />
        </View>
    )
}

export default Chart;