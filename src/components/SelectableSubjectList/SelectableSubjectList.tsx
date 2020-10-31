import React, { useState } from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import { Layout, Text, CheckBox, Icon, Popover } from "@ui-kitten/components";
import { docType } from "../../utils/docType";
import { SelectedSubjectMap } from "../../models/subject";

interface ISubjectListProps {
  subjects: docType[];
  selectedCourse: any;
  selectedSubjects?: SelectedSubjectMap;
  onSelect?: (subjectId: string, checked: boolean) => void;
}

const SelectableSubjectList = ({ subjects, selectedCourse, selectedSubjects, onSelect }: ISubjectListProps) => {
  const [visibleSubjectInfo, setVisibleSubjectInfo] = useState<string>();
  return (
    <View>
      {subjects.map((subject: docType, index) => {
        const data = subject.data();
        return (
          <View style={styles.subjectCheckBoxContainer}>
            <CheckBox
              key={subject.id}
              style={styles.subjectCheckBox}
              checked={selectedSubjects && selectedSubjects[subject.id]}
              onChange={(checked) => onSelect && onSelect(subject.id, checked)}
            >
              {(evaProps) => (
                <Text {...evaProps} style={styles.subjectCheckBoxText}>
                  {data.name}
                </Text>
              )}
            </CheckBox>
            <Popover
              anchor={() => (
                <TouchableHighlight onPress={() => setVisibleSubjectInfo(subject.id)} underlayColor="#ffffff">
                  <Icon style={styles.subjectInfoIcon} fill="#000000" name="info-outline" />
                </TouchableHighlight>
              )}
              visible={visibleSubjectInfo === subject.id}
              onBackdropPress={() => setVisibleSubjectInfo("")}
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
  );
};

const styles = StyleSheet.create({
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
