import { Prisma } from '@prisma/client';
import { SortByTypes } from 'src/types/product_sort_by';

export const getSortByQueryConstraint = (sortBy: SortByTypes) => {
  switch (sortBy) {
    case 'BEST_SELLING':
      return { field: 'purchase_count', order: 'desc' as Prisma.SortOrder };
    case 'PRICE_DESCENDING':
      return { field: 'price', order: 'desc' as Prisma.SortOrder };
    case 'PRICE_ASCENDING':
      return { field: 'price', order: 'asc' as Prisma.SortOrder };
    default:
      return { field: 'created_at', order: 'desc' as Prisma.SortOrder };
  }
};
