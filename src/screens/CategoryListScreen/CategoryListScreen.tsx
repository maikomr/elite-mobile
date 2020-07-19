import React, { useMemo, useEffect } from "react";
import { StyleSheet, FlatList, ListRenderItem } from "react-native";
import { Layout } from "@ui-kitten/components";
import { StackScreenProps } from "@react-navigation/stack";

import { ICategory, ICategoryMap } from "../../models/category";
import CategoryCard from "../../components/CategoryCard";
import ROUTES from "../../constants/routes";

interface ICategoryListScreenProps extends StackScreenProps<any> {
  categoryMap: ICategoryMap;
}

const CategoryListScreen: React.FC<ICategoryListScreenProps> = ({
  navigation,
  route,
  categoryMap,
}) => {
  useEffect(() => {
    const category = categoryMap[route.params.categoryId];
    if (category) {
      navigation.setOptions({ title: category.title });
    }
  }, [categoryMap, route.params.categoryId]);

  const data = useMemo(() => {
    const category = categoryMap[route.params.categoryId];
    if (category?.sub_categories) {
      return category?.sub_categories?.map((id: number) => categoryMap[id]);
    }
  }, [categoryMap, route.params.categoryId]);

  const navigateToSubCategory = (id: number) =>
    navigation.push(ROUTES.CATEGORY_LIST, { categoryId: id });

  const renderItem: ListRenderItem<ICategory> = ({ item }) => (
    <CategoryCard data={item} onPress={navigateToSubCategory} />
  );

  return (
    <Layout style={styles.container}>
      {data?.length && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `category-${item.id}`}
        />
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
});

export default CategoryListScreen;
