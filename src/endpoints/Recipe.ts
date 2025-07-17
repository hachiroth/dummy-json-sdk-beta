import type { BaseQuery, BaseRecipe, Recipe, Recipes } from "@/types";
import BaseEndpoint from "./Base";

export default class RecipeEndpoint extends BaseEndpoint {
  #request = this.createRequest();

  get(): Promise<Recipes>;
  get<K extends readonly (keyof BaseRecipe)[]>(
    query: BaseQuery<BaseRecipe, K>
  ): Promise<Recipes<K>>;
  get(id: number): Promise<Recipe>;
  get<K extends readonly (keyof BaseRecipe)[]>(
    id: number,
    query: BaseQuery<BaseRecipe, K>
  ): Promise<Recipe<K>>;
  get(by: "tag", tag: string): Promise<Recipes>;
  get<K extends readonly (keyof BaseRecipe)[]>(
    by: "tag",
    tag: string,
    query: BaseQuery<BaseRecipe, K>
  ): Promise<Recipes<K>>;
  get(by: "meal-type", meal: string): Promise<Recipes>;
  get<K extends readonly (keyof BaseRecipe)[]>(
    by: "meal-type",
    meal: string,
    query: BaseQuery<BaseRecipe, K>
  ): Promise<Recipes<K>>;
  get(
    arg1?: number | string | BaseQuery,
    arg2?: string | BaseQuery,
    arg3?: BaseQuery
  ) {
    const url =
      !arg1 || typeof arg1 === "object"
        ? "recipes"
        : typeof arg1 === "number"
        ? `recipes/${arg1}`
        : typeof arg1 === "string" && arg2
        ? `recipes/${arg1}/${arg2}`
        : "recipes";
    const query =
      arg1 && typeof arg1 === "object"
        ? arg1
        : arg2 && typeof arg2 === "object"
        ? arg2
        : arg3;
    return this.#request.get(url, query || {});
  }
}
