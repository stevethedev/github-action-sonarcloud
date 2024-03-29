export type RequestFn = (
  url: string,
  options: RequestOptions,
) => Promise<Response>;

interface RequestOptions extends RequestInit {
  parameters?: Record<string, string>;
}

export interface Options {
  baseUrl: string;
  token: string;
  fetch?: typeof global.fetch;
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

  const getFullUrl = (
    url: URL | string,
    parameters: Record<string, string>,
  ): string => {
    const fullUrl = new URL(url, baseUrl);
    Object.entries(parameters).forEach(([key, value]) => {
      fullUrl.searchParams.append(key, value);
    });
    return fullUrl.toString();
  };

  return async (
    url: URL | string,
    { parameters = {}, ...requestInit }: RequestOptions = {},
  ): Promise<Response> => {
    return await fetch(
      getFullUrl(url, parameters),
      getRequestInit(requestInit),
    );
  };
};
