import type { AuthBody, LoginData, BaseUser } from "@/types";
import BaseEndpoint from "./Base";

export default class AuthEndpoint extends BaseEndpoint {
  #request = this.createRequest();

  login(body: AuthBody): Promise<LoginData> {
    return this.#request.post("auth/login", body, {
      credentials: "include",
    });
  }

  me(): Promise<BaseUser> {
    return this.#request.get("auth/me", null, {
      credentials: "include",
    });
  }

  refresh(body: Pick<AuthBody, "expiredInMins">): Promise<Credential> {
    return this.#request.post("auth/refresh", body, {
      credentials: "include",
    });
  }
}
