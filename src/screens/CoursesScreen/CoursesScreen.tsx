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
import { StackScreenProps } from "@react-navigation/stack";

import RootCategoryCard from "../../components/RootCategoryCard";
import { ICategory, ICategoryMap } from "../../models/category";
import ROUTES from "../../constants/routes";

interface ICoursesScreenProps extends StackScreenProps<any> {
  categoryMap: ICategoryMap;
  isLoading: boolean;
  error: any;
  fetchAllAsync: () => void;
}

const CoursesScreen: React.FC<ICoursesScreenProps> = ({
  navigation,
  categoryMap,
  isLoading,
  error,
  fetchAllAsync,
}) => {
  useEffect(() => {
    fetchAllAsync();
  }, []);

  const rootCategories = useMemo(() => {
    return Object.values(categoryMap)
      .filter((category) => category.is_root)
      .sort((a: ICategory, b: ICategory) => a.title.localeCompare(b.title));
  }, [categoryMap]);

  const navigateToSubCategory = (id: number) =>
    navigation.push(ROUTES.CATEGORY_LIST, { categoryId: id });

  if (isLoading) {
    return (
      <Layout style={styles.loadingStateContainer}>
        <Spinner size="giant" />
      </Layout>
    );
  }

  return (
    <Layout style={styles.container} level="4">
      {rootCategories.map((category, index) => (
        <RootCategoryCard
          key={`root-category-${category.id}`}
          data={category}
          onPress={navigateToSubCategory}
        />
      ))}
      {error && (
        <Card style={styles.errorCard} status="danger">
          <Text style={styles.errorText} status="danger" category="h6">
            {error.message}
          </Text>
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
    textAlign: "center",
  },
  retryContainer: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CoursesScreen;
