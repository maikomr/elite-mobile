export type PreUniversityCourse = {
  liveesCheckoutUrl: string;
  startDate: firebase.firestore.Timestamp;
  scheduleImageRef: string;
  subjects: [{ monthlyRate: number; ref: any; description: string }];
  sales: [{ price: number; title: string }]
};
