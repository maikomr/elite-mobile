import { Platform } from "react-native";

export const companyInfo = {
  phoneNumber: 4043004,
  mobilePhoneNumber: `${Platform.OS == 'ios' ? '' : '+'}59165771335`,
  headquartersLocation: { latitude: -17.392477, longitude: -66.151015 },
  email: 'soporte@yoinstitutoelite.com'
};
