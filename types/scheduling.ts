export interface Schedule {
  date: string;
  time: string;
}

export interface Reservation {
  id: string;
  clientId: string;
  providerId: string;
  date: string;
  time: string;
  createdAt: Date;
  confirmed: boolean;
}
