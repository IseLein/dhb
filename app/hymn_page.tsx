
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { ScrollingText } from "@/components/ScrollingText";
import { formatCase } from "@/utils";
import type { Hymn, HymnParams } from "@/types";

export default function HymnPage() {
  const hymn = parseParams(useLocalSearchParams<HymnParams>());
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (<ScrollingText text={formatCase(hymn.title)} />),
    });
  }, []);

  return (
    <View>
      <Text>{hymn.title}</Text>
      <Text>{hymn.verses}</Text>
    </View>
  );
}

function parseParams(params: HymnParams): Hymn {
  return {
    ...params,
    hymn: parseInt(params.hymn),
    verses: JSON.parse(params.verses) as string[],
    chorus: params.chorus?.split("\n"),
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
