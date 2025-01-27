import { StyleSheet, FlatList, View } from "react-native";
import ListItem from "./ListItem";

export default function ListContainer({ data, onPress }) {
  const renderItem = ({ item }) => (
    <ListItem item={item} onPress={() => onPress(item._id)} />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
