export interface ApiParameters {
  project: string;
}

const API_URI = "api/project_pull_requests/list";

export const getUrl = (apiParameters: ApiParameters): string => {
  const parameterList = Object.entries(apiParameters);
  const { search } = parameterList.reduce((url, [key, value]) => {
    url.searchParams.append(key, value);
    return url;
  }, new URL("fake://url.com/"));
  return `${API_URI}${search}`;
};
