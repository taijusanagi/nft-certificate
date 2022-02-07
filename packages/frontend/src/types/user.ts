import { Jwk } from "./jwk";

export interface User {
  jwk: Jwk;
  did: string;
}
