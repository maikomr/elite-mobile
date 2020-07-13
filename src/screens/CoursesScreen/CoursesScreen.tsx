import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";

import CoursePathCard from "../../components/CoursePathCard";
import { ICategory } from "../../models/category";
import CategoryService from "../../services/CategoryService";

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
  }, [fetchAllAsync]);

  const coursePaths = useMemo(() => {
    return categoryList
      .filter((category) => category.is_root)
      .sort((a: ICategory, b: ICategory) => a.title.localeCompare(b.title));
  }, [categoryList]);

  return (
    <Layout style={styles.container}>
      {coursePaths.map((category) => (
        <CoursePathCard key={category.id} data={category} />
      ))}
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
});

export default CoursesScreen;
