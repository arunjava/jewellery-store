export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  material: string;
  imageUrl: string;
  featured: boolean;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
