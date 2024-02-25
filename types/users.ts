import { Schedule } from "./scheduling";

export type UserRole = "client" | "provider" | null;

export interface User {
  id: string;
  role: UserRole;
}

export interface Provider {
  id: string;
  name: string;
  schedule: Schedule[];
}

export interface Client {
  id: string;
  name: string;
}
