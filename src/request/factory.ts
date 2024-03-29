export type RequestFn = (
  url: string,
  options: RequestInit,
) => Promise<Response>;

export interface Options {
  baseUrl: string;
  token: string;
  fetch?: RequestFn;
}

export const factory = ({
  baseUrl,
  token,
  fetch = global.fetch,
}: Options): RequestFn => {
  const getHeaders = (headers: HeadersInit): Headers => {
    const raw = new Headers(headers);
    raw.set("Authorization", `Bearer ${token}`);
    return raw;
  };

  const getRequestInit = (requestInit: RequestInit): RequestInit => {
    return {
      ...requestInit,
      headers: getHeaders(requestInit.headers ?? {}),
    };
  };

  const getFullUrl = (url: URL | string): string => {
    return new URL(url, baseUrl).toString();
  };

  return async (
    url: URL | string,
    requestInit: RequestInit = {},
  ): Promise<Response> => {
    return await fetch(getFullUrl(url), getRequestInit(requestInit));
  };
};
