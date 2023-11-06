export const getAdminUrl = (url: string) => `/manage/${url}`;
export const getAdminHomeUrl = (url: string) => getAdminUrl("").slice(0, -1);
