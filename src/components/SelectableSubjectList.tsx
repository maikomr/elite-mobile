import React, { useState, useMemo } from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import { Layout, Text, CheckBox, Icon, Popover } from "@ui-kitten/components";
import { docType } from "../utils/docType";
import { SelectedSubjectMap } from "../models/subject";

interface ISubjectListProps {
  subjects: docType[];
  selectedCourse: any;
  selectedSubjects: SelectedSubjectMap;
  allSubjectsSelected: boolean;
  onSelect: (subjectId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
}

const SelectableSubjectList = ({
  subjects,
  selectedCourse,
  selectedSubjects,
  allSubjectsSelected,
  onSelect,
  onSelectAll,
}: ISubjectListProps) => {
  const [showSubjectInfo, setSowSubjectInfo] = useState<string>();

  return (
    <>
      <View style={styles.subjectsCheckBox}>
        <CheckBox checked={allSubjectsSelected} onChange={onSelectAll}>
          {(evaProps) => (
            <Text {...evaProps} style={styles.subjectsSubtitle} category="h6">
              Materias
            </Text>
          )}
        </CheckBox>
      </View>
      <View>
        {subjects.map((subject: docType, index) => {
          const data = subject.data();
          return (
            <View style={styles.subjectCheckBoxContainer}>
              <CheckBox
                key={subject.id}
                style={styles.subjectCheckBox}
                checked={selectedSubjects[subject.id]}
                onChange={(checked) => onSelect(subject.id, checked)}
              >
                {(evaProps) => (
                  <Text {...evaProps} style={styles.subjectCheckBoxText}>
                    {data.name}
                  </Text>
                )}
              </CheckBox>
              <Popover
                anchor={() => (
                  <TouchableHighlight onPress={() => setSowSubjectInfo(subject.id)} underlayColor="#ffffff">
                    <Icon style={styles.subjectInfoIcon} fill="#000000" name="info-outline" />
                  </TouchableHighlight>
                )}
                visible={showSubjectInfo === subject.id}
                onBackdropPress={() => setSowSubjectInfo("")}
              >
                <Layout style={styles.subjectInfoContainer}>
                  <Text>{`Precio mensual: ${selectedCourse.subjects[index].monthlyRate} Bs.`}</Text>
                  <Text>{selectedCourse.subjects[index].description}</Text>
                </Layout>
              </Popover>
            </View>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  subjectsCheckBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  subjectsSubtitle: {
    fontWeight: "bold",
    marginLeft: 11,
  },
  subjectCheckBoxContainer: {
    flexDirection: "row",
  },
  subjectCheckBox: {
    marginBottom: 10,
  },
  subjectInfoIcon: {
    width: 20,
    height: 20,
  },
  subjectInfoContainer: {
    width: 250,
    padding: 5,
    borderRadius: 10,
    borderWidth: 0,
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  subjectCheckBoxText: {
    marginLeft: 11,
    marginRight: 5,
    fontSize: 14,
  },
});

export default SelectableSubjectList;
