export interface Voice {
  id: number;
  name: string;
  type: string;
}

export interface VoicesApiResponse {
  voices: Voice[];
  total: number;
  page: number;
  limit: number;
}
