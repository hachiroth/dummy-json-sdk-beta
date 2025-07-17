import type {
  BaseComment,
  BasePost,
  BaseQuery,
  Comments,
  Post,
  Posts,
  Tag,
} from "@/types";
import BaseEndpoint from "./Base";

export default class PostEndpoint extends BaseEndpoint {
  #request = this.createRequest();

  get(): Promise<Posts>;
  get<K extends readonly (keyof BasePost)[]>(
    query: BaseQuery<BasePost, K>
  ): Promise<Posts<K>>;
  get(id: number): Promise<Post>;
  get<K extends readonly (keyof BasePost)[]>(
    id: number,
    query: BaseQuery<BasePost, K>
  ): Promise<Post<K>>;
  get(by: "tag", tag: string): Promise<Posts>;
  get<K extends readonly (keyof BasePost)[]>(
    by: "tag",
    tag: string,
    query: BaseQuery<BasePost, K>
  ): Promise<Posts<K>>;
  get(by: "user", userId: number): Promise<Posts>;
  get<K extends readonly (keyof BasePost)[]>(
    by: "user",
    userId: number,
    query: BaseQuery<BasePost, K>
  ): Promise<Posts<K>>;
  get(
    arg1?: BaseQuery | number | string,
    arg2?: BaseQuery | string | number,
    arg3?: BaseQuery
  ) {
    let url = "posts";
    let query = {};
    if (typeof arg1 === "number") {
      url = `posts/${arg1}`;
      query = arg2 || {};
    } else if (typeof arg1 === "string") {
      url = `posts/${arg1}/${arg2}`;
      query = arg3 || {};
    } else if (arg1 && typeof arg1 === "object") {
      query = arg1;
    }
    return this.#request.get(url, query);
  }

  tags(): Promise<Tag[]>;
  tags(type: "tag-list"): Promise<string[]>;
  tags(type?: string) {
    const url = type ? "posts/tag-list" : "posts/tag";
    return this.#request.get(url);
  }

  comments(id: number): Promise<Comments>;
  comments<K extends readonly (keyof BaseComment)[]>(
    id: number,
    query: BaseQuery<BaseComment, K>
  ): Promise<Comments<K>>;
  comments(id: number, query?: BaseQuery) {
    return this.#request.get(`posts/${id}/comments`, query || {});
  }
}
