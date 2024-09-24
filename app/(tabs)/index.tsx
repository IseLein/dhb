import { Platform, StatusBar, Text, View, FlatList, Pressable } from "react-native";
import type { Hymn } from "@/types";
import rawHymns from "@/assets/hymns.json";

const hymnsJson = rawHymns as Hymn[];

export default function HomeScreen() {
    return (
        <View style={{
            backgroundColor: 'white',
            height: '100%',
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}>
            <Text style={{
                fontSize: 24,
            }}>Disciples Hymn Book</Text>
            <FlatList
                data={hymnsJson}
                renderItem={({ item }) => <HymnCard hymn={item} />}
                keyExtractor={item => item.hymn.toString()}
            />
        </View>
    )
}

type HymnCardProps = {
    hymn: Hymn;
}

function HymnCard({ hymn }: HymnCardProps) {
    return (
        <View>
            <Pressable>
                <Text>{hymn.title}</Text>
            </Pressable>
        </View>
    )
}
