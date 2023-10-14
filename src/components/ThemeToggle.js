import { View } from "react-native"
import { useColorScheme } from "nativewind";

const ThemeToggle = () => {
    const { colorScheme, setColorScheme } = useColorScheme();

    const onToggle = () => {
        setColorScheme(colorScheme === "light" ? "dark" : "light");
    }

    return (
        <View class="mode-toggle" onClick={() => onToggle()}>
            <View className="toggle">
                <View id="dark-mode" type="checkbox"></View>
            </View>
        </View >
    )
}

export default ThemeToggle;