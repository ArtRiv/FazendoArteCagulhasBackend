import { SortByTypes } from '../types/product_sort_by';

export interface FilteredProductQueryParams {
  page: number;
  category_id: number;
  sort_by: SortByTypes;
}

export interface ResultsProductQueryParams {
  search_query: string;
  page: number;
  sort_by: SortByTypes;
}
