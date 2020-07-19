export interface ICategory {
  id: number;
  code: string;
  title: string;
  is_root: boolean;
  description?: string;
  sub_categories?: number[];
}

export type ICategoryMap = { [id: string]: ICategory };
