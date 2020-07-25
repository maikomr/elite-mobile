export type AdmissionPeriod = {
  id: number;
  startDate: number;
  endDate: number;
}

export type AdmissionPeriodMap = { [id: string]: AdmissionPeriod };
