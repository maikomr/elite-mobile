import React, { useMemo, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Linking } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Layout, Text, Icon, Button } from '@ui-kitten/components';
import ImageView from "react-native-image-viewing";
import stringifyDate from '../../utils/stringifyDate';
import Collapsible from '../../components/Collapsible';
import { companyInfo } from '../../constants/general';

const AcademicLevelingDetailsScreen: React.FC<StackScreenProps<any>> = ({ navigation, route }) => {
  const [isScheduleImageOpen, setIsScheduleImageOpen] = useState(false);
  const data = useMemo(() => route.params.data, [route.params.data]);

  useEffect(() => navigation.setOptions({ title: route.params.data.title }), [route.params.data]);

  const handleConfirm = async () => {
    const msg = `Hola, solicito inscribirme al curso de nivelación académica para "${
      data.title
      }", que comienza el ${
      stringifyDate(data.startDate.toDate())
      }`;
    const url = `whatsapp://send?text=${msg}&phone=${companyInfo.mobilePhoneNumber}`;
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Layout style={styles.container}>
        {data.description.split('\\n').map((paragraph: string, i: number) => (
          <Text style={styles.descriptionParagraph} key={`description-paragraph-${i}`}>{paragraph}</Text>
        ))}
        <Text style={styles.field}><Text style={styles.label}>Duración:</Text> {data.duration} {`mes${data.duration > 1 ? 'es' : ''}`}</Text>
        <Text style={styles.field}><Text style={styles.label}>Inversión:</Text> {data.monthlyRate} Bs.</Text>
        <Text style={styles.field}><Text style={styles.label}>Inicio de clases:</Text> {stringifyDate(data.startDate.toDate())}</Text>
        <View style={styles.field}>
          <Collapsible title="Materias">
            <View style={styles.collapsibleBody}>
              {data.subjects.map((subject: any) => (
                <View style={styles.subjectRow} key={subject.name}>
                  <Icon style={styles.icon} name={subject.icon} fill="#000000" />
                  <Text style={styles.descriptionParagraph}>{subject.name}</Text>
                </View>
              ))}
            </View>
          </Collapsible>
        </View>
        <Button
          style={styles.button}
          onPress={() => setIsScheduleImageOpen(true)}
          appearance="outline"
          accessoryRight={(style) => (
            <Icon {...style} name="eye-outline" />
          )}
        >
          Ver horario
        </Button>
        <ImageView
          images={[{ uri: data.scheduleImage }]}
          imageIndex={0}
          visible={isScheduleImageOpen}
          onRequestClose={() => setIsScheduleImageOpen(false)}
        />
        <Button
          style={[styles.button, styles.enrollmentButton]}
          onPress={handleConfirm}
          accessoryRight={(style) => (
            <Icon {...style} name="checkmark-circle-outline" />
          )}
        >
          Inscribirse a este curso
        </Button>
        <Text style={styles.notice}>
          Nota: Al inscribirte se iniciará una conversación de Whatsapp en la que
          podras contactarte con nosotros y continuar con el proceso de
          inscripción.
        </Text>
      </Layout>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  descriptionParagraph: {
    marginBottom: 5,
    fontSize: 16
  },
  field: {
    marginTop: 20,
    fontSize: 16
  },
  label: {
    fontWeight: 'bold'
  },
  collapsibleBody: {
    marginTop: 10
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  button: {
    marginTop: 20,
    justifyContent: 'space-between',
  },
  enrollmentButton: {
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 10,
  },
  notice: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default AcademicLevelingDetailsScreen;
