export interface CreateProductDto {
  created_at: number;
  description: Array<string>;
  image: string;
  link: string;
  price: number;
  product_group: string;
  purchase_count: number;
  tag: string;
  title: string;
  type: string;
}