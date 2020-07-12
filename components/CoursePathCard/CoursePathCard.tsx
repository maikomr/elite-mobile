import React from "react";
import { StyleSheet, Text } from "react-native";
import { Card } from "@ui-kitten/components";

interface ICoursePathCardProps {
  id: string;
  title: string;
}

const CoursePathCard: React.FC<ICoursePathCardProps> = ({ id, title }) => (
  <Card key={id} style={styles.container}>
    <Text style={styles.text}>{title}</Text>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    width: '40%',
    justifyContent: 'center',
    margin: '5%'
  },
  text: {
    textAlign: 'center'
  }
});

export default CoursePathCard;
