export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  details: string[];
  ingredients: string;
  volume: string;
  badge?: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

export type Category = 'skincare' | 'serum' | 'hidratante' | 'limpeza' | 'protetor' | 'olhos' | 'labios' | 'perfume';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}
