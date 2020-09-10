import { Platform } from "react-native";

export const firebaseConfig = {
  apiKey: "AIzaSyC3l_0HAqLYdtSO_oQJX-lwaMUEMNoHp1Y",
  authDomain: "instituto-elite.firebaseapp.com",
  databaseURL: "https://instituto-elite.firebaseio.com",
  projectId: "instituto-elite",
  storageBucket: "instituto-elite.appspot.com",
  messagingSenderId: "720371133613",
  appId: "1:720371133613:web:fc7fdc932b8c0cd585ea24",
  measurementId: "G-QYVLCW4H1G"
};

export const companyInfo = {
  phoneNumber: 4043004,
  mobilePhoneNumber: `${Platform.OS == 'ios' ? '' : '+'}59165771335`,
  headquartersLocation: { latitude: -17.392477, longitude: -66.151015 }
};
