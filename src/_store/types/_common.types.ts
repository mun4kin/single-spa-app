export interface IResponse<T> {
  error: {
    description: string;
  } | null;
  data: T;
}
