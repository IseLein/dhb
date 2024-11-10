
import { View, Text, ScrollView, StyleSheet } from "react-native";
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
    <ScrollView style={styles.page}>
      <Verse verse={hymn.verses[0]} verse_number={1} />
      {/* chorus could be [''] */}
      {hymn.chorus && hymn.chorus[0] !== '' && <Text style={styles.chorus}>{hymn.chorus.join("\n")}</Text>}
      {hymn.verses.slice(1).map((verse, index) => (
        <Verse verse={verse} verse_number={index + 2} key={index} />
      ))}
    </ScrollView>
  );
}

type VerseProps = {
  verse: string;
  verse_number: number;
};

function Verse({ verse, verse_number }: VerseProps) {
  return (
    <View style={styles.verse}>
      <Text style={styles.number}>{`${verse_number}. `}</Text>
      <Text style={styles.text}>{verse}</Text>
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
  page: {
    paddingVertical: 10,
  },
  verse: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  number: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    fontFamily: "serif",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
  },
  chorus: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
    paddingVertical: 10,
  },
});
