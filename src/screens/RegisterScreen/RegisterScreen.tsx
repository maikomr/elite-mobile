import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, Layout, Input, Datepicker, Button } from "@ui-kitten/components";
import { parsePhoneNumber } from "libphonenumber-js";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
import firebase from "firebase";

interface IErrors {
  fullName?: string[];
  birthDate?: string[];
  phone?: string[];
  city?: string[];
}

const RegisterScreen = () => {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState<Date>();
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>("BO");

  const [errors, setErrors] = useState<IErrors>({});

  const handleCountrySelect = (country: Country) => {
    setCountryCode(country.cca2);
  };

  const onSubmit = () => {
    const newErrors: IErrors = {};
    if (!fullName.trim().length) {
      newErrors.fullName = ["Este campo es requerido"];
    }
    if (!birthDate) {
      newErrors.birthDate = ["Este campo es requerido"];
    }
    const phoneNumber = parsePhoneNumber(phone.trim(), countryCode as any);
    if (!phone.trim().length) {
      newErrors.phone = ["Este campo es requerido"];
    } else {
      if (!phoneNumber.isValid()) {
        newErrors.phone = ["Formato no válido"];
      }
    }
    if (!city.trim().length) {
      newErrors.city = ["Este campo es requerido"];
    }

    setErrors(newErrors);

    if (!Object.keys(newErrors).length) {
      const user = {
        fullName: fullName.trim(),
        birthDate: firebase.firestore.Timestamp.fromDate(birthDate as Date),
        phone: phoneNumber.formatInternational(),
        city: city.trim(),
      };
      console.log(user);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Layout style={styles.container}>
        <View style={styles.formControl}>
          <Text style={styles.formLabel}>* Nombre completo:</Text>
          <Input placeholder="Nombre completo" value={fullName} onChangeText={setFullName} />
          {errors.fullName?.length &&
            errors.fullName.map((e, i) => (
              <Text key={`error-fullName-${i}`} style={styles.errorMessage}>
                {e}
              </Text>
            ))}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.formLabel}>* Fecha de nacimiento:</Text>
          <Datepicker
            placeholder="Fecha de nacimiento"
            date={birthDate}
            onSelect={setBirthDate}
            min={new Date(Date.parse("01 Jan 1900 00:00:00 GMT"))}
          />
          {errors.birthDate?.length &&
            errors.birthDate.map((e, i) => (
              <Text key={`error-fullName-${i}`} style={styles.errorMessage}>
                {e}
              </Text>
            ))}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.formLabel}>* Teléfono:</Text>
          <View style={styles.phoneInputContainer}>
            <CountryPicker countryCode={countryCode} withCallingCode={true} onSelect={handleCountrySelect} />
            <Input style={styles.phoneInput} placeholder="000 0000" value={phone} onChangeText={setPhone} />
          </View>
          {errors.phone?.length &&
            errors.phone.map((e, i) => (
              <Text key={`error-fullName-${i}`} style={styles.errorMessage}>
                {e}
              </Text>
            ))}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.formLabel}>* Ciudad:</Text>
          <Input placeholder="Ciudad" value={city} onChangeText={setCity} />
          {errors.city?.length &&
            errors.city.map((e, i) => (
              <Text key={`error-fullName-${i}`} style={styles.errorMessage}>
                {e}
              </Text>
            ))}
        </View>
        <View style={styles.submitBtnContainer}>
          <Button onPress={onSubmit} accessoryRight={(_) => <MaterialIcons name="check" size={24} color="white" />}>
            Confirmar registro
          </Button>
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
  formControl: {
    marginTop: 30,
  },
  formLabel: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  phoneInputContainer: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  phoneInput: {
    flex: 1
  },
  errorMessage: {
    color: "red",
  },
  submitBtnContainer: {
    marginTop: 40,
    paddingHorizontal: 40,
  },
});

export default RegisterScreen;
