import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "@ui-kitten/components";

interface ICategoryCardProps {
  name: string;
  onPress: () => void;
}

const CategoryCard: React.FC<ICategoryCardProps> = ({ name, onPress }) => {
  return (
    <Card style={styles.container} onPress={onPress}>
      <Text style={styles.text} category="h6" status="primary">
        {name}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    borderRadius: 10,
    borderWidth: 0,
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  text: {
    textAlign: "center",
  },
});

export default CategoryCard;
