import type {
  BaseQuery,
  BaseUser,
  User,
  Users,
  NestedKeyOf,
  GetNestedValueType,
  Carts,
  Posts,
  Quotes,
} from "@/types";
import BaseEndpoint from "./Base";

export default class UserEndpoint extends BaseEndpoint {
  #request = this.createRequest();

  get(): Promise<Users>;
  get<K extends readonly (keyof BaseUser)[]>(
    query: BaseQuery<BaseUser, K>
  ): Promise<Users<K>>;
  get(id: number): Promise<User>;
  get<K extends readonly (keyof BaseUser)[]>(
    id: number,
    query: BaseQuery<BaseUser, K>
  ): Promise<User<K>>;
  get(arg1?: number | BaseQuery, query?: BaseQuery) {
    const arg1IsNotObj = arg1 && typeof arg1 !== "object";
    const url = arg1IsNotObj ? `users/${arg1}` : "users";
    return this.#request.get(url, arg1IsNotObj ? query : arg1);
  }

  search(keyword: string): Promise<Users>;
  search<K extends readonly (keyof BaseUser)[]>(
    keyword: string,
    query: BaseQuery<BaseUser, K>
  ): Promise<Users<K>>;
  search(keyword: string, query?: BaseQuery) {
    return this.#request.get("users/search", { q: keyword, ...(query || {}) });
  }

  filter<K extends NestedKeyOf<BaseUser>>(
    key: K,
    value: GetNestedValueType<BaseUser, K>
  ): Promise<Users>;
  filter<
    K extends NestedKeyOf<BaseUser>,
    Q extends readonly (keyof BaseUser)[]
  >(
    key: K,
    value: GetNestedValueType<BaseUser, K>,
    query: BaseQuery<BaseUser, Q>
  ): Promise<Users<Q>>;
  filter(key: string, value: any, query?: BaseQuery) {
    return this.#request.get("users/filter", { key, value, ...(query || {}) });
  }

  carts(id: number): Promise<Carts> {
    return this.#request.get(`users/${id}/carts`);
  }

  posts(id: number): Promise<Posts> {
    return this.#request.get(`users/${id}/posts`);
  }

  todos(id: number): Promise<Quotes> {
    return this.#request.get(`users/${id}/todos`);
  }
}
