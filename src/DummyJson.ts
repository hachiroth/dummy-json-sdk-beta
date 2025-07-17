import AuthEndpoint from "./endpoints/Auth";
import CartEndpoint from "./endpoints/Cart";
import CommentEndpoint from "./endpoints/Comment";
import PostEndpoint from "./endpoints/Post";
import ProductEndpoint from "./endpoints/Product";
import QuoteEndpoint from "./endpoints/quote";
import RecipeEndpoint from "./endpoints/Recipe";
import TodoEndpoint from "./endpoints/Todo";
import UserEndpoint from "./endpoints/User";
import type { InitConfig } from "./types";

export class DummyJson {
  static #instance: DummyJson;
  #config?: InitConfig;
  baseURL = "https://dummyjson.com";

  auth = new AuthEndpoint(this);
  carts = new CartEndpoint(this);
  comments = new CommentEndpoint(this);
  posts = new PostEndpoint(this);
  products = new ProductEndpoint(this);
  quotes = new QuoteEndpoint(this);
  recipes = new RecipeEndpoint(this);
  todos = new TodoEndpoint(this);
  users = new UserEndpoint(this);

  constructor(config?: InitConfig) {
    this.#config = config;

    if (DummyJson.#instance) {
      return DummyJson.#instance;
    }

    DummyJson.#instance = this;
  }

  static get instance() {
    return DummyJson.#instance;
  }

  setAccessToken(accessToken: string) {
    if (!this.#config) {
      this.#config = {};
    }
    this.#config.Authorization = accessToken;
  }

  setRefreshToken(refreshToken: string) {
    if (!this.#config) {
      this.#config = {};
    }
    this.#config.refreshToken = refreshToken;
  }

  get config() {
    return this.#config;
  }
}
