import type { DummyJson } from "@/DummyJson";
import type { HttpOptions } from "@/types";

export default class BaseEndpoint {
  #instance: DummyJson;

  constructor(instance: DummyJson) {
    this.#instance = instance;
  }

  private mergeHeaders(...headers: object[]) {
    return Object.assign({}, ...headers);
  }

  protected createRequest(options?: Pick<HttpOptions, "headers">) {
    const headers = options?.headers ?? {};
    return {
      get: <T = any>(
        url: string,
        query: any = {},
        options?: Omit<HttpOptions, "url" | "method" | "query" | "body">
      ): Promise<T> =>
        this.handleRequest({
          url,
          method: "GET",
          query,
          headers: this.mergeHeaders(headers, options?.headers ?? {}),
        }),
      post: <T = any>(
        url: string,
        body: any = null,
        options?: Omit<HttpOptions, "url" | "body" | "method">
      ): Promise<T> =>
        this.handleRequest({
          url,
          method: "POST",
          body,
          headers: this.mergeHeaders(headers, options?.headers ?? {}),
        }),
    };
  }

  private async handleRequest(options: HttpOptions) {
    const { baseURL, config } = this.#instance;
    const { url, method, query, body, headers, ...restOptions } = options;

    const { Authorization, refreshToken, ...configQuey } = config ?? {};

    const urlObj = new URL(`${baseURL}/${url}`);
    Object.entries({ ...configQuey, ...(query ?? {}) }).forEach(([k, v]) => {
      urlObj.searchParams.append(k, String(v));
    });
    const input = urlObj.toString();

    const baseHeaders = { ...(headers || {}) };
    const mergedHeaders = Authorization
      ? { ...baseHeaders, Authorization }
      : baseHeaders;

    const baseBody = body ? body : undefined;
    const mergedBody = refreshToken
      ? JSON.stringify({ baseBody, refreshToken })
      : JSON.stringify(baseBody);

    const init: RequestInit = {
      method: method || "GET",
      headers: mergedHeaders,
      body: mergedBody,
      ...restOptions,
    };

    const promise = fetch(input, init);

    try {
      const response = await promise;
      const contentType = response.headers.get("content-type");

      // if (!response.ok) {
      //   throw new Error(`HTTP ${response.status} ${response.statusText}`);
      // }

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return data;
      } else {
        const text = await response.text();
        const error = `Expected JSON, but got:", ${text.slice(0, 200)}`;
        console.error(error);
      }
    } catch (error) {
      throw error;
    }
  }
}
