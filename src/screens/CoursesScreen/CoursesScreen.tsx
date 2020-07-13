import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";

import CoursePathCard from '../../components/CoursePathCard';
import { ICategory } from "../../models/category";
import CategoryService from "../../services/CategoryService";

const CoursesScreen = () => {
  const [allCategories, setAllCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      const data = await CategoryService.getAll();
      setAllCategories(data);
    };
    fetchAllCategories();
  }, []);

  const coursePaths = useMemo(() => {
    return allCategories
      .filter(category => category.is_root)
      .sort((a: ICategory, b: ICategory) => a.title.localeCompare(b.title));
  }, [allCategories]);

  return (
    <Layout style={styles.container}>
      {coursePaths.map(category => (
        <CoursePathCard key={category.id} data={category} />
      ))}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'center'
  },
});

export default CoursesScreen;
