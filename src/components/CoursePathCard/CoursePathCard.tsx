import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "@ui-kitten/components";
import { ICategory } from "../../models/category";

const COLORS = [
  "#F72585",
  "#7209B7",
  "#0081A7",
  "#F07167",
  "#3A0CA3",
  "#00AFB9",
  "#4CC9F0",
  "#4361EE",
];

interface ICoursePathCardProps {
  data: ICategory;
  colorIndex: number;
}

const CoursePathCard: React.FC<ICoursePathCardProps> = ({
  data,
  colorIndex,
}) => (
  <Card style={[styles.container, { backgroundColor: COLORS[colorIndex] }]}>
    <Text style={styles.text} category="h6">
      {data.title}
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
    textAlign: "center",
    color: "white"
  },
});

export default CoursePathCard;
