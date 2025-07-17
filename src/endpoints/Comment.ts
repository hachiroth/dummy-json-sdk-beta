import type { BaseComment, BaseQuery, Comments, Comment } from "@/types";
import BaseEndpoint from "./Base";

export default class CommentEndpoint extends BaseEndpoint {
  #request = this.createRequest();

  get(): Promise<Comments>;
  get<K extends readonly (keyof BaseComment)[]>(
    query: BaseQuery<BaseComment, K>
  ): Promise<Comments<K>>;
  get(id: number): Promise<Comment>;
  get<K extends readonly (keyof BaseComment)[]>(
    id: number,
    query: BaseQuery<BaseComment, K>
  ): Promise<Comment<K>>;
  get(by: "post", postId: number): Promise<Comments>;
  get<K extends readonly (keyof BaseComment)[]>(
    by: "post",
    postId: number,
    query: BaseQuery<BaseComment, K>
  ): Promise<Comments<K>>;
  get(
    arg1?: BaseQuery | number | string,
    arg2?: BaseQuery | number,
    arg3?: BaseQuery
  ) {
    let url = "comments";
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
}
