import type { Cart, Carts } from "@/types";
import BaseEndpoint from "./Base";

export default class CartEndpoint extends BaseEndpoint {
  #request = this.createRequest();

  get(): Promise<Carts>;
  get(cartId: number): Promise<Cart>;
  get(by: "user", userId: number): Promise<Carts>;
  get(arg1?: number | string, arg2?: number) {
    const url = !arg1
      ? "carts"
      : typeof arg1 === "number"
      ? `carts/${arg1}`
      : arg2
      ? `carts/user/${arg2}`
      : "carts";
    return this.#request.get(url);
  }
}
