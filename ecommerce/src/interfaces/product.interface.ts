import { Links, Meta } from "./response.interfact";

export interface Product {
  _id:string;
  name: string;
  price: number;
  stock?: number;
  quantity?:number;
}
export interface ProductsResponse {
  products: Product[]
  currentPage: number
  totalPages: number,
  previousCursor?: number;
  nextCursor?: number;
}
