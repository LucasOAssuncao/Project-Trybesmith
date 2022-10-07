export default interface IPayload {
  payload: {
    userId: number;
    username?: string;
  };
  [key: string]: unknown;
}
