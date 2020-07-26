import React, { useMemo, useEffect } from "react";
import { StyleSheet, FlatList, ListRenderItem, View } from "react-native";
import {
  Button,
  Card,
  Icon,
  Layout,
  Spinner,
  Text,
} from "@ui-kitten/components";
import { StackScreenProps } from "@react-navigation/stack";

import { Faculty, FacultyMap } from "../../models/faculty";
import CategoryCard from "../../components/CategoryCard";
import ROUTES from "../../constants/routes";

interface IFacultyListScreenProps extends StackScreenProps<any> {
  facultyMap: FacultyMap;
  isLoading: boolean;
  error: Error;
  fetchAllAsync: () => void;
}

const FacultyListScreen: React.FC<IFacultyListScreenProps> = ({
  navigation,
  facultyMap,
  isLoading,
  error,
  fetchAllAsync,
}) => {
  useEffect(() => {
    fetchAllAsync();
  }, [fetchAllAsync]);

  const navigateToCareerList = (id: number) =>
    navigation.push(ROUTES.CAREER_LIST, { facultyId: id });

  const data = useMemo(() => Object.values(facultyMap), [facultyMap]);
  const renderItem: ListRenderItem<Faculty> = ({ item }) => (
    <CategoryCard data={item} onPress={navigateToCareerList} />
  );

  if (isLoading) {
    return (
      <Layout style={styles.loadingStateContainer}>
        <Spinner size="giant" />
      </Layout>
    );
  }

  return (
    <Layout style={styles.container} level="4">
      {!!data?.length && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `faculty-${item.id}`}
        />
      )}
      {!!error && (
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
    paddingTop: 30,
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

export default FacultyListScreen;
