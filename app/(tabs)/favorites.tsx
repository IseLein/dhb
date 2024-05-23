import { Platform, StatusBar, Text, View } from "react-native";

export default function FavScreen() {
    return (
        <View style={{
            backgroundColor: 'white',
            height: '100%',
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}>
            <Text>Favorites</Text>
        </View>
    )
}