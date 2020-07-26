import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "@ui-kitten/components";

interface ICategoryCardProps {
  data: { id: number, title: string };
  onPress: (id: number) => void;
}

const CategoryCard: React.FC<ICategoryCardProps> = ({ data, onPress }) => {
  const handlePress = () => onPress(data.id);
  return (
    <Card style={styles.container} onPress={handlePress}>
      <Text style={styles.text} category="h6">
        {data.title}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  text: {
    textAlign: "center",
  },
});

export default CategoryCard;
