export type Career = {
  id: number;
  title: string;
  description?: string;
  subjects?: number[];
}

export type CareerMap = { [id: string]: Career };
