export interface ICategory {
  id: string;
  code: string;
  title: string;
  is_root: boolean;
  description?: string;
  sub_categories?: number[];
}
