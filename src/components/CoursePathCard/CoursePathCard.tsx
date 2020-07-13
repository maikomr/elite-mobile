import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "@ui-kitten/components";
import { ICategory } from "../../models/category";

interface ICoursePathCardProps {
  data: ICategory;
}

const CoursePathCard: React.FC<ICoursePathCardProps> = ({ data }) => (
  <Card style={styles.container}>
    <Text style={styles.text} category='h6'>{data.title}</Text>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    width: '45%',
    height: 100,
    justifyContent: 'center',
    marginVertical: 15
  },
  text: {
    textAlign: 'center'
  }
});

export default CoursePathCard;
