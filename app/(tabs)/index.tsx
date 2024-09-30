
import { useState, useRef } from "react";
import { Text, View, StyleSheet, Pressable, TextInput, Animated, StatusBar, ViewStyle } from "react-native";
import { router } from "expo-router";
import type { Hymn } from "@/types";
import { formatCase } from "@/utils";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import rawHymns from "@/assets/hymns.json";

const hymnsJson = rawHymns as Hymn[];
const HEADER_MAX_HEIGHT = 60;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function HomeScreen() {
    const topOffset = (StatusBar.currentHeight || 0) + 10;

    const [searchQuery, setSearchQuery] = useState("");
    const displayedHymns = hymnsJson.filter(hymn => {
        return hymn.title.toLowerCase().includes(searchQuery.toLowerCase())
            || hymn.hymn.toString().includes(searchQuery.toLowerCase())
            || hymn.verses.join(" ").toLowerCase().includes(searchQuery.toLowerCase())
            || hymn.chorus?.join(" ").toLowerCase().includes(searchQuery.toLowerCase());
    });

    const scrollY = useRef(new Animated.Value(0)).current;
    const scrollYClamped = Animated.diffClamp(scrollY, 0, HEADER_SCROLL_DISTANCE + topOffset);

    const translateY = scrollYClamped.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE + topOffset],
        outputRange: [0, -HEADER_SCROLL_DISTANCE - topOffset],
        extrapolate: 'clamp',
    });

    const translateYNumber = useRef();
    translateY.addListener(({ value }) => {
        translateYNumber.current = value;
    });

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true },
    );

    const scrollRef = useRef(null);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.searchBarContainer, { transform: [{ translateY }], paddingTop: topOffset }]}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="title..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </Animated.View>
            <Animated.FlatList
                ref={scrollRef}
                data={displayedHymns}
                renderItem={({ item }) => <HymnCard hymn={item} />}
                keyExtractor={item => item.hymn.toString()}
                contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT + topOffset - 10 }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                ItemSeparatorComponent={Separator}
            />
        </View>
    )
}

function Separator() {
    return <View style={{
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginHorizontal: 10,
    }} />
}

type HymnCardProps = {
    hymn: Hymn;
}

function HymnCard({ hymn }: HymnCardProps) {
    function pressableStyle({ pressed }: StyleProps) {
      let style: ViewStyle = {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
      };
      if (pressed) {
        style = {
          ...style,
          backgroundColor: '#f0f0f0',
        };
      }
      return style;
    }

    const routeParams = {
        ...hymn,
        verses: JSON.stringify(hymn.verses),
        chorus: hymn.chorus?.join("\n"),
    };

    return (
        <Pressable style={pressableStyle} android_ripple={{ borderless: false }}
            onPress={() => router.push({ pathname: '/hymn_page', params: routeParams })}>
            <TabBarIcon style={{paddingHorizontal: 10, textAlignVertical: 'center' }} name={'music'} />
            <Text style={styles.hymnText} numberOfLines={1} ellipsizeMode="tail">{hymn.hymn}. {formatCase(hymn.title)}</Text>
        </Pressable>
    )
}

type StyleProps = {
    pressed: boolean;
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'white',
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  hymnCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  hymnText: {
    fontSize: 20,
    textAlignVertical: 'center',
    flexShrink: 1,
  }
});
