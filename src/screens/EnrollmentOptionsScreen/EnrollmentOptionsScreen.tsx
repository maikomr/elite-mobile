import React, { useState, useEffect, useMemo } from "react";
import { ScrollView, StyleSheet, Linking, View } from "react-native";
import { Layout, Text, Spinner, IndexPath, Select, SelectItem, CheckBox, Card, Icon } from "@ui-kitten/components";
import { StackScreenProps } from "@react-navigation/stack";
import stringifyDate from "../../utils/stringifyDate";
import { companyInfo } from "../../constants/general";
import WhatsappButton from "../../components/WhatsappButton/WhatsappButton";
import LiveesButton from "../../components/LiveesButton/LiveesButton";
import { docType } from "../../utils/docType";
import { PreUniversityCourse } from "../../models/preUniversityCourse";

type SelectedSubjetMap = { [id: string]: boolean };

const EnrollmentOptionsScreen: React.FC<StackScreenProps<any>> = ({ route }) => {
  const [courses, setCourses] = useState<docType[]>();
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<IndexPath>(new IndexPath(0));
  const [subjects, setSubjects] = useState<docType[]>();
  const [selectedSubjects, setSelectedSubjects] = useState<SelectedSubjetMap>({});
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
      const snapshot: docType[] = await Promise.all(selectedCourse.subjects.map((subject: any) => subject.ref.get()));
      setSubjects(snapshot);
    };
    fetchSubjects();
    if (selectedCourse.sales.length) setSelectedSaleIndex(new IndexPath(selectedCourse.sales.length - 1));
  }, [selectedCourse, selectedCourseIndex]);

  useEffect(() => {
    if (!subjects) return;
    setSelectedSubjects(
      subjects.reduce(
        (total: SelectedSubjetMap, current: { id: string }) => ({
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

  const startDateOptions = useMemo(
    () =>
      courses
        ? courses
            .map((course: docType) => (course.data() as PreUniversityCourse).startDate.toDate())
            // .sort((a: Date, b: Date) => +a - +b)
            .map((d: Date) => stringifyDate(d))
        : [],
    [courses]
  );

  const setAllSelected = (checked: boolean) => {
    if (!subjects) return;
    setSelectedSubjects(
      subjects.reduce(
        (total: SelectedSubjetMap, current: { id: string }) => ({
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
      subjects.forEach((s: docType) => {
        if (selectedSubjects[s.id]) price += s.data().monthlyRate;
      });
      return price;
    }
  }, [selectedCourse, selectedCourseIndex, selectedSaleIndex, subjects, selectedSubjects]);

  const handleWhatsappPress = async () => {
    if (!selectedCourse) return;
    const facultyName = route.params.faculty.data().name;
    let msg = `Hola, quisiera inscribirme al curso pre-universitario "${facultyName}" que comienza el ${stringifyDate(
      selectedCourse.startDate.toDate()
    )}`;

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
        <View style={styles.subjectsCheckBox}>
          <CheckBox checked={allSubjectsSelected} onChange={setAllSelected}>
            {(evaProps) => (
              <Text {...evaProps} style={styles.subjectsSubtitle} category="h6">
                Materias
              </Text>
            )}
          </CheckBox>
        </View>
        <View>
          {subjects.map((subject: docType) => {
            const data = subject.data();
            return (
              <CheckBox
                key={subject.id}
                style={styles.subjectCheckBox}
                checked={selectedSubjects[subject.id]}
                onChange={(checked) => setSelectedSubjects({ ...selectedSubjects, [subject.id]: checked })}
              >
                {data.name}
              </CheckBox>
            );
          })}
        </View>
        {allSubjectsSelected && selectedSaleIndex && (
          <View>
            <Text style={styles.saleSectionTitle} category="h6">
              Paquetes de oferta:
            </Text>
            <View style={styles.salesContainer}>
              {selectedCourse.sales.map((sale: any, index: number) => {
                const isSelected = selectedSaleIndex.row === index;
                return (
                  <Card
                    style={[styles.saleCard, isSelected && styles.selectedSaleCard]}
                    key={`sale-${index}`}
                    onPress={() => setSelectedSaleIndex(new IndexPath(index))}
                  >
                    <View style={styles.saleCardBody}>
                      <Text style={styles.saleTitle} category="h6" status="primary">
                        {sale.title}
                      </Text>
                      <Text style={styles.salePrice} category="h6" status="primary">
                        {sale.price} Bs.
                      </Text>
                      {isSelected && <Icon style={styles.icon} fill="#000000" name="checkmark-square-2-outline" />}
                    </View>
                  </Card>
                );
              })}
            </View>
          </View>
        )}
        <Text style={styles.priceText}>{`Precio del curso: ${coursePrice} Bs.`}</Text>
        <View style={styles.button}>
          <WhatsappButton onPress={handleWhatsappPress} />
        </View>
        <View style={styles.button}>
          <LiveesButton onPress={handleLiveesPress} />
        </View>
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
  subjectsCheckBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  subjectsSubtitle: {
    fontWeight: "bold",
    marginLeft: 11,
  },
  subjectCheckBox: {
    marginBottom: 10,
  },
  salesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  saleSectionTitle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  saleCard: {
    width: 110,
    height: 80,
    borderRadius: 10,
    borderWidth: 0,
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  selectedSaleCard: {
    width: 120,
    height: 100,
    shadowColor: "#FDDFD3",
  },
  saleCardBody: {
    alignItems: "center",
  },
  saleTitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#000000",
  },
  salePrice: {
    fontSize: 14,
    textAlign: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 8,
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    marginVertical: 20,
    marginHorizontal: 30,
  },
});

export default EnrollmentOptionsScreen;
