export class AppError {
  message: string;
  statusCoder: number;

  constructor(message: string, statusCoder: number) {
    this.message = message;
    this.statusCoder = statusCoder;
  }
}
