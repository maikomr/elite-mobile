import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "@ui-kitten/components";

interface IRootCategoryCardProps {
  title: string;
  onPress: () => void;
}

const RootCategoryCard: React.FC<IRootCategoryCardProps> = ({
  title,
  onPress
}) => (
  <Card style={styles.container} onPress={onPress}>
    <Text style={styles.text} category="h6">
      {title}
    </Text>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    width: "45%",
    height: 100,
    justifyContent: "center",
    marginVertical: 15,
  },
  text: {
    textAlign: "center"
  },
});

export default RootCategoryCard;
