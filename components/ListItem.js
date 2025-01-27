import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ListItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View>
        <Text
          style={styles.text}
        >{`${item.year} ${item.make} ${item.model}`}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});
