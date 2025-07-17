import type {
  BaseQuery,
  BaseProduct,
  Product,
  Products,
  Category,
} from "@/types";
import BaseEndpoint from "./Base";

export default class ProductEndpoint extends BaseEndpoint {
  #request = this.createRequest();

  get(): Promise<Products>;
  get<K extends readonly (keyof BaseProduct)[]>(
    query: BaseQuery<BaseProduct, K>
  ): Promise<Products<K>>;
  get(id: number): Promise<BaseProduct>;
  get<K extends readonly (keyof BaseProduct)[]>(
    id: number,
    query: BaseQuery<BaseProduct, K>
  ): Promise<Product<K>>;
  get(category: string): Promise<Products>;
  get<K extends readonly (keyof BaseProduct)[]>(
    category: string,
    query: BaseQuery<BaseProduct, K>
  ): Promise<Products<K>>;
  get(arg1?: number | string | BaseQuery, query?: BaseQuery) {
    const url =
      typeof arg1 === "number"
        ? `products/${arg1}`
        : typeof arg1 === "string"
        ? `product/category/${arg1}`
        : "products";
    return this.#request.get(url, typeof arg1 !== "object" ? query : arg1);
  }

  search(keywords: string): Promise<Products>;
  search<K extends readonly (keyof BaseProduct)[]>(
    keywords: string,
    query: BaseQuery<BaseProduct, K>
  ): Promise<Products<K>>;
  search(keywords: string, query?: BaseQuery) {
    return this.#request.get<Products>("products/search", {
      q: keywords,
      ...query,
    });
  }

  categories(): Promise<Category[]>;
  categories(type: "list"): Promise<string[]>;
  categories(type?: string) {
    const url =
      typeof type === "string" ? "product/category-list" : "product/categories";
    return this.#request.get(url);
  }
}
