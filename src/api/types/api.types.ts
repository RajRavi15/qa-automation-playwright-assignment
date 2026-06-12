export interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
}

export interface ProductsResponse {
  responseCode: number;
  products: Product[];
}

export interface BrandsResponse {
  responseCode: number;
  brands: { brand: string }[];
}

export interface ApiResponse {
  responseCode: number;
  message?: string;
}