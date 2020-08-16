import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, useTheme } from "@ui-kitten/components";

interface IRootCategoryCardProps {
  title: string;
  onPress: () => void;
}

const RootCategoryCard: React.FC<IRootCategoryCardProps> = ({
  title,
  onPress
}) => {
  const theme = useTheme();
  return (
    <Card style={[styles.container, { backgroundColor: theme['color-primary-400'] }]} onPress={onPress}>
      <Text style={styles.text} category="h6">
        {title}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "45%",
    height: 100,
    justifyContent: "center",
    marginVertical: 15,
  },
  text: {
    textAlign: "center",
    color: "white"
  },
});

export default RootCategoryCard;
