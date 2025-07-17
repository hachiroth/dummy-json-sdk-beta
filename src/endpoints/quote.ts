import type { BaseQuery, BaseQuote, Quote, Quotes } from "@/types";
import BaseEndpoint from "./Base";

export default class QuoteEndpoint extends BaseEndpoint {
  #request = this.createRequest();

  get(): Promise<Quotes>;
  get<K extends readonly (keyof BaseQuote)[]>(
    query: BaseQuery<BaseQuote, K>
  ): Promise<Quotes<K>>;
  get(id: number): Promise<Quote>;
  get<K extends readonly (keyof BaseQuote)[]>(
    id: number,
    query: BaseQuery<BaseQuote, K>
  ): Promise<Quotes<K>>;
  get(arg1?: BaseQuery | number, arg2?: BaseQuery) {
    let url = "quotes";
    let query = {};

    if (typeof arg1 === "number") {
      url = `quotes/${arg1}`;
      query = arg2 || {};
    } else {
      query = arg1 ?? {};
    }
    return this.#request.get(url, query);
  }

  random(): Promise<Quotes>;
  random(max: number): Promise<Quotes>;
  random(max?: number) {
    const url = max ? `/quotes/random/${max}` : "/quotes/random";
    return this.#request.get(url);
  }
}
