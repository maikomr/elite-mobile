import React, { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import {
  Card,
  Layout,
  Spinner,
  Text,
  Button,
  Icon,
} from "@ui-kitten/components";

import CoursePathCard from "../../components/CoursePathCard";
import { ICategory } from "../../models/category";

interface ICoursesScreenProps {
  categoryList: ICategory[];
  isLoading: boolean;
  error: any;
  fetchAllAsync: () => void;
}

const CoursesScreen: React.FC<ICoursesScreenProps> = ({
  categoryList,
  isLoading,
  error,
  fetchAllAsync,
}) => {
  useEffect(() => {
    fetchAllAsync();
  }, []);

  const coursePaths = useMemo(() => {
    return categoryList
      .filter((category) => category.is_root)
      .sort((a: ICategory, b: ICategory) => a.title.localeCompare(b.title));
  }, [categoryList]);

  if (isLoading) {
    return (
      <Layout style={styles.loadingStateContainer}>
        <Spinner size="giant" />
      </Layout>
    );
  }

  return (
    <Layout style={styles.container}>
      {coursePaths.map((category, index) => (
        <CoursePathCard key={category.id} data={category} colorIndex={index} />
      ))}
      {error && (
        <Card style={styles.errorCard} status="danger">
          <Text style={styles.errorText} status="danger" category="h6">{error.message}</Text>
          <View style={styles.retryContainer}>
            <Button
              status="info"
              appearance="outline"
              accessoryLeft={(props) => (
                <Icon {...props} name="refresh-outline" />
              )}
              onPress={fetchAllAsync}
            >
              Reintentar
            </Button>
          </View>
        </Card>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignContent: "center",
  },
  loadingStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorCard: {
    position: "absolute",
    zIndex: 100,
    width: "100%",
    bottom: 0,
    left: 0,
  },
  errorText: {
    textAlign: 'center'
  },
  retryContainer: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CoursesScreen;
