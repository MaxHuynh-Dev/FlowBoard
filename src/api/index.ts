import { API_URL } from '@Constants/envs';
import ky, { type Options } from 'ky';

export interface TDefaultResponse<T> {
  status: number;
  message?: string;
  data: T;
}

class HttpClient {
  requestConfig: typeof ky;
  constructor() {
    this.requestConfig = ky.create({
      prefix: API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        accept: 'application/json'
      },
      credentials: 'include',
      hooks: {
        beforeError: [
          async ({ error }) => {
            if (error instanceof Error && 'response' in error) {
              try {
                const response = (error as { response: Response }).response;
                const errorResponse: unknown = await response.clone().json();
                if (
                  errorResponse &&
                  typeof errorResponse === 'object' &&
                  'message' in errorResponse &&
                  typeof (errorResponse as { message: unknown }).message === 'string'
                ) {
                  // Replace with a real logging system if needed
                }
              } catch {
                // Response body is not JSON, skip
              }
            }
            return error;
          }
        ]
      }
    });
  }

  async get<T>(url: string, config?: Options): Promise<TDefaultResponse<T>> {
    return await this.requestConfig.get(url, config).json<TDefaultResponse<T>>();
  }

  async post<TRes, TReq = unknown>(
    url: string,
    data?: TReq,
    config?: Options
  ): Promise<TDefaultResponse<TRes>> {
    return await this.requestConfig
      .post(url, { ...config, json: data })
      .json<TDefaultResponse<TRes>>();
  }

  async put<TRes, TReq = unknown>(
    url: string,
    data?: TReq,
    config?: Options
  ): Promise<TDefaultResponse<TRes>> {
    return await this.requestConfig
      .put(url, { ...config, json: data })
      .json<TDefaultResponse<TRes>>();
  }

  async delete<T>(url: string, config?: Options): Promise<TDefaultResponse<T>> {
    return await this.requestConfig.delete(url, config).json<TDefaultResponse<T>>();
  }
}

const HTTP_REQUEST = new HttpClient();
export default HTTP_REQUEST;
