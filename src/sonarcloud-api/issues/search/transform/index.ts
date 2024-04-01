import { type ApiResponse, parseApiResponse } from "./api-response";

export { ApiResponse };
export default (data: unknown): ApiResponse => parseApiResponse(data);
