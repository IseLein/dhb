
import { View, Text, StyleSheet } from 'react-native';

type ScrollingTextProps = {
  text: string
}

export function ScrollingText({ text }: ScrollingTextProps) {
  return (
    <View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
