import type { BaseQuery, BaseTodo, Todo, Todos } from "@/types";
import BaseEndpoint from "./Base";

export default class TodoEndpoint extends BaseEndpoint {
  #request = this.createRequest();

  get(): Promise<Todos>;
  get<K extends readonly (keyof BaseTodo)[]>(
    query: BaseQuery<BaseTodo, K>
  ): Promise<Todos<K>>;
  get(id: number): Promise<Todo>;
  get<K extends readonly (keyof BaseTodo)[]>(
    id: number,
    query: BaseQuery<BaseTodo, K>
  ): Promise<Todo<K>>;
  get(by: "user", userId: number): Promise<Todos>;
  get<K extends readonly (keyof BaseTodo)[]>(
    by: "user",
    userId: number,
    query: BaseQuery
  ): Promise<Todos<K>>;
  get(
    arg1?: BaseQuery | number | string,
    arg2?: BaseQuery | number,
    arg3?: BaseQuery
  ) {
    let url = "todos";
    let query = {};
    if (typeof arg1 === "number") {
      url = `comments/${arg1}`;
      query = arg2 || {};
    } else if (typeof arg1 === "string") {
      url = `comments/${arg1}/${arg2}`;
      query = arg3 || {};
    } else if (arg1 && typeof arg1 === "object") {
      query = arg1;
    }

    return this.#request.get(url, query);
  }

  random(): Promise<Todos>;
  random(max: number): Promise<Todos>;
  random(max?: number) {
    const url = max ? `todos/random/${max}` : "todos/random";
    return this.#request.get(url);
  }
}
