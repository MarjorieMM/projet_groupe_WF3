import { Category } from './category';

export interface Product {
  category: Category;
  description: string;
  id: number;
  name: string;
  picture: string;
  price: number;
}
