export interface Review {
  created_at: number;
  from: string;
  id: string;
  media: Array<string>;
  product_id: string;
  rating: number;
  text: string;
  title: string;
  user: string;
}
