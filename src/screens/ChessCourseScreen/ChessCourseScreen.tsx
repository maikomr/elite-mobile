import React from 'react';
import { ScrollView, StyleSheet, View, Linking } from 'react-native';
import { Layout, Text, Icon, Button } from '@ui-kitten/components';
import Collapsible from '../../components/Collapsible';
import { companyInfo } from '../../constants/general';

const ChessCourseScreen = () => {
  const handleConfirm = async () => {
    const msg = "Hola, solicito inscribirme al curso de Ajedrez";
    const url = `whatsapp://send?text=${msg}&phone=${companyInfo.mobilePhoneNumber}`;
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  const benefits = [
    'Plataforma Virtual de Ajedrez',
    '4 semanas de clases',
    '2 clases por semana',
    'Club de Ajedrez',
    'Material PDF'
  ];

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Layout style={styles.container}>
        <Text style={styles.paragraph}>
          Clases virtuales de ajedrez para todas las edades y niveles: principiantes, intermedios y expertos.
        </Text>
        <Text style={styles.paragraph}>
          Horarios a elección, torneos online los sabados y domingos.
        </Text>
        <Text style={styles.paragraph}>
          Mejora la memoria, la concentración, la disciplina, la resolución de problemas y el espíritu competitivo.
        </Text>
        <View style={styles.collapsible}>
          <Collapsible title="Beneficios">
            <View style={styles.collapsibleBody}>
              {benefits.map((benefit: any) => (
                <View style={styles.listItem} key={benefit}>
                  <Text style={styles.paragraph}>- {benefit}</Text>
                </View>
              ))}
            </View>
          </Collapsible>
        </View>
        <Text style={styles.priceText}>Inversión: 120 Bs.</Text>
        <Button
          style={styles.enrollmentButton}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  paragraph: {
    marginBottom: 5,
    fontSize: 16
  },
  field: {
    marginTop: 20,
    fontSize: 16
  },
  collapsible: {
    marginVertical: 10
  },
  collapsibleBody: {
    marginVertical: 10
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  enrollmentButton: {
    marginTop: 20,
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 10,
  },
  notice: {
    marginTop: 20,
    textAlign: 'center'
  },
});

export default ChessCourseScreen;
