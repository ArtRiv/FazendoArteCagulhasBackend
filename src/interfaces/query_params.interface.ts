import { ProductCategoriesTypes } from '../types/product_category';
import { SortByTypes } from '../types/product_sort_by';

export interface FilteredProductQueryParams {
  page: number;
  category: ProductCategoriesTypes;
  sort_by: SortByTypes;
}

export interface ResultsProductQueryParams {
  search_query: string;
  page: number;
  sort_by: SortByTypes;
}
