export interface IError {
 status: number;
 data: {
  message: string;
  stack: string;
 };
}
