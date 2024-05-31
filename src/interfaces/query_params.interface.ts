import { ProductCategoriesType } from '../types/product_category';
import { SortByTypes } from '../types/product_sort_by';

export interface ProductQueryParams {
  page?: number;
  category?: ProductCategoriesType;
  sort_by?: SortByTypes;
}
