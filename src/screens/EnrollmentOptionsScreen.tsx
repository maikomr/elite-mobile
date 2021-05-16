import React, { useState, useEffect, useMemo } from "react";
import { ScrollView, StyleSheet, Linking, View } from "react-native";
import { Layout, Text, Spinner, IndexPath, Select, SelectItem, CheckBox } from "@ui-kitten/components";
import { StackScreenProps } from "@react-navigation/stack";
import stringifyDate from "../utils/stringifyDate";
import { companyInfo } from "../constants/general";
import WhatsappButton from "../components/WhatsappButton";
import LiveesButton from "../components/LiveesButton";
import { docType } from "../utils/docType";
import { PreUniversityCourse } from "../models/preUniversityCourse";
import { SelectedSubjectMap } from "../models/subject";
import SelectableSubjectList from "../components/SelectableSubjectList";
import CourseSales from "../components/CourseSales";

const EnrollmentOptionsScreen: React.FC<StackScreenProps<any>> = ({ route }) => {
  const [courses, setCourses] = useState<docType[]>();
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<IndexPath>(new IndexPath(0));
  const [subjects, setSubjects] = useState<docType[]>();
  const [selectedSubjects, setSelectedSubjects] = useState<SelectedSubjectMap>({});
  const [selectedSaleIndex, setSelectedSaleIndex] = useState<IndexPath>();

  useEffect(() => {
    const fetchCourses = async () => {
      const snapshot = await route.params.faculty.ref.collection("courses").get();
      setCourses(snapshot.docs);
    };
    fetchCourses();
  }, [route.params.faculty]);

  const selectedCourse = useMemo(() => courses && courses[selectedCourseIndex.row].data(), [
    courses,
    selectedCourseIndex,
  ]);

  useEffect(() => {
    if (!selectedCourse) return;
    const fetchSubjects = async () => {
      const promises = selectedCourse.subjects.map((subject: any) => subject.ref.get());
      const snapshot: docType[] = await Promise.all(promises);
      setSubjects(snapshot);
    };
    fetchSubjects();
    if (selectedCourse.sales.length) {
      setSelectedSaleIndex(new IndexPath(selectedCourse.sales.length - 1));
    }
  }, [selectedCourse, selectedCourseIndex]);

  useEffect(() => {
    if (!subjects) return;
    setSelectedSubjects(
      subjects.reduce(
        (total: SelectedSubjectMap, current: { id: string }) => ({
          ...total,
          [current.id]: true,
        }),
        {}
      )
    );
  }, [subjects]);

  const allSubjectsSelected = useMemo(() => {
    if (!subjects) return false;
    let allSelected = true;
    subjects?.forEach((s: docType) => {
      if (!selectedSubjects[s.id]) allSelected = false;
    });
    return allSelected;
  }, [subjects, selectedSubjects]);

  const startDateOptions = useMemo(() => {
    if (!courses) {
      return [];
    }
    return courses.map((course: docType) => {
      const preUniversityCourse: PreUniversityCourse = course.data() as PreUniversityCourse;
      const startDate = preUniversityCourse.startDate.toDate();
      return stringifyDate(startDate);
    });
  }, [courses]);

  const setAllSelected = (checked: boolean) => {
    if (!subjects) return;
    setSelectedSubjects(
      subjects.reduce(
        (total: SelectedSubjectMap, current: { id: string }) => ({
          ...total,
          [current.id]: checked,
        }),
        {}
      )
    );
  };

  const coursePrice = useMemo(() => {
    if (!selectedCourse || !subjects) return 0;
    if (allSubjectsSelected && selectedSaleIndex) {
      return selectedCourse.sales[selectedSaleIndex.row].price;
    } else {
      let price = 0;
      subjects.forEach((s: docType, index) => {
        if (selectedSubjects[s.id]) {
          price += selectedCourse.subjects[index].monthlyRate;
        }
      });
      return price;
    }
  }, [selectedCourse, selectedCourseIndex, selectedSaleIndex, subjects, selectedSubjects]);

  const handleWhatsappPress = async () => {
    if (!selectedCourse) return;
    const subjectsToShow = subjects?.filter((s) => selectedSubjects[s.id]).map((s) => s.data().name);
    const facultyName = route.params.faculty.data().name;
    let msg = `Hola, quisiera inscribirme al curso pre-universitario "${facultyName}" que comienza el ${stringifyDate(
      selectedCourse.startDate.toDate()
    )}, con las materias: ${subjectsToShow?.join(", ")}`;

    if (allSubjectsSelected && selectedSaleIndex) {
      msg += `, por el periodo de ${selectedCourse.sales[selectedSaleIndex.row].title}`;
    }

    const url = `whatsapp://send?text=${msg}&phone=${companyInfo.mobilePhoneNumber}`;
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLiveesPress = async () => {
    if (!selectedCourse) return;
    const url = selectedCourse.liveesCheckoutUrl;
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  if (!selectedCourse || !subjects) {
    return (
      <Layout style={styles.loadingStateContainer}>
        <Spinner size="giant" />
      </Layout>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Layout style={styles.container}>
        <Text style={styles.subtitle} category="h6">
          Selecciona una fecha de inicio:
        </Text>
        <Select
          style={styles.select}
          selectedIndex={selectedCourseIndex}
          value={startDateOptions[selectedCourseIndex.row]}
          onSelect={(index: IndexPath | IndexPath[]) => setSelectedCourseIndex(index as IndexPath)}
        >
          {startDateOptions.map((startDate: any) => (
            <SelectItem key={startDate} title={startDate} />
          ))}
        </Select>
        <SelectableSubjectList
          subjects={subjects}
          selectedCourse={selectedCourse}
          selectedSubjects={selectedSubjects}
          allSubjectsSelected={allSubjectsSelected}
          onSelect={(subjectId, checked) => setSelectedSubjects({ ...selectedSubjects, [subjectId]: checked })}
          onSelectAll={setAllSelected}
        />
        {allSubjectsSelected && selectedSaleIndex && (
          <CourseSales
            sales={selectedCourse.sales}
            selectedSaleIndex={selectedSaleIndex}
            onSelect={(index: number) => setSelectedSaleIndex(new IndexPath(index))}
          />
        )}
        <Text style={styles.priceText}>{`Precio del curso: ${coursePrice} Bs.`}</Text>
        <View style={styles.button}>
          <WhatsappButton onPress={handleWhatsappPress} />
        </View>
        {allSubjectsSelected && selectedSaleIndex && (
          <View style={styles.button}>
            <LiveesButton onPress={handleLiveesPress} />
          </View>
        )}
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  select: {
    marginBottom: 20,
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    marginHorizontal: 30,
  },
});

export default EnrollmentOptionsScreen;
